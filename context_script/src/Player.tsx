import { AudioButton, PauseAudio, PlayAudio } from './Buttons';
import { useState, useEffect } from 'react';
import { useAppSelector } from './hooks';
import { speak, stop, getRecommendedVoiceName } from './tts';
import { SOURCE_LOCALE, SOURCE_LABELS } from './language-utils';

function getVoiceInstallTip(locale: string, langName: string): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const platform = (navigator as any).userAgentData?.platform || navigator.platform || ""
    const p = platform.toLowerCase() 
    const recommended = getRecommendedVoiceName(locale)
    console.log("getVoiceInstallTip", p, recommended)
    const suffix = recommended ? `. Recommended: ${recommended}` : ""
    if (p.includes("mac")) return `Install a ${langName} voice: System Settings > Accessibility > Spoken Content > System Voice > Manage Voices` + suffix
    if (p.includes("win")) return `Install a ${langName} voice: Settings > Time & Language > Speech > Manage voices > Add voices` + suffix
    if (p.includes("cros")) return `Install a ${langName} voice: Settings > Accessibility > Text-to-Speech > Speech Engines` + suffix
    return `Install a ${langName} voice (e.g. espeak-ng package)` + suffix
}

export function Player() { 
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
            title={voiceAvailable ? `Play ${langName} audio` : getVoiceInstallTip(locale, langName)}
            style={voiceAvailable ? undefined : { opacity: 0.4, cursor: "not-allowed" }}>
            {isPlaying ? <PauseAudio /> : <PlayAudio />}
        </AudioButton>
    )
}
