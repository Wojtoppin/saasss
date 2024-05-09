import React, {useState, useEffect} from "react";
import { Container, Table, Input, Button } from "reactstrap";
import { Col, Row } from "react-bootstrap";
import './AdminData.scss'

const AttendaceList = (props) =>{
  const [data, setData] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(1)
  const [message, setMessage] = useState("")
  

const fetchData = async () => {
    try {
      setData([])
      const response = await fetch(`https://zienex.pythonanywhere.com/filter-by-group?group=${currentGroup}`);

      if (response.ok) {
        const responseData = await response.json();
        let newResponeData = responseData.map((element)=>{
          return {"name":element[0], "surname":element[1],"isChecked":true}
        })
        setData(newResponeData);
        setMessage("")
      } else {
        console.error('Failed to fetch data. Status:', response.status);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

const sendFormData = async () =>{
  try {
      setMessage(props.loader)
      const today = new Date();
      const response = await fetch(`https://zienex.pythonanywhere.com/attendance?date=${formatDate(today)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            data.map(element=>{
                return {"Imię":element["name"], "Nazwisko": element["surname"],"Grupa":currentGroup,  "attendance": element["isChecked"]}
            }) 
          ),
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessage(<img src={process.env.PUBLIC_URL + '/greenDone.png'} id="acceptImage" alt="edit"/>)
      } else {
        console.error('Request failed with status:', response.status);
        setMessage("Chwilowo wystąpił problem z serwerem, spróbuj jeszcze raz wysłać to zgłoszenie za 5 min")
      }

    } catch (error) {
      console.error('Error during request:', error);
  }
}

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
    

    const handleCheckboxChange = (index) => {
      setData(prevData => {
        const newData = prevData.map((item, i) => {
          if (i === index) {
            return { ...item, isChecked: !item.isChecked };
          }
          return item;
        });
        return newData;
      });
    };
    
    const renderBody = () => {
      return data.length !== 0 ? data.map((element, index) => {
        return (
          <tr key={index} onClick={() => handleCheckboxChange(index)}>
            <td style={{ backgroundColor: index % 2 === 0 ? "#F1F1F1" : "#fff" }}>{index + 1}</td>
            <td style={{ backgroundColor: index % 2 === 0 ? "#F1F1F1" : "#fff" }}>{element["name"]}</td>
            <td style={{ backgroundColor: index % 2 === 0 ? "#F1F1F1" : "#fff" }}>{element["surname"]}</td>
    
            <td style={{ backgroundColor: index % 2 === 0 ? "#F1F1F1" : "#fff", padding: "0px", paddingRight: "1px", paddingLeft: "1px" }}>
              <Input checked={element.isChecked} type="checkbox" style={{ width: "100%", height: `30px` }} />
            </td>
          </tr>
        );
      }) : <tr><th colSpan={4}>{props.loader}</th></tr>;
    };
  

  

  useEffect(() => {
    
    fetchData();
  }, [currentGroup]);
  
 
  return(
    <Row className="mainData" style={{overflowX:"hidden", borderRadius:"10px", height:"95vh"}}>
          <Table className="dataTable" hover responsive style={{marginBottom:"0px"}}>
              <thead>
                
                <tr>
                    <th width="10%" id="testHeight"><h6 className="label-before">grupa:</h6><Input type="select"onChange={(e) => setCurrentGroup(e.target.value)} defaultValue={currentGroup}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                        </Input></th>
                    <th width="35%">Imię</th>
                    <th width="40%">Nazwisko</th>
                    <th width="15%">Obecność</th>
                </tr>
              </thead>
              <tbody>
                {renderBody()}
                <tr>
                  <td colSpan={4} className="sendAttendanceListFooter">
                    {message.length===0?<Button color="success" id="successButtonAttendance" onClick={sendFormData}>Zatwierdź</Button>:message}
                  </td>
                </tr>
              </tbody>
          </Table>
          
      </Row>
  )
}

export default AttendaceList