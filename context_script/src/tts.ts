type VoiceEntry = { name: string, os?: "win" | "mac" | "cros" }

const VOICE_PRIORITIES: Record<string, VoiceEntry[]> = {
    ja: [
        { name: "Microsoft Nanami Online (Natural) - Japanese (Japan)", os: "win" },
        { name: "Microsoft Ayumi - Japanese (Japan)", os: "win" },
        { name: "Google 日本語", os: "cros" },
        { name: "Kyoko", os: "mac" },
        { name: "Otoya", os: "mac" },
    ],
    zh: [
        { name: "Microsoft Xiaoxiao Online (Natural) - Chinese (Mainland)", os: "win" },
        { name: "Microsoft Huihui - Chinese (Simplified)", os: "win" },
        { name: "Google 普通话（中国大陆", os: "cros" },
        { name: "Ting-Ting", os: "mac" },
    ],
    ko: [
        { name: "Microsoft SunHi Online (Natural) - Korean (Korea)", os: "win" },
        { name: "Microsoft Heami - Korean (Korean)", os: "win" },
        { name: "Google 한국의", os: "cros" },
        { name: "Yuna", os: "mac" },
    ],
}

function detectOS(): "win" | "mac" | "cros" | "unknown" {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const platform = ((navigator as any).userAgentData?.platform || navigator.platform || "").toLowerCase()
    if (platform.includes("mac")) return "mac"
    if (platform.includes("win")) return "win"
    if (platform.includes("cros")) return "cros"
    return "unknown"
}

const LANG_PREFIXES: Record<string, string> = {
    ja: "ja",
    zh: "zh",
    ko: "ko",
}

export function getBestVoice(lang: string): { voice: SpeechSynthesisVoice | null, quality: "neural" | "basic" | "none" } {
    const voices = speechSynthesis.getVoices()
    const key = lang.split("-")[0]
    const prefix = LANG_PREFIXES[key] || key

    const priorities = VOICE_PRIORITIES[key]
    if (priorities) {
        for (const entry of priorities) {
            const match = voices.find(v => v.name === entry.name)
            if (match) return { voice: match, quality: "neural" }
        }
    }

    const langVoices = voices.filter(v => v.lang.startsWith(prefix))

    const neuralFallback = langVoices.find(v => /Online|Natural/i.test(v.name))
    if (neuralFallback) return { voice: neuralFallback, quality: "neural" }

    if (langVoices.length > 0) return { voice: langVoices[0], quality: "basic" }

    return { voice: null, quality: "none" }
}

export function getRecommendedVoiceName(lang: string): string | null { 
    const key = lang.split("-")[0]
    const priorities = VOICE_PRIORITIES[key]
    if (!priorities) return null
    const os = detectOS()
    const match = priorities.find(e => e.os === os) 
    return match ? match.name : priorities[0].name
}

export function speak(text: string, lang: string) {
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.9
    const { voice } = getBestVoice(lang)
    if (voice) {
        utterance.voice = voice
    }
    speechSynthesis.speak(utterance)
    return utterance
}

export function stop() {
    speechSynthesis.cancel()
}

export function initVoiceCheck(lang: string, onAvailabilityChange: (available: boolean) => void): () => void {
    const check = () => {
        onAvailabilityChange(getBestVoice(lang).voice !== null)
    }
    check()
    speechSynthesis.addEventListener("voiceschanged", check)
    return () => speechSynthesis.removeEventListener("voiceschanged", check)
}
