import { Contacts } from "./Contacts";
import { CenteredP, NameSpan, CenteredBox } from "./Container";

export function About() {

    return (
      <>
      <CenteredP>
        <NameSpan>ScanLingua</NameSpan> provides Japanese text recognition of selected screen areas with translation, kanji annotation and audio.
      </CenteredP>
      <CenteredP>
        By design, App always tries to find or interpret Japanese related data in provided image.
      </CenteredP>
      <CenteredP>
        This project is heavily inspired with Yomichan and use awesome japanese dictionary Jotoba for kanji annotation. Jotoba takes data from various resources, you can check them out at https://jotoba.de/about.     
      </CenteredP>
      <CenteredBox>
        <Contacts />
      </CenteredBox>
      </>
    )
  }