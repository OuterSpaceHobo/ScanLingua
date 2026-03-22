import * as ort from 'onnxruntime-web/wasm';
import type { Quad, RecResult } from './types';
import { limitSize, detPreprocess, detPostprocess } from './det';
import { recPreprocess, recPostprocess } from './rec';
import { clsPreprocess, clsPostprocess } from './cls';

export interface PipelineConfig {
  modelsPath: string;
  wasmPath: string;
  dictPath: string;
  recModelName: string;
}

const sessions: Record<string, ort.InferenceSession> = {};
const _sessionPromises: Record<string, Promise<ort.InferenceSession>> = {};

async function getSession(
  name: string,
  modelsPath: string,
  opts?: ort.InferenceSession.SessionOptions,
): Promise<ort.InferenceSession> {
  if (sessions[name]) return sessions[name];
  const key = `${modelsPath}/${name}`;
  if (!_sessionPromises[key]) {
    _sessionPromises[key] = (async () => {
      const url = `${modelsPath}/${name}`;
      const session = await ort.InferenceSession.create(url, {
        executionProviders: ['wasm'],
        graphOptimizationLevel: 'all',
        ...opts,
      });
      sessions[name] = session;
      return session;
    })();
  }
  return _sessionPromises[key];
}

function padTensor(
  src: Float32Array,
  channels: number,
  srcH: number,
  srcW: number,
  padH: number,
  padW: number,
): Float32Array {
  if (srcH === padH && srcW === padW) return src;
  const out = new Float32Array(channels * padH * padW);
  for (let c = 0; c < channels; c++) {
    const srcOff = c * srcH * srcW;
    const dstOff = c * padH * padW;
    for (let y = 0; y < srcH; y++) {
      out.set(src.subarray(srcOff + y * srcW, srcOff + y * srcW + srcW), dstOff + y * padW);
    }
  }
  return out;
}

const _dictCache: Record<string, string[]> = {};

async function loadDict(dictPath: string): Promise<string[]> {
  if (_dictCache[dictPath]) return _dictCache[dictPath];
  const text = await fetch(dictPath).then((r) => r.text());
  _dictCache[dictPath] = ['blank', ...text.split('\n').filter((l) => l.length > 0), ' '];
  return _dictCache[dictPath];
}

let _pipelineLock: Promise<void> = Promise.resolve();

export function resetSessions(): void {
  for (const key of Object.keys(sessions)) {
    delete sessions[key];
  }
  for (const key of Object.keys(_sessionPromises)) {
    delete _sessionPromises[key];
  }
  for (const key of Object.keys(_dictCache)) {
    delete _dictCache[key];
  }
  _pipelineLock = Promise.resolve();
}

export function sortBoxesForLayout(boxes: Quad[]): Quad[] {
  if (boxes.length <= 1) return boxes;

  let verticalCount = 0;
  for (const box of boxes) {
    const xs = box.map((p) => p[0]);
    const ys = box.map((p) => p[1]);
    const w = Math.max(...xs) - Math.min(...xs);
    const h = Math.max(...ys) - Math.min(...ys);
    if (h > w * 1.5) verticalCount++;
  }

  if (verticalCount <= boxes.length / 2) return boxes;

  return [...boxes].sort((a, b) => {
    const aCenterX = a.reduce((s, p) => s + p[0], 0) / 4;
    const bCenterX = b.reduce((s, p) => s + p[0], 0) / 4;
    const aCenterY = a.reduce((s, p) => s + p[1], 0) / 4;
    const bCenterY = b.reduce((s, p) => s + p[1], 0) / 4;
    const dx = bCenterX - aCenterX;
    if (Math.abs(dx) > 20) return dx;
    return aCenterY - bCenterY;
  });
}

const CROP_MARGIN = 4;

export async function recognize(
  base64: string,
  config: PipelineConfig,
): Promise<string> {
  let resolve: () => void;
  const prev = _pipelineLock;
  _pipelineLock = new Promise<void>((r) => { resolve = r; });
  await prev;

  try {
    return await _recognizeInner(base64, config);
  } finally {
    resolve!();
  }
}

