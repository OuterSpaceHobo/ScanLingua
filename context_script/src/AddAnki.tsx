import { Anki, AnkiButton } from './Buttons';
import { useTranslation } from 'react-i18next';
import { requestAddAnkiCard } from './messages';
import { createNotification } from './reducers/notificationReducer';
import store from "./store";

export function AddAnki() {
  const { t } = useTranslation()

  const clickHandler = async () => {
    const labels: Record<string, string> = {
      picture: t('anki.picture'),
      text: t('anki.text'),
      translation: t('anki.cardTranslation'),
    }
    try {
      const result = await requestAddAnkiCard(undefined, labels) as { error?: string } | undefined
      if (result === undefined) {
        store.dispatch(createNotification('notification.cardNotAdded', 5))
      } else if (result?.error) {
        store.dispatch(createNotification('notification.cardNotAdded', 5))
      } else {
        store.dispatch(createNotification('notification.mainCardAdded', 5))
      }
    } catch {
      store.dispatch(createNotification('notification.cardNotAdded', 5))
    }
  }

  return (
      <>         
        <AnkiButton 
        onClick={clickHandler}
        title={t('overlay.createGeneralCard')}>
            <Anki />
        </AnkiButton>        
      </>
  )
}
