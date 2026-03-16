export function AnnotateJpZone(visionText: string): Promise<unknown>;
export function AddAnkiCard(
  visionText: string,
  b64: string,
  translation: string,
  deckName?: string,
): Promise<{ result: number | null; error: string | null }>;
export function AddKanjiCard(
  visionText: string,
  b64: string,
  translation: string,
  kanjiData: Record<string, string | number | undefined>,
  deckName?: string,
): Promise<{ result: number | null; error: string | null }>;
