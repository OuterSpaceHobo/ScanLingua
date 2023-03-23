import { NavLink } from "react-router-dom";
import { InputP, Navli, Navul, NavbarContainer } from "./Container";


export default function Navbar() {

  return (
    <NavbarContainer>
        <Navul>
            <Navli> 
                    <NavLink 
                    style={{ display: `block`,
                        color: `black`,
                        textAlign: `center`,
                        textDecoration: `none`}}
                    className={({isActive}) => isActive ? "active" : ""} to="/">
                        <InputP style={{fontSize: `14px`, padding: `2px`, margin: `5px`}}>Home</InputP>
                    </NavLink>            
            </Navli>
            <Navli> 
                    <NavLink
                    style={{ display: `block`,
                        color: `black`,
                        textAlign: `center`,
                        textDecoration: `none`}} 
                    className={({isActive}) => isActive ? "active" : ""} to="/howtouse">
                        <InputP style={{fontSize: `14px`, padding: `2px`, margin: `5px`}}>Setup</InputP>
                    </NavLink>            
            </Navli>
            <Navli> 
                    <NavLink 
                    style={{ display: `block`,
                        color: `black`,
                        textAlign: `center`,
                        textDecoration: `none`}}
                    className={({isActive}) => isActive ? "active" : ""} to="/about">
                        <InputP style={{fontSize: `14px`, padding: `2px`, margin: `5px`}}>About</InputP>      
                    </NavLink>            
            </Navli>
            {/* <Navli> 
                    <NavLink 
                    style={{ display: `block`,
                        color: `black`,
                        textAlign: `center`,
                        textDecoration: `none`}}
                    className={({isActive}) => isActive ? "active" : ""} to="/contacts">
                        <InputP style={{fontSize: `14px`, padding: `2px`, margin: `5px`}}>Contacts</InputP>      
                    </NavLink>            
            </Navli> */}
        </Navul>
    </NavbarContainer>
  );
}