import { Contacts } from "./Contacts";
import { CenteredP, NameSpan, CenteredBox } from "./Container";

export function About() {

    return (
      <>
      <CenteredP>
        <NameSpan>ScanLingua</NameSpan> provides Japanese, Chinese and Korean text recognition of selected screen areas with translation, annotation and audio.
      </CenteredP>
      <CenteredP>
        Extension is secure by design and don't rely on any external services exept for free native chrome APIs for audio and translation.
      </CenteredP>
      <CenteredP>
        Text recognition is powered by local engine - Baidu's PaggleOCR (PP-OCRv5).
      </CenteredP>
      <CenteredP>
        Characters annotation uses the following local dictionaries, licensed under 'CC BY-SA 4.0': KANJIDIC2, CC-CEDICT, CC-KEDICT.
      </CenteredP>
      <CenteredBox>
        <Contacts />
      </CenteredBox>
      </>
    )
  }