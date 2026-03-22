interface TranslatorInstance {
  translate(text: string): Promise<string>;
}

export interface TranslatorConstructor {
  create(opts: { sourceLanguage: string; targetLanguage: string }): Promise<TranslatorInstance>;
  availability(opts: { sourceLanguage: string; targetLanguage: string }): Promise<'readily' | 'after-download' | 'downloadable' | 'no'>;
}

export async function getAvailableTargets(source: string, candidates: string[]): Promise<string[]> {
  const Translator = (self as unknown as Record<string, unknown>).Translator as TranslatorConstructor | undefined;
  if (!Translator) return [];

  const results = await Promise.all(
    candidates
      .filter((c) => c !== source)
      .map(async (code) => {
        const avail = await Translator.availability({ sourceLanguage: source, targetLanguage: code });
        return avail !== 'no' ? code : null;
      })
  );
  return results.filter((c): c is string => c !== null);
}

const cache = new Map<string, TranslatorInstance>();

export async function localTranslate(text: string, from: string, to: string): Promise<string> {
  console.log(`[localTranslate] request: "${text}" ${from}->${to}`);
  const Translator = (self as unknown as Record<string, unknown>).Translator as TranslatorConstructor | undefined;
  if (!Translator) {
    console.log('[localTranslate] self.Translator not found');
    throw new Error('Chrome Translator API is not available');
  }

  const avail = await Translator.availability({ sourceLanguage: from, targetLanguage: to });
  console.log(`[localTranslate] availability(${from}, ${to}): ${avail}`);
  if (avail === 'no') throw new Error(`Language pair ${from}->${to} is not supported`);

  const key = `${from}->${to}`;
  let instance = cache.get(key);
  if (!instance) {
    console.log(`[localTranslate] creating new translator for ${key}`);
    instance = await Translator.create({ sourceLanguage: from, targetLanguage: to });
    cache.set(key, instance);
  } else {
    console.log(`[localTranslate] using cached translator for ${key}`);
  }

  try {
    let t1: ReturnType<typeof setTimeout>;
    const result = await Promise.race([
      instance.translate(text),
      new Promise<never>((_, reject) => { t1 = setTimeout(() => reject(new Error('translate timeout')), 10000); })
    ]);
    clearTimeout(t1!);
    console.log(`[localTranslate] result: "${result}"`);
    return result;
  } catch (err) {
    console.warn(`[localTranslate] failed for ${key}, discarding cache and retrying:`, err);
    cache.delete(key);
    instance = await Translator.create({ sourceLanguage: from, targetLanguage: to });
    cache.set(key, instance);
    let t2: ReturnType<typeof setTimeout>;
    const result = await Promise.race([
      instance.translate(text),
      new Promise<never>((_, reject) => { t2 = setTimeout(() => reject(new Error('translate timeout')), 10000); })
    ]);
    clearTimeout(t2!);
    console.log(`[localTranslate] retry result: "${result}"`);
    return result;
  }
}
