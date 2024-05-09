import React, { useEffect, useState } from 'react'
import {Button, Input, Table } from "reactstrap";
import { Col, Row } from "react-bootstrap";
import './AdminData.scss'

const Dashboard = (props) => {
  const toNormalDateformat = (date) => {
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

  const toRetardedDateFormat = (normalDate) =>{
    const dateParts = normalDate.split('-')
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    return formattedDate
  }

  const [data, setData] = useState([]);
  const [text, setText] = useState("")
  const today = new Date();
  const [checkedDate, setCheckedDate] = useState(toNormalDateformat(today))


  const fetchData = async () => {
    try {
      setText("loading")
      const response = await fetch(`https://zienex.pythonanywhere.com/attendance?date=${checkedDate}`);

      if (response.ok) {
        setText("")
        const responseData = await response.json();
        setData(responseData["data"])
      } else {
        console.error('Failed to fetch data. Status:', response.status);
        setText("error")
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  useEffect(()=>{fetchData()},[,checkedDate])

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
              <td colSpan={4} className="datePicker">
                <Input type='date'
                value={toRetardedDateFormat(checkedDate)}
                  onChange={(e)=>{
                  const dateParts = e.target.value.split('-')
                  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
                  setCheckedDate(formattedDate)
                  }}/>
              </td>
            </tr>
            <tr>
              <td>Imię</td>
              <td>Nazwisko</td>
              <td>Grupa</td>
              <td>obecność</td>
            </tr>
          </thead>
          <tbody>
            {text.length===0?
              renderTableBody()
              :
              <tr>
                <td colSpan={4}>
                  {text === "loading"?
                    props.loader
                    :
                    "W tym dniu nie odbył się żaden trening"}
                </td>  
              </tr>
                }
            
          </tbody>

        </Table>
    </Row>
  )
}

export default Dashboard