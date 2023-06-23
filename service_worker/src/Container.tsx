import styled from 'styled-components'

 // NAVBAR

export const NavbarContainer = styled.div`
  display: grid;
  width: 400px;
  height: 30px;
  background: none;
  overflow: visible;
  position: relative;
  `;

export const Nav = styled.nav`
  padding: 10px;
  box-shadow: 0px 3px 7px 1px rgba(0, 0, 0, 0.07),
  0px -3px 7px 1px rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
  }
  `;

export const Navul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: lightgrey;
  justify-content:center;
  display: flex;
  }
  `;

export const Navli = styled.li`
  float: left;
 }
 `;

export const Navitem = styled.a`
  display: block;
  color: black;
  text-align: center;
  padding: 16px;
  text-decoration: none;
 }
 `;

// MAIN

  export const MainContainer = styled.div`
  display: grid;
  width: 400px;
  height: fit-content;
  grid-template-rows: auto auto auto auto auto;
  background: none;
  overflow: visible;
  position: relative;
  `;

  export const FormContainer = styled.div`
  display: grid;
  width: 400px;
  height: fit-content;
  grid-template-rows: auto auto;
  background: none;
  overflow: visible;
  position: relative;
  `;

export const ContentBox = styled.div`
  width: 100%;
  height: fit-content;
  background: none;
  color: black;
  position: relative;
  `;

  export const CenteredBox = styled.div`
  width: 100%;
  height: fit-content;
  background: none;
  color: black;
  position: relative;
  justify-content: center;
  display: flex; 
  margin-top: 5px;
  `;

  export const MainP = styled.p`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 12px;
  font-weight: 300;
  line-height: normal;
  padding: 2px;
  margin: 1px;
  text-align: center;
  color: black;
  text-decoration: underline;
  text-decoration-color: darkviolet;
  cursor: pointer;
  `;

  export const MainForm = styled.form`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: normal;
  padding: 2px;
  margin: 5px 5px 5px 5px;
  text-align: center;
  color: black;
  border: 1px solid; 
  borderRadius: 10px;
  `;

  export const MainInput = styled.input`
  width: fit-content, 
  height: 30px;
  border: 1px solid lightgrey,
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: normal;
  text-align: center;
  color: black;
  outline: none;
  margin-right: 5px;
  &:focus {
    border: 2px solid darkgrey,
  }
  `;

// UNI

export const InputP = styled.p`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 17px;
  font-weight: 300;
  line-height: normal;
  margin: 5px 5px 5px 5px;
  color: black;
  text-decoration: none;
  `;
  // font-size: 17px;


  export const CenteredP = styled.p`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 17px;
  font-weight: 300;
  line-height: normal;
  margin: 5px 5px 5px 5px;
  color: black;
  text-decoration: none;
  text-align: center;
  `; 
  // font-size: 17px;


  export const TextP = styled.p`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 12px;
  font-weight: 300;
  line-height: normal;
  margin: 5px 5px 5px 5px;
  color: black;
  text-decoration: none;
  `;

export const LinkButton = styled.button`
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  &:hover {
    background: none;
    color: darkviolet;
  }
  `;

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

  export const NotifP = styled.p`
  font-family: Helvetica, "Noto Sans JP", sans-serif;
  font-size: 12px;
  font-weight: 300;
  line-height: normal;
  margin: 5px 5px 5px 5px;
  color: black;
  text-decoration: none;
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
  `
  export const NameSpan = styled.span`
  color: #008080;
  `;