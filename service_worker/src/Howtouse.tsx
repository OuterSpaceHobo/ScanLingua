import { Button } from "@chakra-ui/button";
import { Contacts } from "./Contacts";
import { ContentBox, InputP } from "./Container";

export function Howtouse() {

    return (
      <>
      <InputP style={{textAlign: `center`}}>
        For text recognition and translation <span style={{color: `#008080`}}>ScanLingua</span> use Google Vision and Translation APIs.
      </InputP>
      <InputP style={{textAlign: `center`}}>
        This APIs are not free, but provide 1000 free vision requests and 500 000 free character translation per month which should suffice for personal use.
      </InputP>
      <InputP style={{textAlign: `center`}}>
        You need to create appropriate API key and pay attention for APIs usage to not exceed free monthly limits:
      </InputP>
      <a href="https://github.com/OuterSpaceHobo/ScanLingua#how-to-get-api-key" target="_blank" rel="noreferrer">
        <Button colorScheme='teal' variant='link'>
          Instruction
        </Button>
      </a>  
      <InputP style={{textAlign: `center`}}>
        To help you track key usage simple hotkey counter is set at Home tab.
      </InputP>
      <InputP style={{textAlign: `center`}}>
        Developer don't have access to key, it is stored locally. API availability is not guaranteed.
      </InputP>
      <ContentBox style={{justifyContent: `center`, display: `flex`, marginTop: `5px`}}>
          <Contacts />
      </ContentBox>
    </>
    )
  }