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
          Seamlessly export general or single character cards to selected deck. Exported cards are preset in "Cloze" type with #scanlingua hashtag.
        </CenteredP>
        <CenteredP>
          To use this function you need to enable Anki-connect add-on:&nbsp;
          <Button colorScheme='teal' variant='link'>
            <a href="https://ankiweb.net/shared/info/2055492159" target="_blank" rel="noreferrer">
              Instruction
            </a>  
          </Button> 
        </CenteredP>
        <CenteredP>
          Card export works only with Anki app running on background, due to chrome API limitations, audio cannot be exported.
        </CenteredP>
        <CenteredBox>
          <Contacts />
        </CenteredBox>
    </>
    )
  }