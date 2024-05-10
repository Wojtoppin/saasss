import React, { useEffect, useState } from 'react'
import {Button, Input, Table } from "reactstrap";
import { Col, Row } from "react-bootstrap";
import './AdminData.scss'
import './ResizableTable.css'

const Dashboard = (props) => {
  const [isCurrentyEditing, setIsCurrentlyEditing] = useState(false)
  //DD-MM-YYYY
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

  //YYYY-MM-DD
  const toRetardedDateFormat = (normalDate) =>{
    const dateParts = normalDate.split('-')
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    return formattedDate
  }

  //MM-DD-YYYY
  const toEvenMoreRetardedFormat = (normalDate) =>{
    const dateParts = normalDate.split('-')
    const formattedDate = `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`
    return formattedDate
  }
  

  const [data, setData] = useState([]);
  const [text, setText] = useState("")
  const today = new Date();
  const [checkedDate, setCheckedDate] = useState(toNormalDateformat(today))


  const nextOrPreviousDate = (direction) => {

    const date = new Date(toEvenMoreRetardedFormat(checkedDate));
    
    date.setDate(date.getDate() + (direction === "previous"?(-1):1))
    return toNormalDateformat(date);
  }


  const fetchData = async () => {
    try {
      setText("loading")
      const response = await fetch(`https://zienex.pythonanywhere.com/attendance?date=${checkedDate}`);

      if (response.ok) {
        setText("")
        const responseData = await response.json();
        setData(responseData["data"])
      } else {
        setText("error")
      }
    } catch (error) {
      setText("other error")
    }
  };
  useEffect(()=>{fetchData()},[,checkedDate])

  const renderTableBody = () =>{
    return data.map((student, index)=>{
      return <tr key={`${index}: ${student["Imię"]}`} style={{width: props.isMenuVisible?"calc(76vw - 16px)":"calc(98vw - 16px)"}}>
                <td>{student["Imię"]}</td>
                <td>{student["Nazwisko"]}</td>
                <td>{student["Grupa"]}</td>
                <td><Input checked={student["attendance"]} type="checkbox" style={{ width: "30%", height: `30px` }} /></td>
              </tr>
    })
  }

  return (
    <Row className="mainData" style={{overflowX:"hidden", borderRadius:"10px", height:"95vh"}}>
        <Table className="dataTable center" size="sm" hover responsive style={{marginBottom:"2px", padding:"0px"}}>
          <thead style={{width: props.isMenuVisible?"calc(76vw - 16px)":"calc(98vw - 16px)"}}>
          <tr style={{width: props.isMenuVisible?"calc(76vw - 16px)":"calc(98vw - 16px)"}}>
              <td>
                <Input type='button' onClick={() => setCheckedDate(nextOrPreviousDate("previous"))} value={"< poprzedni dzień"}/>
              </td>
              <td colSpan={2} className="datePicker">
                <Input type='date'
                value={toRetardedDateFormat(checkedDate)}
                  onChange={(e)=>{
                  const dateParts = e.target.value.split('-')
                  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
                  setCheckedDate(formattedDate)
                  }}/>
              </td>

              <td>
              <Input type='button' onClick={() => setCheckedDate(nextOrPreviousDate("next"))} value={"następny dzień >"}/>
              </td>
            </tr>
            <tr style={{width: props.isMenuVisible?"calc(76vw - 16px)":"calc(98vw - 16px)"}}>
              <td colSpan={4}>
                {!isCurrentyEditing?
                  <Input bsSize='sm' className='bg-primary text-white' type='button' onClick={() => setIsCurrentlyEditing(!isCurrentyEditing)} value={"edytuj dane"}/>
                  :
                  <Input bsSize='sm' className='bg-success text-white' type='button' onClick={() => setIsCurrentlyEditing(!isCurrentyEditing)} value={"zatwierdź dane"}/>

                }
                </td>
            </tr>
            {text !== "error" && text !== "loading" &&<tr className='notSelectable tableHeaderData' style={{width: props.isMenuVisible?"calc(76vw - 16px)":"calc(98vw - 16px)"}}>
              <td style={{background:"rgb(108, 117, 125)", color:"white"}}>Imię</td>
              <td style={{background:"rgb(108, 117, 125)", color:"white"}}>Nazwisko</td>
              <td style={{background:"rgb(108, 117, 125)", color:"white"}}>Grupa</td>
              <td style={{background:"rgb(108, 117, 125)", color:"white"}}>obecność</td>
            </tr>}
          </thead>
          <tbody style={{width: props.isMenuVisible?"76vw":"98vw"}}>
            {text.length===0?
              renderTableBody()
              :
              <tr style={{width: props.isMenuVisible?"calc(76vw - 16px)":"calc(98vw - 16px)"}}>
                <td colSpan={4}>
                  {text === "loading"?
                    props.loader
                    :
                    text === "error"?
                      "W tym dniu nie odbył się żaden trening"
                      :
                      "błąd serwera, spróbuj ponownie za 5 min"}
                </td>  
              </tr>
                }
            
          </tbody>

        </Table>
    </Row>
  )
}

export default Dashboard