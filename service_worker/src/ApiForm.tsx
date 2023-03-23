import { useState } from "react";
import { Done } from "./Buttons";
import { ContentBox, DefaultButton, LinkButton, MainInput, MainP } from "./Container";
import { setDefaultAPI, updateAPI } from "./messages";


export function ApiForm() {
  const [userApi, setUserApi] = useState("");
  const [key, setKey] = useState("default");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    updateAPI(userApi)
    setKey("custom")
  }

  const handleDefault = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setDefaultAPI()
    setKey("default")
    setUserApi("")
  }
 
  return (
    <>
    <ContentBox style={{justifyContent: `center`, display: `flex`}}>
      <MainP>using <span style={{fontWeight: `600`}}>{key}</span> key</MainP>
    </ContentBox>

    <form 
    style={{justifyContent: `center`, display: `flex`}}
    onSubmit={handleSubmit}>
      <MainInput 
        type="text" 
        style={{ fontFamily: `Helvetica, "Noto Sans JP", sans-serif`}}
        placeholder="enter your API key"
        value={userApi}
        onChange={(e) => setUserApi(e.target.value)}
      />
      <DefaultButton 
        type="submit" 
        style={{background: `lightgrey`}}>
        <Done />
      </DefaultButton>
    </form>

    <ContentBox style={{justifyContent: `center`, display: `flex`}}>
    <LinkButton onClick={handleDefault}>
      <MainP>
        restore default
      </MainP>
    </LinkButton>   
    </ContentBox>
    </>
  )
}
