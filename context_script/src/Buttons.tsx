import styled from 'styled-components'

  export const DefaultButton = styled.button`
  padding: 0;
  width: 30px;
  height: 30px;
  border-radius: 0px;
  background: none;
  border: 0px;
  color: black;
  border-style: outset;
  border-width: 0px;
  padding: 0;
  cursor: pointer;
  `

  export function Loader() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6L12 3" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 21L12 19" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 12L21 12" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12L6 12" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.6569 6.34314L18.364 5.63603" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.63605 18.364L7.05026 16.9497" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.9498 16.9498L18.364 18.364" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.63605 5.63605L7.75737 7.75737" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
  }

  export function Close() {
    return (
      <div style={{margin: 'auto'}}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }

