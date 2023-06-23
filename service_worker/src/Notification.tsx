import { NotifP } from "./Container";
import { useAppSelector } from './hooks' 

const Notification = () => {
    const notification = useAppSelector(state => state.notification)

    if (!notification) {
        return null
    }

    return <NotifP>{notification}</NotifP>
}

export default Notification;