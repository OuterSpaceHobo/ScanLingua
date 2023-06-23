import styled, { keyframes } from 'styled-components'

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
  z-index: inherit;
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
  height: 75px;
  border-radius: 5px;
  grid-column: 3;
  z-index: calc(9e999);
  color: black;
  `;

  export const ContentP = styled.p`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 20px;
  font-weight: 300;
  color: black;
  line-height: normal;
  text-decoration: none;
  margin: 5px 5px 5px 5px;
  -webkit-font-smoothing: antialiased;
  animation: fadeInAnimation ease 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  @keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
  }
  `;

  export const ContentSpan = styled.span`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 20px;
  font-weight: 300;
  color: black;
  line-height: normal;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  animation: fadeInAnimation ease 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  @keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
  }
  `;

  export const InputP = styled.p`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 20px;
  font-weight: 300;
  color: black;
  line-height: normal;
  text-decoration: none;
  margin-top: 0px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  -webkit-font-smoothing: antialiased;
  `;

  export const SaveCloseDiv = styled.div<{ input: any }>`
  display: grid;
  grid-area: '1 / 1';
  visibility: ${(props) => props.input === true ? 'visible' : 'hidden'};
  max-height: ${(props) => props.input === true ? 'fit-content' : '0px'};
  `;

  export const EditDiv = styled.div<{ input: any }>`
  display: grid;
  grid-area: '1 / 1';
  visibility: ${(props) => props.input === false ? 'visible' : 'hidden'};
  max-height: ${(props) => props.input === false ? 'fit-content' : '0px'};
  `;

  export const EditSpan = styled.span<{ input: any }>`
  display: inline-block;
  transition : opacity 0.3s ease-in-out;
  opacity: ${(props) => props.input === false ? '1' : '0'};
  `;

  export const SaveCloseSpan = styled.span<{ input: any }>`
  text-align: end;
  transition : opacity 0.3s ease-in-out;
  opacity: ${(props) => props.input === true ? '1' : '0'};
  `;
  // display: inline-block;

  export const EditTextarea = styled.textarea`
  outline: none;
  border: none;
  width: 100%;
  padding: 0px;
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 20px;
  font-weight: 300;
  color: black;
  line-height: normal;
  text-decoration: none;
  `;

  export const KanjiForm = styled.form`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 20px;
  font-weight: 300;
  color: black;
  line-height: normal;
  text-decoration: none;
  margin: 5px 5px 5px 5px;
  -webkit-font-smoothing: antialiased;
  margin-top: 0px;
  `;

  export const InfoP = styled.p`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 15px;
  font-weight: 300;
  color: black;
  line-height: normal;
  text-decoration: none;
  margin: 5px 5px 5px 5px;
  -webkit-font-smoothing: antialiased;
  width: fit-content;
  border: 1px solid teal;
  border-radius: 5px;
  padding: 2px
  `;

  // KANJI
  
  // export const KanjiP = styled.p`
  // font-family: Helvetica, "Noto Sans JP", sans-serif;
  // font-size: 30px;
  // font-weight: 300;
  // line-height: normal;
  // text-decoration: none;
  // -webkit-font-smoothing: antialiased;
  // text-align: center;
  // margin-block-start: 0em;
  // margin-block-end: 0em;
  // `;

  export const KanjiSpan = styled.span`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 30px;
  font-weight: 300;
  line-height: normal;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  margin-block-start: 0em;
  margin-block-end: 0em;
  `;

  export const KanjiStatP = styled.p`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: black;
  line-height: normal;
  text-decoration: none;
  margin: 5px 5px 5px 5px;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  padding: 2px;
  margin: 5px
  `;

  export const KanjiTd = styled.td`
  border: none;
  outline: none;
  padding: 2px;
  margin: 5px;
  text-align: center
  `;

  export const KanjiCardDiv = styled.div`
  display: grid;
  justify-content: end;
  `;

  export const KanjiTab = styled.table`
  border: none;
  outline: none;
  width: 100%;
  padding-right: 5px;
  webkit-font-smoothing: antialiased
  `;
  // border-bottom: 1px solid #ddd;

  export const BottomDiv = styled.div`
  border-bottom: 1px solid #ddd
  `;

  export const KanjiStatDiv = styled.div<{ dropdown: any, index: any }>`
  display: ${(props) => props.dropdown === props.index ? 'block' : 'none'};
  border-top: 1px solid #ddd;
  position: absolute;
  z-index: 1000000;
  background-color: white;
  width: 100%;
  `;
  // transition: visibility 0.3s ease-in-out,opacity 0.3s ease-in-out;
  // opacity: ${(props) => props.dropdown === props.index ? '1' : '0'};
  // visibility: ${(props) => props.dropdown === props.index ? 'visible' : 'hidden'};
  // max-height: ${(props) => props.dropdown === props.index ? 'fit-content' : '0px'};

  export const NotificationDiv = styled.div<{ notification: any, fade: boolean, err: boolean }>`
  border-radius: 5px;
  margin: 5px;
  text-align: center;
  position: absolute;
  width: 355px;
  background: ${(props) => props.err ? 'tomato' : '#319795'};
  z-index: 9999999;
  transition: visibility 0.3s ease-in-out,opacity 0.3s ease-in-out;
  visibility: ${(props) => props.notification ? 'visible' : 'hidden'};
  opacity: ${(props) => props.fade ? '1' : '0'};
  max-height: ${(props) => props.notification ? '100%' : '0px'};
  `;