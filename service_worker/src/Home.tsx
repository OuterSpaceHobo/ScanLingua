import { ApiInput } from "./ApiInput";
import { Contacts } from "./Contacts";
import { ContentBox, CenteredP, MainContainer, NameSpan, CenteredBox } from "./Container";
import { Counter } from "./Counter";

export function Home() {

  const spanStyle = {
    width: `fit-content`, 
    border: `1px solid teal`, 
    borderRadius: `5px`, 
    padding: `2px`
  }

    return (
    <>
      <MainContainer>
        <ContentBox style={{marginBottom: `5px`}}>
          <CenteredP>
            Welcome to <NameSpan>ScanLingua</NameSpan>!
          </CenteredP>
        </ContentBox>
        <ApiInput />
        <CenteredBox>
          <CenteredP> 
            & use <span style={spanStyle}>
            Ctrl + Shift + S
            </span> to crop.
          </CenteredP>
        </CenteredBox>
        <CenteredBox>
          <Counter />
        </CenteredBox>
        <CenteredBox>
          <Contacts />
        </CenteredBox>
      </MainContainer>
    </>
    )
  }
  