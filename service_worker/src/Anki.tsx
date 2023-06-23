import { Button } from "@chakra-ui/button";
import { Contacts } from "./Contacts";
import { CenteredP, NameSpan, CenteredBox } from "./Container";

export function Anki() {
 
    return (
      <>
        <CenteredP>
            <NameSpan>ScanLingua</NameSpan> support Anki integration via Anki-connect.
        </CenteredP>
        <CenteredP>
            You can seamlessly export general or single kanji cards to Default deck. 
            Exported cards are preset in "Cloze" type with #scanlingua hashtag.
        </CenteredP>
        <CenteredP>
            To use this function you need to enable Anki-connect add-on: 
        </CenteredP>
          <Button colorScheme='teal' variant='link'>
            <a href="https://ankiweb.net/shared/info/2055492159" target="_blank" rel="noreferrer">
              Instruction
            </a>  
          </Button> 
        <CenteredP>
            Card export works only with Anki app running on background.
        </CenteredP>
        <CenteredBox>
          <Contacts />
        </CenteredBox>
    </>
    )
  }