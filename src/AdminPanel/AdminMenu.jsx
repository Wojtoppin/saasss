import React, {useState, useEffect} from "react";
import { Container, Button } from "reactstrap";
import "./AdminData.scss"

function AdminMenu(props) {
    return (
        <Container className="AdminMenu">
            <div className="brand">
                <img src={process.env.PUBLIC_URL + '/saasICON.png'} id="logoImage" alt="piłka"/>
                {" "}
                Szkółki Sportowe
            </div>
            <div className="mainMenu">
                <Button className="menuButton" onClick={()=> props.setCurrentComponent("data")}>Dane użytkownika</Button>
                <Button className="menuButton" onClick={()=> props.setCurrentComponent("attendance")}>Lista obecności</Button>
                <Button className="menuButton" onClick={()=> {props.setStatus(""); props.setIsLoggedIn(false)}}>Wyloguj się</Button>
            </div>

        </Container>
    );
}

export default AdminMenu;