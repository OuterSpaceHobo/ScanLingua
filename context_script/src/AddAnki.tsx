import { Anki, AnkiButton } from './Buttons';
import { requestAddAnkiCard } from './messages';
import { createNotification } from './reducers/notificationReducer';
import store from "./store";

export function AddAnki() {

  const clickHandler = async () => {
    const AddCardRez: any = await requestAddAnkiCard(undefined) // optional kanji object for kanji card
    // console.log("AddCardRez", AddCardRez)
    if (AddCardRez === undefined) {
      store.dispatch(createNotification(`Card not Added. See instruction in "Anki info" tab.`, 5))
    } else if(AddCardRez?.error !== null) {
      console.log('error', AddCardRez?.error)
    } else {
      store.dispatch(createNotification(`Main info card succesfully added to default deck`, 5))
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
