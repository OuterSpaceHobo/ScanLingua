import { NavLink } from "react-router-dom";
import { Contacts } from "./Contacts";
import { ContentBox, InputP } from "./Container";

export function Howtouse() {

    return (
      <>
      <InputP style={{textAlign: `center`}}>
        For OCR and translation <span style={{color: `darkviolet`}}>ScanLingua</span> use Google Vision and Translation APIs.
      </InputP>
      <InputP style={{textAlign: `center`}}>
        Default API key limits: 1000 req & 500.000 ch translation per mounth for all users.
      </InputP>
      <InputP style={{textAlign: `center`}}>
        It's strongly recommended to set your own API key for same personal free limits:
      </InputP>
      <ContentBox style={{justifyContent: `center`, display: `flex`}}>
      <ul style={{padding: `5px`, margin: `0px`, textAlign: `center`, border: `1px solid darkviolet`, borderRadius: `10px`, width: `fit-content`, listStyleType: `none`}}>
        <li>
          <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer">
            <InputP style={{fontSize: `12px`}}>
              1. register & create a project
            </InputP>
          </a>  
        </li>
        <li>
          <a href="https://cloud.google.com/vision/docs/setup" target="_blank" rel="noreferrer">
            <InputP style={{fontSize: `12px`}}>
              2. enable Vision & Translation APIs
            </InputP>
          </a>  
        </li>
        <li>
          <a href="https://cloud.google.com/docs/authentication/api-keys#console" target="_blank" rel="noreferrer">
            <InputP style={{fontSize: `12px`}}>
            3. generate API key & set use limits 
            </InputP>
          </a>  
        </li>
        <li>
          <NavLink to="/*">
            <InputP style={{fontSize: `12px`}}>
            4. enter key in welcome form
            </InputP>
          </NavLink>  
        </li>
      </ul>
      </ContentBox>
      <InputP style={{textAlign: `center`}}>
        Developer don't have access to key as it is stored locally.
      </InputP>
      <ContentBox style={{justifyContent: `center`, display: `flex`, marginTop: `5px`}}>
          <Contacts />
      </ContentBox>
    </>
    )
  }