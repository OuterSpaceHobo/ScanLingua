import { AudioButton, PauseAudio, PlayAudio } from './Buttons';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from './hooks';
import { speak, stop, getRecommendedVoiceName } from './tts';
import { SOURCE_LOCALE, SOURCE_LABELS } from './language-utils';

function getVoiceInstallTip(t: (key: string, opts?: Record<string, string>) => string, locale: string, langName: string): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const platform = (navigator as any).userAgentData?.platform || navigator.platform || ""
    const p = platform.toLowerCase()
    const recommended = getRecommendedVoiceName(locale)
    console.log("getVoiceInstallTip", p, recommended)
    const suffix = recommended ? `. Recommended: ${recommended}` : ""
    if (p.includes("mac")) return t('tts.installVoiceMac', { langName }) + suffix
    if (p.includes("win")) return t('tts.installVoiceWindows', { langName }) + suffix
    if (p.includes("cros")) return t('tts.installVoiceChromeOS', { langName }) + suffix
    return t('tts.installVoiceLinux', { langName }) + suffix
}

export function Player() {
    const { t } = useTranslation()
    const voiceAvailable = useAppSelector((state) => state.audio.voiceAvailable)
    const visionText = useAppSelector((state) => state.audio.visionText)
    const [isPlaying, setIsPlaying] = useState(false)
    const [sourceLang, setSourceLang] = useState('ja')

    useEffect(() => {
        chrome.storage.local.get(["languageConfig"], (result) => {
            const src = result.languageConfig?.source || 'ja'
            setSourceLang(src)
        })
    }, [])

    const locale = SOURCE_LOCALE[sourceLang] || 'ja-JP'
    const langName = SOURCE_LABELS[sourceLang] || 'Japanese'

    const handleClick = () => {
        if (isPlaying) {
            stop()
            setIsPlaying(false)
        } else {
            const utterance = speak(visionText, locale)
            utterance.onend = () => setIsPlaying(false)
            setIsPlaying(true)
        }
    }

    if (!visionText) {
        return null
    }

    return (
        <AudioButton
            onClick={handleClick}
            disabled={!voiceAvailable}
            title={voiceAvailable ? t('overlay.playAudio', { langName }) : getVoiceInstallTip(t, locale, langName)}
            style={voiceAvailable ? undefined : { opacity: 0.4, cursor: "not-allowed" }}>
            {isPlaying ? <PauseAudio /> : <PlayAudio />}
        </AudioButton>
    )
}
