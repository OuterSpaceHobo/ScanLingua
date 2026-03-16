import { Anki, AnkiButton } from './Buttons';
import { requestAddAnkiCard } from './messages';
import { createNotification } from './reducers/notificationReducer';
import store from "./store";

export function AddAnki() {

  const clickHandler = async () => {
    try {
      const result = await requestAddAnkiCard(undefined) as { error?: string } | undefined
      if (result === undefined) {
        store.dispatch(createNotification(`Card not Added. See instruction in "Anki info" tab.`, 5))
      } else if (result?.error) {
        store.dispatch(createNotification(result.error, 5))
      } else {
        store.dispatch(createNotification(`Main info card succesfully added to selected deck`, 5))
      }
    } catch {
      store.dispatch(createNotification(`Card not Added. See instruction in "Anki info" tab.`, 5))
    }
  }

  return (
      <>         
        <AnkiButton 
        onClick={clickHandler}
        title='Create general info card.'>
            <Anki />
        </AnkiButton>        
      </>
  )
}
