import { Contacts } from "./Contacts";
import { ContentBox, CenteredP, MainContainer, NameSpan, CenteredBox } from "./Container";
import { LanguageSelector } from "./LanguageSelector";

export function Home() {
    return (
    <>
      <MainContainer>
        <ContentBox style={{marginBottom: `5px`}}>
          <CenteredP style={{ textAlign: `center` }}>
            Welcome to <NameSpan>ScanLingua</NameSpan>!
          </CenteredP>
          <CenteredP style={{ textAlign: `center` }}>
            Select desired settings and start cropping:
          </CenteredP>
        </ContentBox>
        <LanguageSelector />
        <CenteredBox>
          <Contacts />
        </CenteredBox>
      </MainContainer>
    </>
    )
  }
