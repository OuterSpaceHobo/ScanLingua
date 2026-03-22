import { useAppSelector } from './hooks'

const Notification = () => {
    const notification = useAppSelector(state => state.notification)

    if (!notification) {
        return null
    }

    return <p className="text-xs font-light m-[5px] animate-fade-in">{notification}</p>
}

export default Notification;