async function _recognizeInner(
  base64: string,
  config: PipelineConfig,
): Promise<string> {
  const blob = await fetch(`data:image/png;base64,${base64}`).then((r) => r.blob());
  const bitmap = await createImageBitmap(blob);

  const canvas = padInputImage(bitmap);

  const ctx = canvas.getContext('2d', { willReadFrequently: true }) as OffscreenCanvasRenderingContext2D;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const boxes = await runDetection(imageData, config);
  if (boxes.length === 0) return '';
  const sorted = sortBoxesForLayout(boxes);

  let crops = sorted.map((box) => cropBox(canvas, box));
  crops = crops.map(rotateIfVertical);
  crops = await runClassification(crops, config);
  const results = await runRecognition(crops, config);

  return results
    .filter((r) => r.text.length > 0)
    .map((r) => r.text)
    .join(' ');
}

function padInputImage(bitmap: ImageBitmap): OffscreenCanvas {
  const pad = 16;
  const canvas = new OffscreenCanvas(bitmap.width + pad * 2, bitmap.height + pad * 2);
  const ctx = canvas.getContext('2d', { willReadFrequently: true }) as OffscreenCanvasRenderingContext2D;

  ctx.drawImage(bitmap, 0, 0, 1, bitmap.height, 0, pad, pad, bitmap.height);
  ctx.drawImage(bitmap, bitmap.width - 1, 0, 1, bitmap.height, bitmap.width + pad, pad, pad, bitmap.height);
  ctx.drawImage(bitmap, 0, 0, bitmap.width, 1, pad, 0, bitmap.width, pad);
  ctx.drawImage(bitmap, 0, bitmap.height - 1, bitmap.width, 1, pad, bitmap.height + pad, bitmap.width, pad);

  ctx.drawImage(bitmap, pad, pad);
  return canvas;
}

export function rotateIfVertical(crop: OffscreenCanvas): OffscreenCanvas {
  if (crop.height <= crop.width * 1.5) return crop;

  const srcCtx = crop.getContext('2d', { willReadFrequently: true }) as OffscreenCanvasRenderingContext2D;
  const srcData = srcCtx.getImageData(0, 0, crop.width, crop.height);
  const srcW = crop.width;
  const srcH = crop.height;

  const out = new OffscreenCanvas(srcH, srcW);
  const outCtx = out.getContext('2d', { willReadFrequently: true }) as OffscreenCanvasRenderingContext2D;
  const outData = outCtx.createImageData(srcH, srcW);

  for (let y = 0; y < srcH; y++) {
    for (let x = 0; x < srcW; x++) {
      const si = (y * srcW + x) * 4;
      const dx = y;
      const dy = srcW - 1 - x;
      const di = (dy * srcH + dx) * 4;
      outData.data[di] = srcData.data[si];
      outData.data[di + 1] = srcData.data[si + 1];
      outData.data[di + 2] = srcData.data[si + 2];
      outData.data[di + 3] = srcData.data[si + 3];
    }
  }

  outCtx.putImageData(outData, 0, 0);
  return out;
}

const DET_PAD = 960;
const REC_PAD_W = 320;

async function runDetection(
  imageData: ImageData,
  config: PipelineConfig,
): Promise<Quad[]> {
  const session = await getSession('ppocrv5_mobile_det.onnx', config.modelsPath, {
    freeDimensionOverrides: { 'DynamicDimension.0': 1, 'DynamicDimension.1': DET_PAD, 'DynamicDimension.2': DET_PAD },
  });
  const [targetW, targetH, scaleW, scaleH] = limitSize(imageData.width, imageData.height);
  const data = detPreprocess(imageData.data, imageData.width, imageData.height, targetW, targetH);
  const padded = padTensor(data, 3, targetH, targetW, DET_PAD, DET_PAD);
  const tensor = new ort.Tensor('float32', padded, [1, 3, DET_PAD, DET_PAD]);
  const feeds = { [session.inputNames[0]]: tensor };
  const results = await session.run(feeds);
  const output = results[session.outputNames[0]];
  return detPostprocess(
    output.data as Float32Array,
    DET_PAD,
    DET_PAD,
    imageData.width,
    imageData.height,
    scaleW,
    scaleH,
  );
}

