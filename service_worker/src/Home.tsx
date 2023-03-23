import { NavLink } from "react-router-dom";
import { ApiForm } from "./ApiForm";
import { Contacts } from "./Contacts";
import { ContentBox, FormContainer, InputP, LinkButton, MainContainer, MainP } from "./Container";


export function Home() {

    return (
    <>
      <MainContainer>
        <ContentBox>
            <InputP style={{padding: `2px`, margin: `5px`, textAlign: `center`}}>Welcome to <span style={{color: `darkviolet`}}>ScanLingua</span>!</InputP>
           </ContentBox>
        <FormContainer style={{justifyContent: `center`}}>
          <ApiForm />
        </FormContainer>
        <ContentBox>
         <InputP style={{padding: `2px`, margin: `5px`, textAlign: `center`}}> & use <span style={{fontSize: `16px`, width: `fit-content`, border: `1px solid darkviolet`, borderRadius: `10px`, padding: `2px`}}>Ctrl + S</span> to crop</InputP>
        </ContentBox>
        <ContentBox>
          <NavLink to="/howtouse">
            <MainP>
            why do I need API key?
            </MainP>
          </NavLink>   
        </ContentBox>
        <ContentBox style={{justifyContent: `center`, display: `flex`, marginTop: `5px`}}>
          <Contacts />
        </ContentBox>
      </MainContainer>
    </>
    )
  }
  