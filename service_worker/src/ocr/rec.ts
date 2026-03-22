import type { RecResult } from './types';

const REC_H = 48;
const MAX_W = 320;
const MEAN = [0.5, 0.5, 0.5];
const STD = [0.5, 0.5, 0.5];

export { REC_H };

export function recPreprocess(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
): { data: Float32Array; h: number; w: number } {
  const aspect = width / height;
  const targetW = Math.min(Math.round(aspect * REC_H), MAX_W);
  const paddedW = Math.ceil(targetW / 4) * 4;

  const srcCanvas = new OffscreenCanvas(width, height);
  (srcCanvas.getContext('2d') as OffscreenCanvasRenderingContext2D).putImageData(new ImageData(new Uint8ClampedArray(pixels.buffer as ArrayBuffer), width, height), 0, 0);

  const resized = new OffscreenCanvas(paddedW, REC_H);
  const resizedCtx = resized.getContext('2d') as OffscreenCanvasRenderingContext2D;
  resizedCtx.drawImage(srcCanvas, 0, 0, paddedW, REC_H);
  const imgData = resizedCtx.getImageData(0, 0, paddedW, REC_H);

  const data = new Float32Array(3 * REC_H * paddedW);
  for (let i = 0; i < REC_H * paddedW; i++) {
    for (let c = 0; c < 3; c++) {
      data[c * REC_H * paddedW + i] =
        (imgData.data[i * 4 + c] / 255.0 - MEAN[c]) / STD[c];
    }
  }

  return { data, h: REC_H, w: paddedW };
}

export function recPostprocess(
  logits: Float32Array | Float64Array,
  T: number,
  C: number,
  dict: string[],
): RecResult {
  let text = '';
  let scoreSum = 0;
  let scoreCount = 0;
  let prevIdx = -1;

  for (let t = 0; t < T; t++) {
    const slice = logits.slice(t * C, (t + 1) * C);
    const probs = softmax(slice);

    let maxProb = -Infinity;
    let maxIdx = 0;
    for (let i = 0; i < C; i++) {
      if (probs[i] > maxProb) {
        maxProb = probs[i];
        maxIdx = i;
      }
    }

    if (maxIdx !== 0 && maxIdx !== prevIdx) {
      text += dict[maxIdx] ?? '?';
      scoreSum += maxProb;
      scoreCount++;
    }
    prevIdx = maxIdx;
  }

  return {
    text,
    score: scoreCount > 0 ? scoreSum / scoreCount : 0,
  };
}

export function softmax(arr: Float32Array | Float64Array | number[]): number[] {
  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  const exp: number[] = new Array(arr.length);
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    exp[i] = Math.exp(arr[i] - max);
    sum += exp[i];
  }
  for (let i = 0; i < exp.length; i++) {
    exp[i] /= sum;
  }
  return exp;
}
