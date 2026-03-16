import { BsEnvelopeFill, BsGithub, BsLinkedin, BsTelegram } from 'react-icons/Bs'
import { TextP } from "./Container";

export function Contacts() {

  const iconsStyle = {
    height: '4vw', 
    width: '4vw', 
    color: '#319795',
  }

    return (
      <div
        style={{
          display: 'flex', 
          alignItems: 'center', 
          gap: '1vw', 
          marginTop: '1rem', 
          padding: '0.25rem 0.75rem',
          width: 'fit-content', 
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          border: '1px solid #e0e0e0',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
        }}
      >
        <TextP>Made by OuterSpaceHobo:</TextP>
        <a href="https://t.me/+v7OhTnrVwxBiY2Ji" target="_blank" rel="noreferrer" style={{paddingRight: '2vw'}}>
          <BsTelegram  style={iconsStyle}/>
        </a>  
        <a href="https://github.com/OuterSpaceHobo/ScanLingua.git" target="_blank" rel="noreferrer" style={{paddingRight: '2vw'}}>
          <BsGithub style={iconsStyle}/>
        </a>
        <a href="mailto:shabalin.st@gmail.com" target="_blank" rel="noreferrer">
          <BsEnvelopeFill style={iconsStyle}/>
        </a>
      </div>
    )
  }