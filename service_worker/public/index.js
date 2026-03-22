import { unEscape, captureZone, getCurrentTab, readStorage } from '/service.js'
import { AddAnkiCard, AddKanjiCard } from '/fetch.js'
import { lookupChars } from '/dictionary.js'
import { localVision } from '/bridge.js'
import { localTranslate, getAvailableTargets } from '/translator.js'
import { initAnalytics, sendEvent, sendUserProperties } from '/ga-client.js'

(async function() {

await initAnalytics()

let vision, visionText, translation, jpAnnotation, b64, b64audio

chrome.runtime.onInstalled.addListener(async (details) => {
    const version = chrome.runtime.getManifest().version
    if (details.reason === 'install') {
        sendEvent('extension_install', { version })
        const manifest = chrome.runtime.getManifest()
        const extensionSource = manifest.update_url ? 'cws' : 'unpacked'
        const platformInfo = await chrome.runtime.getPlatformInfo()
        sendUserProperties({
            extension_source: extensionSource,
            extension_version: version,
            os_platform: platformInfo.os,
            chrome_version: navigator.userAgent.match(/Chrome\/([\d.]+)/)?.[1] || 'unknown',
            ui_language: navigator.language,
        })
    } else if (details.reason === 'update') {
        sendEvent('extension_update', { prev_version: details.previousVersion, new_version: version })
        sendUserProperties({ extension_version: version })
    }
})

chrome.commands.onCommand.addListener( async (command) => {
    const currentTab = await getCurrentTab()
    // console.log("currentTab", currentTab)
    console.log('[hotkey] command received:', command)
    if (command === "screenshot") {
        sendEvent('screenshot_taken', { trigger: 'shortcut' })
        startScreenshot();
    }
}) // starter listener

async function startScreenshot(msg) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {type: "start-screenshot"});
    // console.log("sendMessage response", response);
}

async function sendVision(requestId, vision) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    console.log(`[sw] sendVision requestId=${requestId} tabId=${tab?.id}`)
    try {
        const response = await chrome.tabs.sendMessage(tab.id, {type: "your-vision", requestId, vision});
        console.log(`[sw] sendVision response:`, response)
    } catch (err) {
        console.error(`[sw] sendVision ERROR requestId=${requestId}:`, err)
    }
}

async function sendTranslation(requestId, translation) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    console.log(`[sw] sendTranslation requestId=${requestId} tabId=${tab?.id}`)
    try {
        const response = await chrome.tabs.sendMessage(tab.id, {type: "your-translation", requestId, translation});
        console.log(`[sw] sendTranslation response:`, response)
    } catch (err) {
        console.error(`[sw] sendTranslation ERROR requestId=${requestId}:`, err)
    }
}

async function sendAnnotation(requestId, annotation) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    console.log(`[sw] sendAnnotation requestId=${requestId} tabId=${tab?.id}`)
    try {
        const response = await chrome.tabs.sendMessage(tab.id, {type: "your-annotation", requestId, annotation});
        console.log(`[sw] sendAnnotation response:`, response)
    } catch (err) {
        console.error(`[sw] sendAnnotation ERROR requestId=${requestId}:`, err)
    }
}

