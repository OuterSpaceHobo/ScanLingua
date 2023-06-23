import { AudioButton, PauseAudio, PlayAudio } from './Buttons';
import { useEffect, useState, useRef } from 'react';
import { useAppSelector } from './hooks';
import { createNotification } from './reducers/notificationReducer';
import store from "./store";

export function Player() {
    const reduxAudio: any = useAppSelector((state) => state.audio) 
    const [isPlaying, setisPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)
    // console.log("audioRef", audioRef)

    useEffect(() => {
        if (isPlaying) {
            // console.log('play')
            if (reduxAudio.error) {
                store.dispatch(createNotification(`Audio not created. Check if text-to-speech API is ehabled.`, 5))
                setisPlaying(!isPlaying)
            } else  if (reduxAudio.audioContent) {
                audioRef.current?.play()
            }
        } else {
            // console.log('pause')
            audioRef.current?.pause()
        }
      }, [isPlaying])

    const handleClick = () => setisPlaying(!isPlaying)

    if (reduxAudio === "no audio") {
        return null
    }

    return (
        <>                 
            <AudioButton onClick={handleClick}>     
                <audio 
                ref={audioRef} 
                src={`data:audio/wav;base64,` + reduxAudio.audioContent} 
                onEnded={handleClick} />
                {isPlaying ? <PauseAudio /> : <PlayAudio />}
            </AudioButton>
        </>
    )
}
