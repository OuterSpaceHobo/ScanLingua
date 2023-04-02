import styled from 'styled-components'

export const ZoneContainer = styled.div`
display: grid;
width: 100%;
background: none;
grid-template-columns: auto auto auto;
`
export const ContentBox = styled.div`
  width: 365px; 
  text-align: left;
  min-height: fit-content;
  max-height: 250px;
  grid-column: 1;
  background-color: white;
  z-index: calc(9e999);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: black;
  overflow:scroll;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none
  }`;

export const BlankColumn = styled.div`
  width: 5px;
  opacity: 0;
  grid-column: 2;`;

export const ButtonColumn = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  grid-column: 3;
  background: lightgrey;
  z-index: calc(9e999);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: black;
  `;

  export const ContentP = styled.p`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 17px;
  font-weight: 300;
  line-height: normal;
  text-decoration: none;
  margin: 5px 5px 5px 5px;
  -webkit-font-smoothing: antialiased;
  `;