async function sendAnkiResult(requestId, addedCard) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    try {
        const response = await chrome.tabs.sendMessage(tab.id, {type: "your-sendAnkiResult", requestId, addedCard});
    } catch (err) {
        console.error(`[sw] sendAnkiResult ERROR requestId=${requestId}:`, err)
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    gotMessage(request, sender, sendResponse).catch((err) => {
        console.error(`[sw] gotMessage unhandled error (type=${request.type}):`, err);
        sendEvent('error', {
            error_type: err?.name || 'UnhandledError',
            message: String(err?.message || err).slice(0, 100),
            context: 'service_worker',
        })
    });
    return true;  // keep channel open for all async handlers
});
async function gotMessage(request, sender, sendResponse) {
        console.log(`[sw] gotMessage type=${request.type} requestId=${request.requestId}`)
    if (request.type == "request-vision") {
        console.log("[OCR] captureZone args:", {x1: request.x1, y1: request.y1, x2: request.x2, y2: request.y2, pixelRatio: request.pixelRatio})
        try {
            b64 = await captureZone(request.x1, request.y1, request.x2, request.y2, request.pixelRatio, request.tabHeight, request.tabWidth);
        } catch (err) {
            console.error("[OCR] captureZone error:", err)
            sendEvent('ocr_failed', { error_type: 'captureZone_' + String(err?.message || err).slice(0, 60) })
            await sendVision(request.requestId, "Capture failed.")
            return
        }
        console.log("[OCR] b64 length:", b64?.length)
        let source = 'ja'
        try {
            const langConfig = await readStorage("languageConfig")
            source = langConfig?.source || 'ja'
        } catch {}
        const ocrStart = Date.now()
        try {
            const text = await localVision(b64, source)
            console.log("[OCR] localVision result:", text)
            visionText = text || "No text detected."
            sendEvent('ocr_completed', { duration_ms: Date.now() - ocrStart, char_count: visionText.length, success: true })
        } catch (err) {
            console.error("[OCR] localVision error:", err)
            sendEvent('ocr_failed', { error_type: String(err?.message || err) })
            visionText = "No text detected."
        }
        console.log("[OCR] visionText:", visionText)
        await sendVision(request.requestId, visionText)
        chrome.storage.local.set({ "b64pic": b64 })
        chrome.storage.local.set({ "visionText": visionText })
    }
    if (request.type == "request-translation") {
        if (request.editedText !== undefined) {
            visionText = await request.editedText
        }
        let source = 'ja'
        let target = 'en'
        try {
            const langConfig = await readStorage("languageConfig")
            source = langConfig?.source || 'ja'
            target = langConfig?.target || 'en'
        } catch {}
        console.log(`[sw] translation handler source=${source} target=${target}`)
        console.log("[translate] visionText:", visionText)
        const translateStart = Date.now()
        try {
            translation = await localTranslate(visionText, source, target)
            console.log("[translate] result:", translation)
            sendEvent('translation_completed', { source_lang: source, target_lang: target, char_count: visionText.length, duration_ms: Date.now() - translateStart })
            await sendTranslation(request.requestId, translation)
        } catch (err) {
            console.error("[translate] error:", err)
            sendEvent('translation_failed', { error_type: String(err?.message || err) })
            await sendTranslation(request.requestId, "Translation error: " + String(err?.message || err))
        }
        chrome.storage.local.set({ "visionText": visionText })
        chrome.storage.local.set({ "translation": translation })
    }
    if (request.type == "request-annotation") {
        const lang = request.lang || 'ja'
        try {
            const chars = await lookupChars(visionText, lang)
            jpAnnotation = { lang, kanji: chars.map(c => {
                if (lang === 'ja') return {
                    literal: c.literal,
                    frequency: c.frequency,
                    grade: c.grade,
                    jlpt: c.level,
                    meanings: c.meanings,
                    onyomi: c.readings.filter(r => /^[\u30A0-\u30FF]/.test(r)),
                    kunyomi: c.readings.filter(r => /^[\u3040-\u309F]/.test(r)),
                }
                if (lang === 'zh') return {
                    literal: c.literal,
                    meanings: c.meanings,
                    pinyin: c.pinyin,
                    traditional: c.traditional,
                    simplified: c.simplified,
                }
                return {
                    literal: c.literal,
                    meanings: c.meanings,
                    romaja: c.romaja,
                    readings: c.readings,
                    pos: c.pos,
                }
            }) }
            sendEvent('character_annotation_viewed', { character_count: chars.length })
            await sendAnnotation(request.requestId, jpAnnotation)
        } catch (err) {
            console.error("[annotation] error:", err)
            await sendAnnotation(request.requestId, { lang, kanji: [] })
        }
    }
    if (request.type == "request-AddAnkiCard") {
        console.log(`[Anki] export requestId=${request.requestId} deckName pending`)
        try {
            b64 = await readStorage("b64pic")
            visionText = await readStorage("visionText")
            translation = await readStorage("translation")
            const deckName = await readStorage("ankiDeck") || "Default"
            console.log(`[Anki] export requestId=${request.requestId} deckName=${deckName}`)
            const labels = request.labels || {}
            if (request.kanjiCard !== undefined) {
                const kanjiData = request.kanjiCard
                const addedCard = await AddKanjiCard(visionText, b64, translation, kanjiData, deckName, labels)
                console.log(`[Anki] sendAnkiResult requestId=${request.requestId} success`)
                sendEvent('anki_card_exported', { anki_export_count: 1 })
                await sendAnkiResult(request.requestId, addedCard)
            } else {
                const addedCard = await AddAnkiCard(visionText, b64, translation, deckName, labels)
                console.log(`[Anki] sendAnkiResult requestId=${request.requestId} success`)
                sendEvent('anki_card_exported', { anki_export_count: 1 })
                await sendAnkiResult(request.requestId, addedCard)
            }
        } catch (err) {
            console.error("[Anki] error in handler:", err)
            console.log(`[Anki] sendAnkiResult requestId=${request.requestId} error`)
            await sendAnkiResult(request.requestId, { error: 'notification.ankiNotRunning' })
        }
    } // add anki / kanji cards
    if (request.type == "request-available-targets") {
        const TARGET_LANGUAGE_CANDIDATES = [
            'en', 'ru', 'fr', 'de', 'es', 'pt', 'it', 'nl', 'pl', 'tr', 'ar', 'hi', 'th', 'vi', 'ja', 'zh', 'ko',
        ];
        const TARGET_LANGUAGE_LABELS = {
            en: 'English', ru: 'Русский', fr: 'Français', de: 'Deutsch', es: 'Español',
            pt: 'Português', it: 'Italiano', nl: 'Nederlands', pl: 'Polski', tr: 'Türkçe',
            ar: 'العربية', hi: 'हिन्दी', th: 'ไทย', vi: 'Tiếng Việt',
            ja: '日本語', zh: '中文', ko: '한국어',
        };
        const available = await Promise.race([
            getAvailableTargets(request.source, TARGET_LANGUAGE_CANDIDATES),
            new Promise(resolve => setTimeout(() => resolve([]), 3000)),
        ]);
        const targets = available.map(code => ({ code, label: TARGET_LANGUAGE_LABELS[code] || code }));
        try {
            sendResponse(targets);
        } catch (err) {
            console.warn("[sw] sendResponse failed (port closed):", request.type);
        }
    }
    if (request.type == "analytics-event") {
        sendEvent(request.name, request.params || {})
        if (request.name === "settings_changed" && request.params?.setting_name === "language") {
            const langConfig = await readStorage("languageConfig")
            if (langConfig) sendUserProperties({ ocr_language: langConfig.source, target_language: langConfig.target })
        }
    }
    if (request.type == "check-support") { 
        const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
        const lastPrompt = await readStorage("supportTabLastShown");
        const now = Date.now();

        if (!lastPrompt) {
            chrome.storage.local.set({ "supportTabLastShown": now })
        } else if ((now - lastPrompt) >= TWO_WEEKS_MS) {
            chrome.storage.local.set({ "supportTabLastShown": now })
            chrome.windows.create({
                url: chrome.runtime.getURL("support.html"),
                type: "popup",
                width: 400,
                height: 420,
            }) 
        } 
    }
    //sendResponse
}

})()