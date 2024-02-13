import React, {useState, useEffect} from "react";
import './Header.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
  } from 'reactstrap';
import { DropdownItemText } from "react-bootstrap";

const Header = (props) =>{
    const [isOpen, setIsOpen] = useState(false);
    const [element, setElement] = useState(850);

    const checkContainerWidth = () =>{
        let containerWidth = document.getElementById("responsiveMenu").clientWidth;
        setElement(containerWidth);
      }
    
    const toggle = () => setIsOpen(!isOpen);
    
    const changeVisibility = (component) =>{
        if (component === "calendar"){
            props.setIsCallendarVisible(!props.isCallendarVisible)
            props.setIsUsersDataVisible(false)
            props.setIsTrialTrainingVisible(false)

        }
        if (component === "user data"){
            props.setIsUsersDataVisible(!props.isUsersDataVisible)
            props.setIsCallendarVisible(false)
            props.setIsTrialTrainingVisible(false)

        }
        if (component === "trial"){
            props.setIsTrialTrainingVisible(!props.isTrialTrainingVisible)
            props.setIsUsersDataVisible(false)
            props.setIsCallendarVisible(false)
        }
        if (component === "login"){
            props.setIsLoginVisible(!props.isLoginVisible)
            props.setIsUsersDataVisible(false)
            props.setIsCallendarVisible(false)
            props.setIsTrialTrainingVisible(false)

        }
    }


    useEffect(()=>{
        checkContainerWidth();
     },[element])
    
    
    return (
        <div className="banner notSelectable" onClick={checkContainerWidth} onLoad={checkContainerWidth} id="responsiveMenu" style={{ position: 'relative', zIndex: 4}}>
            
                {element>600?
                <Navbar color="faded" light>
                    <NavbarBrand>
                        <img src={process.env.PUBLIC_URL + '/saasICON.png'} id="logoImage" alt="piłka"/> 
                        Szkółki Sportowe 
                    </NavbarBrand>

                    <NavbarText/>
                    <NavbarText/>
                    <NavbarText/>
                    <NavbarText/>
                    <NavbarText/>
                    <NavbarText/>
                    <NavbarText/>
                    
                    <NavbarText className="notSelectable headerIcon" onClick={ () =>(changeVisibility("calendar"))}>Kalendarz</NavbarText>
                    {props.status !== "admin" && <NavbarText className="notSelectable headerIcon" onClick={ () =>(changeVisibility("trial"))}>Próbny trening</NavbarText>}
                    
                    {props.isLoggedIn
                     && props.status === "admin"
                      && <NavbarText className="notSelectable headerIcon" onClick={ () =>(changeVisibility("user data"))}>Dane użytkowników</NavbarText>}
                    {/* {props.isLoggedIn && props.status === "rodzic" && <NavbarText className="notSelectable headerIcon">Informacje o Zapłacie</NavbarText>} */}
                    <UncontrolledDropdown inNavbar>
                    <DropdownToggle className="notSelectable" nav caret>
                        {props.isLoggedIn? props.loginDisplay : "Konto"}
                    </DropdownToggle>
                    <DropdownMenu>
                        {!props.isLoggedIn && <DropdownItem className="notSelectable" onClick={ () =>(changeVisibility("login"))}>zaloguj się</DropdownItem>}
                        {!props.isLoggedIn && <DropdownItem className="notSelectable">zarejestruj się</DropdownItem>}
                        {props.isLoggedIn && <DropdownItemText className="notSelectable">{props.status}</DropdownItemText>}
                        {props.isLoggedIn && <DropdownItem divider />}
                        {props.isLoggedIn && <DropdownItem className="notSelectable" onClick={() => props.logout()}>wyloguj się</DropdownItem>}
                    </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavbarText/>

                </Navbar>
                
                :
                
                <Navbar>
                    <NavbarBrand>
                        <img src={process.env.PUBLIC_URL + '/saasICON.png'} id="logoImage" alt="piłka"/> 
                        Szkółki Sportowe 
                    </NavbarBrand>

                    <NavbarToggler onClick={toggle} />

                    <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem className="notSelectable" onClick={ () =>(changeVisibility("calendar"))}>Kalendarz</NavItem>
                        <NavItem/>
                        {props.status !== "admin" && <NavItem className="notSelectable" onClick={ () =>(changeVisibility("trial"))}>Próbny trening</NavItem>}
                        <NavItem/>
                        {props.isLoggedIn
                            && props.status === "admin"
                            && <NavItem className="notSelectable" onClick={ () =>(changeVisibility("user data"))}>Dane użytkowników</NavItem>}
                        <NavItem/>
                        {/* <NavItem className="notSelectable">Informacje o Zapłacie</NavItem> */}
                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle className="notSelectable" nav caret>
                        {props.isLoggedIn? props.loginDisplay : "Konto"}
                        </DropdownToggle>
                        <DropdownMenu right>
                            {!props.isLoggedIn && <DropdownItem className="notSelectable" onClick={ () =>(changeVisibility("login"))}>zaloguj się</DropdownItem>}
                            {!props.isLoggedIn && <DropdownItem className="notSelectable">zarejestruj się</DropdownItem>}
                            {props.isLoggedIn && <DropdownItem className="notSelectable">{props.status}</DropdownItem>}
                            {props.isLoggedIn && <DropdownItem divider />}
                            {props.isLoggedIn && <DropdownItem className="notSelectable" onClick={() => props.logout()}>wyloguj się</DropdownItem>}
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    </Collapse>
                </Navbar>}

            
        </div>
    )
}
export default Header;