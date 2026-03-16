# Phase 2 — Chrome Native Translation + TTS

> Заменяем Google Cloud Translate и Google Cloud TTS на нативные Chrome API.
> Translator API (chrome.ai.translator) и Web SpeechSynthesis API.

## Context

- Текущий перевод: `fetch.js:translateZone()` -> Google Translate v2 REST API
- Текущий TTS: `fetch.js:audioZone()` -> Google Cloud TTS REST API
- Новый перевод: Chrome Translator API (Built-in AI)
- Новый TTS: Web SpeechSynthesis API (`speechSynthesis.speak()` в content_script, без base64)

## Tasks

### 2.1 Chrome Translator API
- [x] Создать `service_worker/src/translator.ts`
- [x] Реализовать `localTranslate(text: string, from: string, to: string): Promise<string>`
- [x] Обработка fallback если API недоступен (chrome version check)
- [x] Тест: перевод ja->en работает через Translator API

### 2.2 Замена Translate API в пайплайне
- [x] Обновить обработчик `request-translation` в `index.js` — вызывать `localTranslate`
- [x] Убрать зависимость перевода от API key
- [x] Тест: полный flow — OCR текст переводится

### 2.3 Web SpeechSynthesis TTS
- [x] Создать `context_script/src/tts.ts` (SpeechSynthesis wrapper)
- [x] Реализовать TTS через `SpeechSynthesis` API (`speechSynthesis.speak()` + `SpeechSynthesisUtterance`)
- [x] Изменить контракт: TTS больше не возвращает base64, а воспроизводит напрямую в content_script
- [x] Обновить `content_script` — Player.tsx вызывает `speechSynthesis` напрямую (play/pause/stop)
- [x] Проверка доступности голоса для выбранного языка:
  - [x] При инициализации и смене языка вызывать `speechSynthesis.getVoices()` и проверять наличие голоса для целевого языка (source language, например `ja-JP`)
  - [x] Если голос не найден — кнопка Player в состоянии `disabled`
  - [x] Показывать тултип на disabled-кнопке с инструкцией по установке голосов:
    - **macOS**: System Settings → Accessibility → Spoken Content → System Voice → Manage Voices → скачать нужный язык
    - **Windows**: Settings → Time & Language → Speech → Manage voices → Add voices → скачать нужный язык
    - **ChromeOS**: Settings → Accessibility → Text-to-Speech → Speech Engines — голоса встроены, если язык отсутствует — добавить язык в Settings → Languages
    - **Linux**: установить пакет голосов (`espeak-ng`, `festival`, или `speech-dispatcher`); для японского: `sudo apt install espeak-ng` (большинство дистрибутивов)
  - [x] Подписаться на событие `voiceschanged` для обновления состояния при установке голосов без перезагрузки
- [x] Тест: 8 unit tests (getVoiceForLang, speak, stop, initVoiceCheck)
- [x] Тест: при отсутствии голоса кнопка disabled и тултип отображается

### 2.4 Обновление Player
- [x] Адаптировать `Player.tsx` под новый контракт (кнопка play/stop через `SpeechSynthesis`)
- [x] Убрать экспорт аудио в Anki — карточки создаются без аудио
- [x] Обновить Redux slice `audio` в content_script store
- [x] Хранить флаг `voiceAvailable: boolean` в Redux — управляет состоянием кнопки Player
- [x] Определять ОС пользователя (`navigator.userAgentData.platform` / `navigator.platform`) для показа правильной инструкции в тултипе
- [x] Тест: Player работает, Anki карточки создаются без аудио
- [x] Тест: Player disabled при `voiceAvailable === false`, enabled при `true`

### 2.5 Очистка
- [x] Удалить `translateZone` и `audioZone` из `fetch.js`
- [x] Удалить `@google-cloud/text-to-speech` и `@google-cloud/translate` из обоих `package.json`
- [x] Обновить `architecture.md`
- [x] Тест: сборка проходит, расширение работает без Google API

### 2.6 TTS Voice Selection with Priorities
- [x] Add `VOICE_PRIORITIES` map with ordered voice names (Neural first, then standard, then macOS)
- [x] Replace `getVoiceForLang` with `getBestVoice` returning `{ voice, quality }` with priority-based selection
- [x] Add `getRecommendedVoiceName` for tooltip display
- [x] Set `utterance.rate = 0.9` in `speak()`
- [x] Update `Player.tsx` tooltip to show recommended voice name
- [x] Tests: 13 tests pass (getBestVoice priority, fallback, basic, none; getRecommendedVoiceName; speak rate; initVoiceCheck)

## Acceptance Criteria

- Перевод работает через Chrome Translator API без сетевых запросов к Google
- TTS воспроизводит через Web SpeechSynthesis API без API key
- API key не требуется ни для чего (после Phase 1 + 2)
- Player в overlay работает с новым контрактом
- Если системный голос для языка не установлен — кнопка Player disabled с тултипом-инструкцией (per-OS)
- При установке голоса (событие `voiceschanged`) кнопка автоматически становится активной
- Все тесты проходят
