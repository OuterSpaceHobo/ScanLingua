import { useEffect, useState } from "react";
import { ContentP, NotificationDiv } from "./Container";
import { useAppSelector } from './hooks' 

const Notification = () => {
    const notification = useAppSelector(state => state.notification)
    const [fade, setFade] = useState(false)
    const [err, setErr] = useState(false)

    useEffect(() => {
        if (notification &&
            notification === `Main info card succesfully added to default deck`) {
                setFade(true)
                setTimeout(() => {
                    setFade(false)
                }, 4700)
        } else if (
            notification &&
            notification === `Card not Added. See instruction in "Anki info" tab.`) {
                setErr(true)
                setFade(true)
                setTimeout(() => {
                    setFade(false)
                }, 4700)
        } else if (
            notification &&
            notification === `Kanji card succesfully added to default deck.`) {
                setErr(false)
                setFade(true)
                setTimeout(() => {
                    setFade(false)
                }, 4700)
            } else if (
            notification &&
            notification === `Audio not created. Check if text-to-speech API is ehabled.`) {
                setErr(true)
                setFade(true)
                setTimeout(() => {
                    setFade(false)
                }, 4700)
            }
      },[notification])

    return (
    <NotificationDiv notification={notification} fade={fade} err={err}>
        <ContentP style={{color: 'white'}}>{notification}</ContentP>
    </NotificationDiv>
    )
}

export default Notification;