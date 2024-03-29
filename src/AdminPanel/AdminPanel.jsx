import React, { useState } from 'react';
import "./AdminPanel.css"
import AdminMenu from './AdminMenu';
import AdminData from './AdminData';
import AttendaceList from './AttendanceList';


const AdminPanel = (props) => {
    const [curretComponent, setCurrentComponent] = useState("data");


    return (
        <div className='AdminPanel'>
            <AdminMenu setCurrentComponent={setCurrentComponent} setIsLoggedIn={props.setIsLoggedIn} setStatus={props.setStatus}/>
            <div className='mainComponent'>
                {curretComponent === "data"?<AdminData headers={props.headers} loader={props.loader}/>:<AttendaceList loader={props.loader}/>}
            </div>
        </div>
    );
}

export default AdminPanel;