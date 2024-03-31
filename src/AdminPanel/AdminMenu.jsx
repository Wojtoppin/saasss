import React, {useState, useEffect} from "react";
import { Container, Button } from "reactstrap";
import "./AdminData.scss"

function AdminMenu(props) {
    const [element, setElement] = useState(850);


    const checkContainerWidth = () =>{
        let containerWidth = document.getElementById("AdminMenu").clientWidth;
        setElement(containerWidth);
    }

    useEffect(()=>{
        checkContainerWidth();
    },[])

    return (
        <Container className={`AdminMenu slide-in-menu ${props.isMenuVisible ? 'visible' : ''}`} id="AdminMenu" onClick={checkContainerWidth} >
            
            
            <div className="brand">
                <img src={process.env.PUBLIC_URL + '/saasICON.png'} id="logoImage" alt="piłka"/>
                {element >=175 && " Szkółki sportowe"}
            </div>
            

            <div className="mainMenu">
                <Button className="menuButton" size={element >=175?"false":"sm"} style={{marginTop:"20px"}}outline={props.curretComponent!=="data"} onClick={()=> props.setCurrentComponent("data")}>{element>=120?"Dane użytkowników":"Dane"}</Button>
                <Button className="menuButton" size={element >=175?"false":"sm"} outline={props.curretComponent!=="attendance"} onClick={()=> props.setCurrentComponent("attendance")}>{element>=120?"Lista obecności":"Obecność"}</Button>
                <Button className="menuButton bottomButton" size={element >=175?"false":"sm"} outline style={{width:"19.3svw"}} onClick={()=> {props.setStatus(""); props.setIsLoggedIn(false)}}>{element>=120?"Wyloguj się":"wyloguj"}</Button>
            </div>

        </Container>
    );
}

export default AdminMenu;