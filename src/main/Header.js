import React, {useState, useEffect} from "react";
import './Header.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
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
            props.setIsLoginVisible(false)
            props.setIsAttendanceListVisible(false)

        }
        if (component === "user data"){
            props.setIsUsersDataVisible(!props.isUsersDataVisible)
            props.setIsCallendarVisible(false)
            props.setIsAttendanceListVisible(false)
        }
        if (component === "trial" || component === "normal"){
            props.setIsTrialTrainingVisible(true)
            props.setCurrentFormType(component)
            props.setIsCallendarVisible(false)
        }
        if (component === "login"){
            props.setIsLoginVisible(!props.isLoginVisible)
            props.setIsCallendarVisible(false)
            props.setIsTrialTrainingVisible(false)
        }
        if(component==="attendace"){
            props.setIsUsersDataVisible(false)
            props.setIsCallendarVisible(false)
            props.setIsAttendanceListVisible(!props.isAttendanceListVisible)
        }
    }


    useEffect(()=>{
        checkContainerWidth();
     },[element])
    
    
    return (
        <Navbar className="banner notSelectable" onClick={checkContainerWidth} onLoad={checkContainerWidth} id="responsiveMenu" style={{ position: 'relative', zIndex: 4}}>
            <NavbarBrand href="https://wojtoppin.github.io/saasss" style={{color:"#17252A"}}>
                    <img src={process.env.PUBLIC_URL + '/saasICON.png'} id="logoImage" alt="piłka"/> 
                    Szkółki Sportowe 
                </NavbarBrand>
            {element>600?
                <>
                    

                    <NavbarText/>
                    <NavbarText/>
                    <NavbarText/>
                    <NavbarText/>
                    <NavbarText/>
                    
                    {/* <NavbarText className="notSelectable headerIcon" onClick={ () =>(changeVisibility("calendar"))}>Kalendarz</NavbarText> */}



                    {props.status !== "admin" && 
                        <UncontrolledDropdown inNavbar>
                            <DropdownToggle className="notSelectable" nav caret>
                                Zapisz się na trening
                            </DropdownToggle>
                            <DropdownMenu>
                                {!props.isLoggedIn && <DropdownItem className="notSelectable" onClick={ () =>(changeVisibility("trial"))}>Próbny trening</DropdownItem>}
                                {!props.isLoggedIn && <DropdownItem className="notSelectable" onClick={ () =>(changeVisibility("normal"))}>Zwykły trening</DropdownItem>}
                            </DropdownMenu>
                        </UncontrolledDropdown>}

                    {props.isLoggedIn
                     && props.status === "admin"
                      && <NavbarText className="notSelectable headerIcon" onClick={ () =>(changeVisibility("user data"))}>Dane użytkowników</NavbarText>}
                    
                    {props.isLoggedIn
                     && props.status === "admin"
                      && <NavbarText className="notSelectable headerIcon" onClick={ () =>(changeVisibility("attendace"))}>Lista obecności</NavbarText>}

                    
                    
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

                    </>
                :
                    <>
                        <NavbarToggler onClick={toggle} />

                        <Collapse isOpen={isOpen} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem className="notSelectable" onClick={ () =>(changeVisibility("calendar"))}>Kalendarz</NavItem>


                            {props.status !== "admin" && 
                            <UncontrolledDropdown inNavbar>
                                <DropdownToggle className="notSelectable" nav caret>
                                    Zapisz się na trening
                                </DropdownToggle>
                                <DropdownMenu end>
                                    {!props.isLoggedIn && <DropdownItem className="notSelectable" onClick={ () =>(changeVisibility("trial"))}>Próbny trening</DropdownItem>}
                                    {!props.isLoggedIn && <DropdownItem className="notSelectable" onClick={ () =>(changeVisibility("normal"))}>Zwykły trening</DropdownItem>}
                                </DropdownMenu>
                            </UncontrolledDropdown>}



                            {props.isLoggedIn
                                && props.status === "admin"
                                && <NavItem className="notSelectable" onClick={ () =>(changeVisibility("user data"))}>Dane użytkowników</NavItem>}
                            
                            {props.isLoggedIn
                                && props.status === "admin"
                                && <NavItem className="notSelectable headerIcon" onClick={ () =>(changeVisibility("attendace"))}>Lista obecności</NavItem>}
                            
                            <NavItem/>
                            <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="notSelectable" nav caret>
                            {props.isLoggedIn? props.loginDisplay : "Konto"}
                            </DropdownToggle>
                            <DropdownMenu end>
                                {!props.isLoggedIn && <DropdownItem className="notSelectable" onClick={ () =>(changeVisibility("login"))}>zaloguj się</DropdownItem>}
                                {!props.isLoggedIn && <DropdownItem className="notSelectable">zarejestruj się</DropdownItem>}
                                {props.isLoggedIn && <DropdownItem className="notSelectable">{props.status}</DropdownItem>}
                                {props.isLoggedIn && <DropdownItem divider />}
                                {props.isLoggedIn && <DropdownItem className="notSelectable" onClick={() => props.logout()}>wyloguj się</DropdownItem>}
                            </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        </Collapse>
                    </>}
                </Navbar>

    )
}
export default Header;