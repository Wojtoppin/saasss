import React, { useState } from 'react';
import {Button } from "reactstrap";
import "./AdminPanel.css"
import AdminMenu from './AdminMenu';
import AdminData from './AdminData';
import AttendaceList from './AttendanceList';


const AdminPanel = (props) => {
    const [curretComponent, setCurrentComponent] = useState("data");
    const [isMenuVisible, setisMenuVisible] = useState(true);

    return (
        <div className='AdminPanel'>
            <label class="burger" for="burger" style={{position:"absolute", top:"3px", left:"3px", zIndex:"2"}}>
                <input type="checkbox" id="burger"  onClick={() => setisMenuVisible(!isMenuVisible)}/>
                <span></span>
                <span></span>
                <span></span>
            </label>
            <AdminMenu isMenuVisible={isMenuVisible} setisMenuVisible={setisMenuVisible} setCurrentComponent={setCurrentComponent} curretComponent={curretComponent} setIsLoggedIn={props.setIsLoggedIn} setStatus={props.setStatus}/>
            
            <div className='mainComponent' style={{width:isMenuVisible?"80vw":"100vw",position:isMenuVisible?"initial":"absolute" ,marginTop:isMenuVisible?"2svh":"40px", height:isMenuVisible?"96svh":"92svh" }}>
                {curretComponent === "data"?<AdminData headers={props.headers} loader={props.loader}/>:<AttendaceList loader={props.loader}/>}
            </div>
        </div>
    );
}

export default AdminPanel;