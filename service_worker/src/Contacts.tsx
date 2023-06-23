// @ts-nocheck
import { BsEnvelopeFill, BsGithub, BsLinkedin, BsTelegram } from 'react-icons/Bs'
import { TextP } from "./Container";

export function Contacts() {

  const iconsStyle = {
    height: '4vw', 
    width: '4vw', 
    color: 'lightgray'
  }

    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <TextP>Made by OuterSpaceHobo</TextP>
        <a href="https://t.me/+v7OhTnrVwxBiY2Ji" target="_blank" rel="noreferrer" style={{paddingRight: '2vw'}}>
          <BsTelegram  style={iconsStyle}/>
        </a>  
        <a href="https://github.com/OuterSpaceHobo/ScanLingua.git" target="_blank" rel="noreferrer" style={{paddingRight: '2vw'}}>
          <BsGithub style={iconsStyle}/>
        </a>  
        <a href="https://www.linkedin.com/in/shabalinst/" target="_blank" rel="noreferrer" style={{paddingRight: '2vw'}}>
          <BsLinkedin style={iconsStyle}/>
        </a>
        <a href="mailto:shabalin.st@gmail.com" target="_blank" rel="noreferrer">
          <BsEnvelopeFill style={iconsStyle}/>
        </a>
      </div>
    )
  }