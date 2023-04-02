import { ApiInput } from "./ApiInput";
import { Contacts } from "./Contacts";
import { ContentBox, FormContainer, InputP, MainContainer } from "./Container";
import { Counter } from "./Counter";

export function Home() {
    return (
    <>
      <MainContainer>
        <ContentBox>
            <InputP style={{padding: `2px`, margin: `5px`, textAlign: `center`}}>Welcome to <span style={{color: `#008080`}}>ScanLingua</span>!</InputP>
           </ContentBox>
        <FormContainer style={{justifyContent: `center`}}>
          <ApiInput />
        </FormContainer>
        <ContentBox>
         <InputP style={{padding: `2px`, margin: `5px`, textAlign: `center`}}> & use <span style={{width: `fit-content`, border: `1px solid teal`, borderRadius: `5px`, padding: `2px`}}>Ctrl + S</span> to crop.</InputP>
        </ContentBox>
        <ContentBox style={{justifyContent: `center`, display: `flex`, marginTop: `5px`}}>
          <Counter />
        </ContentBox>
        <ContentBox style={{justifyContent: `center`, display: `flex`, marginTop: `5px`}}>
          <Contacts />
        </ContentBox>
      </MainContainer>
    </>
    )
  }
  