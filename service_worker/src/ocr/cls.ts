import { softmax } from './rec';

const CLS_H = 80;
const CLS_W = 160;
const MEAN = [0.5, 0.5, 0.5];
const STD = [0.5, 0.5, 0.5];
const CLS_THRESH = 0.9;

export { CLS_THRESH };

export function clsPreprocess(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
): { data: Float32Array; h: number; w: number } {
  const srcCanvas = new OffscreenCanvas(width, height);
  (srcCanvas.getContext('2d') as OffscreenCanvasRenderingContext2D).putImageData(new ImageData(pixels, width, height), 0, 0);

  const resized = new OffscreenCanvas(CLS_W, CLS_H);
  const resizedCtx = resized.getContext('2d') as OffscreenCanvasRenderingContext2D;
  resizedCtx.drawImage(srcCanvas, 0, 0, CLS_W, CLS_H);
  const imgData = resizedCtx.getImageData(0, 0, CLS_W, CLS_H);

  const data = new Float32Array(3 * CLS_H * CLS_W);
  for (let i = 0; i < CLS_H * CLS_W; i++) {
    for (let c = 0; c < 3; c++) {
      data[c * CLS_H * CLS_W + i] =
        (imgData.data[i * 4 + c] / 255.0 - MEAN[c]) / STD[c];
    }
  }

  return { data, h: CLS_H, w: CLS_W };
}

export function clsPostprocess(scores: number[]): { label: number; shouldFlip: boolean } {
  const probs = softmax(scores);
  const shouldFlip = probs[1] > CLS_THRESH;
  return { label: shouldFlip ? 180 : 0, shouldFlip };
}