async function runClassification(
  crops: OffscreenCanvas[],
  config: PipelineConfig,
): Promise<OffscreenCanvas[]> {
  const session = await getSession('pplcnet_x0_25_textline_ori.onnx', config.modelsPath);
  const results: OffscreenCanvas[] = [];

  for (const crop of crops) {
    const cropCtx = crop.getContext('2d', { willReadFrequently: true }) as OffscreenCanvasRenderingContext2D;
    const imgData = cropCtx.getImageData(0, 0, crop.width, crop.height);
    const { data, h, w } = clsPreprocess(imgData.data, crop.width, crop.height);
    const tensor = new ort.Tensor('float32', data, [1, 3, h, w]);
    const feeds = { [session.inputNames[0]]: tensor };
    const res = await session.run(feeds);
    const output = res[session.outputNames[0]];
    const { shouldFlip } = clsPostprocess(Array.from(output.data as Float32Array));

    if (!shouldFlip) {
      results.push(crop);
      continue;
    }

    const rotated = new OffscreenCanvas(crop.width, crop.height);
    const rCtx = rotated.getContext('2d', { willReadFrequently: true }) as OffscreenCanvasRenderingContext2D;
    rCtx.translate(crop.width, crop.height);
    rCtx.rotate(Math.PI);
    rCtx.drawImage(crop, 0, 0);
    results.push(rotated);
  }

  return results;
}

async function runRecognition(
  crops: OffscreenCanvas[],
  config: PipelineConfig,
): Promise<RecResult[]> {
  const session = await getSession(config.recModelName, config.modelsPath, {
    freeDimensionOverrides: { 'DynamicDimension.0': 1, 'DynamicDimension.1': REC_PAD_W },
  });
  const dict = await loadDict(config.dictPath);
  const results: RecResult[] = [];

  for (const crop of crops) {
    const cropCtx = crop.getContext('2d', { willReadFrequently: true }) as OffscreenCanvasRenderingContext2D;
    const imgData = cropCtx.getImageData(0, 0, crop.width, crop.height);
    const { data, h, w } = recPreprocess(imgData.data, crop.width, crop.height);
    const padded = padTensor(data, 3, h, w, h, REC_PAD_W);
    const tensor = new ort.Tensor('float32', padded, [1, 3, h, REC_PAD_W]);
    const feeds = { [session.inputNames[0]]: tensor };
    const res = await session.run(feeds);
    const output = res[session.outputNames[0]];
    const [, T, C] = output.dims;
    results.push(recPostprocess(output.data as Float32Array, T, C, dict));
  }

  return results;
}

function cropBox(srcCanvas: OffscreenCanvas, box: Quad): OffscreenCanvas {
  const xs = box.map((p) => p[0]);
  const ys = box.map((p) => p[1]);
  const minX = Math.max(0, Math.floor(Math.min(...xs)) - CROP_MARGIN);
  const minY = Math.max(0, Math.floor(Math.min(...ys)) - CROP_MARGIN);
  const maxX = Math.min(srcCanvas.width, Math.ceil(Math.max(...xs)) + CROP_MARGIN);
  const maxY = Math.min(srcCanvas.height, Math.ceil(Math.max(...ys)) + CROP_MARGIN);
  const w = maxX - minX;
  const h = maxY - minY;

  const out = new OffscreenCanvas(w, h);
  (out.getContext('2d', { willReadFrequently: true }) as OffscreenCanvasRenderingContext2D).drawImage(srcCanvas, minX, minY, w, h, 0, 0, w, h);
  return out;
}
