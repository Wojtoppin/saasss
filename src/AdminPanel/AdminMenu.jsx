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
        <Container className="AdminMenu" id="AdminMenu" onClick={checkContainerWidth}>
            <Button color="none" style={{position:"absolute", top:"2px", left:"2px"}} onClick={()=> props.setisMenuVisible(false)}><img src={process.env.PUBLIC_URL + '/cancel.png'} id="logoImage" alt="menu"/></Button>
            
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