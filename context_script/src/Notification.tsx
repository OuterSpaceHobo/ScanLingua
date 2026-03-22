import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { ContentP, NotificationDiv } from "./Container";
import { useAppSelector } from './hooks'

const ERROR_KEYS = new Set([
    'notification.cardNotAdded',
    'notification.ankiNotRunning',
    'notification.audioNotCreated',
])

const Notification = () => {
    const { t } = useTranslation()
    const notification = useAppSelector(state => state.notification)
    const message = notification?.message ?? null
    const [fade, setFade] = useState(false)
    const [err, setErr] = useState(false)

    useEffect(() => {
        if (notification) {
            setErr(message !== null && ERROR_KEYS.has(message))
            setFade(true)
            setTimeout(() => {
                setFade(false)
            }, 4700)
        }
      },[notification])

    return (
    <NotificationDiv notification={notification} fade={fade} err={err}>
        <ContentP style={{color: 'white'}}>{message ? t(message) : message}</ContentP>
    </NotificationDiv>
    )
}

export default Notification;