let offscreenCreated = false;

async function ensureOffscreen(): Promise<void> {
  if (offscreenCreated) return;

  // @types/chrome 0.0.224 lacks getContexts/ContextType — cast to bypass
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const runtime = chrome.runtime as any;
  if (typeof runtime.getContexts === 'function') {
    const contexts = await runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT'],
    });
    if (contexts.length > 0) {
      offscreenCreated = true;
      return;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (chrome as any).offscreen.createDocument({
    url: chrome.runtime.getURL('offscreen.html'),
    reasons: ['WORKERS'],
    justification: 'Run ONNX Runtime WASM inference for OCR',
  });
  offscreenCreated = true;
}

export async function localVision(base64: string, source?: string): Promise<string> {
  console.log(`[bridge] localVision called, source=${source || 'ja'}, offscreenCreated=${offscreenCreated}`)
  await ensureOffscreen();
  console.log(`[bridge] ensureOffscreen done, offscreenCreated=${offscreenCreated}`)

  let timer: ReturnType<typeof setTimeout>;
  let response;
  try {
    console.log(`[bridge] sending ocr-request to offscreen`)
    response = await Promise.race([
      chrome.runtime.sendMessage({
        type: 'ocr-request',
        base64,
        source: source || 'ja',
      }),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error('OCR request timed out')), 30000);
      }),
    ]);
    clearTimeout(timer!);
  } catch (err) {
    clearTimeout(timer!);
    console.error(`[bridge] ocr-request error:`, err)
    offscreenCreated = false;
    throw err;
  }

  console.log(`[bridge] ocr-request response type=${response.type}`, response.type === 'ocr-error' ? response.error : `text length=${response.text?.length}`)

  if (response.type === 'ocr-error') {
    throw new Error(response.error);
  }

  return response.text;
}
