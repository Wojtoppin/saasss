import React, {useState, useEffect} from "react";
import { Container, Table, Input, Button } from "reactstrap";
import './AdminPanel.css'

const AdminPanel = (props) =>{
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [highestGroup, setHighestGroup] = useState(0);

  const [filteredName, setFilteredName] = useState("");
  const [filteredSurname, setFilteredSurname] = useState("");
  const [filteredMail, setFilteredMail] = useState("");
  const [filteredNumber, setFilteredNumber] = useState("");
  const [filteredGroup, setFilteredGroup] = useState("0");

  const getGroups = (functionData) =>{
    let tmpHighestGroup = 0;
    functionData.map((element)=>
      {if(element.id_grupy > tmpHighestGroup){
        tmpHighestGroup = element.id_grupy
      }}
    )
    setHighestGroup(tmpHighestGroup);
  }
  const fetchData = async () => {
      try {
        const response = await fetch('https://zienex.pythonanywhere.com/data');

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
          setFilteredData(responseData);
          getGroups(responseData);
        } else {
          console.error('Failed to fetch data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

  const filterStudents = () =>{
    let new_students_displayed = data.filter((student) =>(
      student.imie.toLowerCase().includes(filteredName.toLowerCase())
       && student.nazwisko_ucznia.toLowerCase().includes(filteredSurname.toLowerCase())
        && student.email_ucznia.toLowerCase().includes(filteredMail.toLowerCase())
          && student.telefon_ucznia.toLowerCase().includes(filteredNumber.toLowerCase())
            && (filteredGroup !== "0" && filteredGroup !== 0 ) ? student.id_grupy.toString() === filteredGroup.toString() : true
    ))
    setFilteredData(new_students_displayed)
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    filterStudents();
  }, [filteredGroup]);

  return(
      <Container className="d-flex justify-content-center mt-5 container1" style={{ position: 'relative', zIndex: 2, marginBottom:"2vh"}}>
          <Table  style={{marginBottom:"0px"}}>
              <thead>
                  <tr>
                      <th>Id</th>
                      <th>Imię</th>
                      <th>Nazwisko</th>
                      <th>id grupy</th>
                      <th>email ucznia</th>
                      <th>telefon ucznia</th>
                  </tr>
                  <tr>
                      <th>
                        {/* <Button>^</Button> */}
                        </th>
                      <th><Input type="text" value={filteredName} onKeyUp={filterStudents} onChange={(event)=>{setFilteredName(event.target.value)}}></Input></th>
                      <th><Input type="text" value={filteredSurname} onKeyUp={filterStudents} onChange={(event)=>{setFilteredSurname(event.target.value); filterStudents()}}></Input></th>
                      <th><Input type="select" onChange={(e) => {setFilteredGroup(e.target.value)}}>
                        <option value={0}> wszystkie grupy</option>
                        {Array.from({ length: highestGroup }, (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            grupa {index + 1}
                          </option>
                        ))}
                        </Input></th>
                      <th><Input type="text" value={filteredMail} onKeyUp={filterStudents} onChange={(event)=>{setFilteredMail(event.target.value); filterStudents()}}></Input></th>
                      <th><Input type="text" value={filteredNumber} onKeyUp={filterStudents} onChange={(event)=>{setFilteredNumber(event.target.value); filterStudents()}}></Input></th>
                  </tr>
              </thead>
              <tbody>
                  {Array.isArray(filteredData) && filteredData.length !== 0? filteredData.map((student)=>(
                      <tr key={student.id_ucznia}>
                          <td>{student.id_ucznia}</td>
                          <td>{student.imie}</td>
                          <td>{student.nazwisko_ucznia}</td>
                          <td>{student.id_grupy}</td>
                          <td>{student.email_ucznia}</td>
                          <td>{student.telefon_ucznia}</td>
                      </tr>
                  )):
                    data.map((student)=>(
                      <tr key={student.id_ucznia}>
                          <td>{student.id_ucznia}</td>
                          <td>{student.imie}</td>
                          <td>{student.nazwisko_ucznia}</td>
                          <td>{student.id_grupy}</td>
                          <td>{student.email_ucznia}</td>
                          <td>{student.telefon_ucznia}</td>
                      </tr>))
                }
              </tbody>
          </Table>
      </Container>
  )
}

export default AdminPanel