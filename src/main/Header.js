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

const Header = () =>{
    const [isOpen, setIsOpen] = useState(false);
    const [element, setElement] = useState(850);

    const checkContainerWidth = () =>{
        let containerWidth = document.getElementById("responsiveMenu").clientWidth;
        setElement(containerWidth);
        console.log(containerWidth)
      }
    
    const toggle = () => setIsOpen(!isOpen);
    
    useEffect(()=>{
        checkContainerWidth();
     },[element])
    
    
    return (
        <div className="banner" onClick={checkContainerWidth} onLoad={checkContainerWidth} id="responsiveMenu">
            
                {element>600?
                <Navbar color="faded" light>
                    <NavbarBrand>
                        <img src={process.env.PUBLIC_URL + '/saasICON.png'} id="logoImage"/> 
                        Szkółki Sportowe 
                    </NavbarBrand>
                    <NavbarText/>
                    <NavbarText/>
                    <NavbarText>Kalendarz</NavbarText>
                    <NavbarText>Informacje o Zapłacie</NavbarText>
                    <UncontrolledDropdown inNavbar>
                    <DropdownToggle nav caret>
                        Konto
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>login</DropdownItem>
                        <DropdownItem>sign up</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>logout</DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </Navbar>
                
                :
                
                <Navbar>
                    <NavbarBrand>
                        <img src={process.env.PUBLIC_URL + '/saasICON.png'} id="logoImage"/> 
                        Szkółki Sportowe 
                    </NavbarBrand>

                    <NavbarToggler onClick={toggle} />

                    <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            Kalendarz
                        </NavItem>
                    <NavItem>Informacje o Zapłacie</NavItem>

                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
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