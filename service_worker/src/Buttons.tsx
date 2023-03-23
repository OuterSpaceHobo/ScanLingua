import styled from 'styled-components'

  export const DefaultButton = styled.button`
  padding: 0;
  width: fit-content;
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

  export function Done() {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 14L9 17L18 6" stroke="#222222"/>
      </svg>
    );
  }
