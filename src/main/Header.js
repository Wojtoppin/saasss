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
                <Navbar>
                <NavbarBrand>Szkółki Sportowe</NavbarBrand>

                <NavbarText>Kalendarz</NavbarText>

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
                <NavbarText>Informacje o Zapłacie</NavbarText>
                </Navbar>
                
                :
                
                <Navbar>
                <NavbarToggler onClick={toggle} />
                <NavbarBrand>Szkółki Sportowe</NavbarBrand>
                
                <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    
                    <NavItem>
                        Kalendarz
                    </NavItem>
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
                <NavbarText>Informacje o Zapłacie</NavbarText>
                </Collapse>
                </Navbar>}

            
        </div>
    )
}
export default Header;