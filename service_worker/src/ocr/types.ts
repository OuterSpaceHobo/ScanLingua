export type Point = [number, number];
export type Quad = [Point, Point, Point, Point];

export interface OcrBox {
  quad: Quad;
  score: number;
}

export interface RecResult {
  text: string;
  score: number;
}

export interface DetPreResult {
  data: Float32Array;
  width: number;
  height: number;
  scaleW: number;
  scaleH: number;
}
