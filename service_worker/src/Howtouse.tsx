import { Button } from "@chakra-ui/button";
import { Contacts } from "./Contacts";
import { CenteredP, NameSpan, CenteredBox } from "./Container";

export function Howtouse() {
 
    return (
      <>
        <CenteredP>
          <NameSpan>ScanLingua</NameSpan> use various Google APIs.
        </CenteredP>
        <CenteredP>
          This APIs provide free monthly limits, which should suffice for personal use (e.g. recognition API provide 1000 free requests).     
        </CenteredP>
        <CenteredP>
          You need to create free API key and pay attention to not exceed monthly limits:
        </CenteredP>
          <Button colorScheme='teal' variant='link'>
            <a href="https://github.com/OuterSpaceHobo/ScanLingua#how-to-get-api-key" target="_blank" rel="noreferrer">
              Instruction
            </a>  
          </Button> 
        <CenteredP>
          To help you track key usage counter is set at Home tab.
          Developer don't have access to key. API availability is not guaranteed.
        </CenteredP>
        <CenteredBox>
          <Contacts />
        </CenteredBox>
    </>
    )
  }