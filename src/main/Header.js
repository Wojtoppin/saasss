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

const Header = (props) =>{
    const [isOpen, setIsOpen] = useState(false);
    const [element, setElement] = useState(850);

    const checkContainerWidth = () =>{
        let containerWidth = document.getElementById("responsiveMenu").clientWidth;
        setElement(containerWidth);
      }
    
    const toggle = () => setIsOpen(!isOpen);
    
    useEffect(()=>{
        checkContainerWidth();
     },[element])
    
    
    return (
        <div className="banner notSelectable" onClick={checkContainerWidth} onLoad={checkContainerWidth} id="responsiveMenu" style={{ position: 'relative', zIndex: 2}}>
            
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
                    <NavbarText/>
                    
                    <NavbarText className="notSelectable headerIcon" onClick={ () =>(props.setIsCallendarVisible(!props.isCallendarVisible))}>Kalendarz</NavbarText>
                    <NavbarText className="notSelectable headerIcon">Informacje o Zapłacie</NavbarText>
                    <UncontrolledDropdown inNavbar>
                    <DropdownToggle className="notSelectable" nav caret>
                        Konto
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem className="notSelectable" onClick={ () =>(props.setIsLoginVisible(!props.isLoginVisible))}>login</DropdownItem>
                        <DropdownItem className="notSelectable">sign up</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="notSelectable">logout</DropdownItem>
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
                        <NavItem className="notSelectable" onClick={ () =>(props.setIsCallendarVisible(!props.isCallendarVisible))}>Kalendarz</NavItem>

                        <NavItem className="notSelectable">Informacje o Zapłacie</NavItem>

                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle className="notSelectable" nav caret>
                        Konto
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>login</DropdownItem>
                            <DropdownItem>sign up</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>logout</DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    </Collapse>
                </Navbar>}

            
        </div>
    )
}
export default Header;