import { Contacts } from "./Contacts";
import { ContentBox, InputP } from "./Container";

export function About() {

    return (
      <>
      <InputP style={{textAlign: `center`}}>
      <span style={{color: `darkviolet`}}>ScanLingua</span> provides recognition, translation and kanji annotation of selected screen areas.
      </InputP>
      <InputP style={{textAlign: `center`}}>
      It is great for checking on subtitles, manga text bubbles or any japanese text.
      </InputP>
      <InputP style={{textAlign: `center`}}>
      This project is heavily inspired with Yomichan and use awesome japanese dictionary Jotoba for kanji annotation.
      </InputP>
      <InputP style={{textAlign: `center`}}>
      To-Do list: work on design, errors and existing functionality; add annotation for chinese and korean languages; add Anki integration.
      </InputP>
      <ContentBox style={{justifyContent: `center`, display: `flex`, marginTop: `5px`}}>
        <Contacts />
      </ContentBox>
      </>
    )
  }