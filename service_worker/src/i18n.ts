import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '../public/_locales/en/translation.json'
import es from '../public/_locales/es/translation.json'
import fr from '../public/_locales/fr/translation.json'
import ja from '../public/_locales/ja/translation.json'
import ko from '../public/_locales/ko/translation.json'
import ptBR from '../public/_locales/pt_BR/translation.json'
import th from '../public/_locales/th/translation.json'
import tr from '../public/_locales/tr/translation.json'
import vi from '../public/_locales/vi/translation.json'
import zhCN from '../public/_locales/zh_CN/translation.json'

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  ja: { translation: ja },
  ko: { translation: ko },
  pt_BR: { translation: ptBR },
  th: { translation: th },
  tr: { translation: tr },
  vi: { translation: vi },
  zh_CN: { translation: zhCN },
}

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

chrome.storage.local.get('uiLocale').then((result) => {
  if (result.uiLocale && result.uiLocale !== i18next.language) {
    console.log('[i18n] init → loaded uiLocale:', result.uiLocale)
    i18next.changeLanguage(result.uiLocale)
  }
})

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.uiLocale?.newValue) {
    const next = changes.uiLocale.newValue
    if (next !== i18next.language) {
      console.log('[i18n] storage sync → changeLanguage:', next)
      i18next.changeLanguage(next)
    }
  }
})

export default i18next
