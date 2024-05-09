import React, { useEffect, useState } from 'react'
import {Button, Input, Table } from "reactstrap";
import { Col, Row } from "react-bootstrap";
import './AdminData.scss'

const Dashboard = () => {
  const [data, setData] = useState([]);
  function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
  
    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
  
    return `${day}-${month}-${year}`;
  }
    const fetchData = async () => {
      try {
        const today = new Date();
        const response = await fetch(`https://zienex.pythonanywhere.com/attendance?date=${formatDate(today)}`);

        if (response.ok) {
          const responseData = await response.json();
          // setHeaders(responseData[0]);
          // setData(responseData.slice(1));
          setData(responseData["data"])
        } else {
          console.error('Failed to fetch data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };
  useEffect(()=>{fetchData()},[])

  const renderTableBody = () =>{
    return data.map((student, index)=>{
      return <tr key={`${index}: ${student["Imię"]}`}>
                <td>{student["Imię"]}</td>
                <td>{student["Nazwisko"]}</td>
                <td>{student["Grupa"]}</td>
                <td><Input readOnly checked={student["attendance"]} type="checkbox" style={{ width: "30%", height: `30px` }} /></td>
              </tr>
    })
  }

  return (
    <Row className="mainData" style={{overflowX:"hidden", borderRadius:"10px", height:"95vh"}}>
        <Table className="dataTable center" size="sm" hover responsive style={{marginBottom:"2px", padding:"0px"}}>
          <thead>
          <tr>
              <td colSpan={4} className="datePicker">Imię</td>
            </tr>
            <tr>
              <td>Imię</td>
              <td>Nazwisko</td>
              <td>Grupa</td>
              <td>obecność</td>
            </tr>
          </thead>
          <tbody>
            {renderTableBody()}
            
          </tbody>

        </Table>
    </Row>
  )
}

export default Dashboard