import { Quad } from './types';

const MAX_SIDE = 960;
const MEAN = [0.485, 0.456, 0.406];
const STD = [0.229, 0.224, 0.225];
const DB_THRESH = 0.3;
const BOX_THRESH = 0.5;
const UNCLIP_RATIO = 1.8;

const MIN_DET_SIDE = 480;

export function limitSize(
  w: number,
  h: number,
  maxSide = MAX_SIDE,
  minSide = MIN_DET_SIDE,
): [number, number, number, number] {
  let ratio = Math.min(maxSide / Math.max(w, h), 1.0);
  if (Math.max(w, h) * ratio < minSide) {
    ratio = minSide / Math.max(w, h);
  }
  let tw = Math.round(w * ratio);
  let th = Math.round(h * ratio);
  tw = Math.ceil(tw / 32) * 32;
  th = Math.ceil(th / 32) * 32;
  return [tw, th, w / tw, h / th];
}

export function detPreprocess(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  targetW: number,
  targetH: number,
): Float32Array {
  const srcCanvas = new OffscreenCanvas(width, height);
  const srcCtx = srcCanvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
  srcCtx.putImageData(new ImageData(pixels, width, height), 0, 0);

  const resized = new OffscreenCanvas(targetW, targetH);
  const resizedCtx = resized.getContext('2d') as OffscreenCanvasRenderingContext2D;
  resizedCtx.drawImage(srcCanvas, 0, 0, targetW, targetH);
  const imgData = resizedCtx.getImageData(0, 0, targetW, targetH);

  const data = new Float32Array(3 * targetH * targetW);
  for (let i = 0; i < targetH * targetW; i++) {
    for (let c = 0; c < 3; c++) {
      data[c * targetH * targetW + i] =
        (imgData.data[i * 4 + c] / 255.0 - MEAN[c]) / STD[c];
    }
  }
  return data;
}

export function detPostprocess(
  prob: Float32Array | Float64Array,
  mapW: number,
  mapH: number,
  origW: number,
  origH: number,
  scaleW: number,
  scaleH: number,
): Quad[] {
  const bitmap = new Uint8Array(mapH * mapW);
  for (let i = 0; i < prob.length; i++) {
    bitmap[i] = prob[i] > DB_THRESH ? 255 : 0;
  }

  const contours = findContours(bitmap, mapW, mapH);

  const boxes: Quad[] = [];
  for (const contour of contours) {
    const score = boxScore(prob, mapW, contour);
    if (score < BOX_THRESH) continue;

    const quad = minAreaRect(contour);
    const unclipped = unclipPoly(quad, UNCLIP_RATIO);

    const scaled = unclipped.map(([x, y]) => [
      Math.round(x * scaleW),
      Math.round(y * scaleH),
    ]) as Quad;

    const clamped = scaled.map(([x, y]) => [
      Math.min(origW, Math.max(0, x)),
      Math.min(origH, Math.max(0, y)),
    ]) as Quad;

    const [bw, bh] = boxSize(clamped);
    if (bw < 4 || bh < 4) continue;

    boxes.push(clamped);
  }

  return boxes.sort((a, b) => a[0][1] - b[0][1] || a[0][0] - b[0][0]);
}

export function findContours(
  bitmap: Uint8Array,
  w: number,
  h: number,
): number[][][] {
  const visited = new Uint8Array(w * h);
  const contours: number[][][] = [];

  for (let i = 0; i < bitmap.length; i++) {
    if (!bitmap[i] || visited[i]) continue;

    const y0 = Math.floor(i / w);
    const x0 = i % w;
    const pts: number[][] = [];
    const queue: number[][] = [[x0, y0]];
    visited[i] = 1;

    while (queue.length) {
      const [cx, cy] = queue.pop()!;
      pts.push([cx, cy]);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const ni = ny * w + nx;
        if (!bitmap[ni] || visited[ni]) continue;
        visited[ni] = 1;
        queue.push([nx, ny]);
      }
    }

    if (pts.length > 10) contours.push(pts);
  }

  return contours;
}

export function boxScore(
  prob: Float32Array | Float64Array,
  w: number,
  pts: number[][],
): number {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const x0 = Math.max(0, Math.min(...xs));
  const y0 = Math.max(0, Math.min(...ys));
  const x1 = Math.max(...xs);
  const y1 = Math.max(...ys);

  let sum = 0;
  let count = 0;
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      sum += prob[y * w + x];
      count++;
    }
  }
  return count ? sum / count : 0;
}

export function minAreaRect(pts: number[][]): Quad {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs);
  const y0 = Math.min(...ys);
  const x1 = Math.max(...xs);
  const y1 = Math.max(...ys);
  return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
}

export function unclipPoly(poly: Quad, ratio: number): Quad {
  const cx = poly.reduce((s, p) => s + p[0], 0) / poly.length;
  const cy = poly.reduce((s, p) => s + p[1], 0) / poly.length;
  return poly.map(([x, y]) => [
    Math.round(cx + (x - cx) * ratio),
    Math.round(cy + (y - cy) * ratio),
  ]) as Quad;
}

function boxSize(quad: Quad): [number, number] {
  const xs = quad.map((p) => p[0]);
  const ys = quad.map((p) => p[1]);
  return [Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
}
