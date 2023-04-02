import { Contacts } from "./Contacts";
import { ContentBox, InputP } from "./Container";

export function About() {

    return (
      <>
      <InputP style={{textAlign: `center`}}>
      <span style={{color: `#008080`}}>ScanLingua</span> provides recognition & translation for more that 100 languages along with kanji annotation of selected screen areas.
      </InputP>
      <InputP style={{textAlign: `center`}}>
      It is great for checking on subtitles, manga panels or any japanese text.
      </InputP>
      <InputP style={{textAlign: `center`}}>
      This project is heavily inspired with Yomichan and use awesome japanese dictionary Jotoba for kanji annotation. Jotoba takes data from various resources, you can check them out at https://jotoba.de/about.     
      </InputP>
      <ContentBox style={{justifyContent: `center`, display: `flex`, marginTop: `5px`}}>
        <Contacts />
      </ContentBox>
      </>
    )
  }