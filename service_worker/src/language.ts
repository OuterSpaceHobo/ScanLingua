export type SourceLanguage = 'ja' | 'zh' | 'ko';

export type LanguageConfig = {
  source: SourceLanguage;
  target: string;
};

export const DEFAULT_LANGUAGE_CONFIG: LanguageConfig = {
  source: 'ja',
  target: 'en',
};

export const STORAGE_KEY = 'languageConfig';

export const SOURCE_LANGUAGES: { code: SourceLanguage; label: string }[] = [
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
  { code: 'ko', label: '한국어' },
];

export const OCR_MODELS: Record<SourceLanguage, { rec: string; dict: string }> = {
  ja: { rec: 'ppocrv5_mobile_rec.onnx', dict: 'ppocrv5_dict.txt' },
  zh: { rec: 'ppocrv5_mobile_rec.onnx', dict: 'ppocrv5_dict.txt' },
  ko: { rec: 'korean_ppocrv5_mobile_rec.onnx', dict: 'ppocrv5_korean_dict.txt' },
};

export const TARGET_LANGUAGE_CANDIDATES = [
  'en', 'ru', 'fr', 'de', 'es', 'pt', 'it', 'nl', 'pl', 'tr', 'ar', 'hi', 'th', 'vi', 'ja', 'zh', 'ko',
];

export const UI_LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'pt_BR', label: 'Português' },
  { code: 'th', label: 'ไทย' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'zh_CN', label: '中文' },
]

export const TARGET_LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  ru: 'Русский',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  pt: 'Português',
  it: 'Italiano',
  nl: 'Nederlands',
  pl: 'Polski',
  tr: 'Türkçe',
  ar: 'العربية',
  hi: 'हिन्दी',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  ja: '日本語',
  zh: '中文',
  ko: '한국어',
};
