import * as ort from 'onnxruntime-web/wasm';
import { recognize, PipelineConfig } from './pipeline';
import { OCR_MODELS, SourceLanguage } from '../language';

ort.env.wasm.wasmPaths = chrome.runtime.getURL('lib/ort/');
ort.env.wasm.numThreads = 1;

function buildConfig(source: SourceLanguage): PipelineConfig {
  const models = OCR_MODELS[source];
  const modelsPath = chrome.runtime.getURL('resources/models');
  return {
    modelsPath,
    wasmPath: chrome.runtime.getURL('lib/ort/'),
    dictPath: `${modelsPath}/${models.dict}`,
    recModelName: models.rec,
  };
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type !== 'ocr-request') return false;

  const source: SourceLanguage = message.source || 'ja';
  recognize(message.base64, buildConfig(source))
    .then((text) => sendResponse({ type: 'ocr-result', text }))
    .catch((err) => sendResponse({ type: 'ocr-error', error: String(err) }));

  return true;
});
