import { useEffect, useState } from "react";
import { ContentP, NotificationDiv } from "./Container";
import { useAppSelector } from './hooks' 

const Notification = () => {
    const notification = useAppSelector(state => state.notification)
    const message = notification?.message ?? null
    const [fade, setFade] = useState(false)
    const [err, setErr] = useState(false)

    const errorMessages = [
        `Card not Added. See instruction in "Anki info" tab.`,
        `Anki is not running. Launch Anki and try again.`,
        `Audio not created. Check if text-to-speech API is ehabled.`,
    ]

    useEffect(() => {
        if (notification) {
            setErr(message !== null && errorMessages.includes(message))
            setFade(true)
            setTimeout(() => {
                setFade(false)
            }, 4700)
        }
      },[notification])

    return (
    <NotificationDiv notification={notification} fade={fade} err={err}>
        <ContentP style={{color: 'white'}}>{message}</ContentP>
    </NotificationDiv>
    )
}

export default Notification;