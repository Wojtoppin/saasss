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
            
            {isMenuVisible && <AdminMenu setisMenuVisible={setisMenuVisible} setCurrentComponent={setCurrentComponent} curretComponent={curretComponent} setIsLoggedIn={props.setIsLoggedIn} setStatus={props.setStatus}/>}
            <div className='mainComponent' style={{width:isMenuVisible?"80vw":"100vw", marginTop:isMenuVisible?"2svh":"40px", height:isMenuVisible?"96svh":"92svh" }}>
                {!isMenuVisible && <Button color="none" style={{position:"absolute", top:"2px", left:"2px"}} onClick={()=> setisMenuVisible(true)}><img src={process.env.PUBLIC_URL + '/hamburger.png'} id="logoImage" alt="piłka"/></Button>}
                {curretComponent === "data"?<AdminData headers={props.headers} loader={props.loader}/>:<AttendaceList loader={props.loader}/>}
            </div>
        </div>
    );
}

export default AdminPanel;