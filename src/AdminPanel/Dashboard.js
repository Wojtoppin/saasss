import React from 'react'
import { Container, Button } from "reactstrap";
import { Col, Row } from "react-bootstrap";
import './AdminData.scss'

const Dashboard = () => {

    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('https://zienex.pythonanywhere.com/all-students');

    //     if (response.ok) {
    //       const responseData = await response.json();
    //       setHeaders(responseData[0]);
    //       setData(responseData.slice(1));
    //     } else {
    //       console.error('Failed to fetch data. Status:', response.status);
    //     }
    //   } catch (error) {
    //     console.error('Error during fetch:', error);
    //   }
    // };

  return (
    <Row className="mainData" style={{overflowX:"hidden", borderRadius:"10px", height:"95vh"}}>
            
    </Row>
  )
}

export default Dashboard