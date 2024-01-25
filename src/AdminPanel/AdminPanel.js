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
  const [filteredGroup, setFilteredGroup] = useState("none");
  const [filterId, setFilteredId] = useState("ASC");
  

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
        const response = await fetch('https://zienex.pythonanywhere.com/students_data');

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
      (filteredGroup === "none" ? true : student.id_grupy.toString() === filteredGroup.toString())
        && student.imie.toLowerCase().includes(filteredName.toLowerCase())
          && student.nazwisko.toLowerCase().includes(filteredSurname.toLowerCase())
            && student.email.toLowerCase().includes(filteredMail.toLowerCase())
              && student.telefon.toLowerCase().includes(filteredNumber.toLowerCase())
    ))
    setFilteredData(new_students_displayed)
    console.log(new_students_displayed)
  }

  const reverseIdIndexes = () =>{
    setFilteredData(filteredData.reverse())
    setFilteredId(filterId === "ASC"? "DESC": "ASC")
  }


  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    filterStudents();
    console.log({"filteredName": filteredName,
      "filteredSurname": filteredSurname,
        "filteredGroup": filteredGroup,
        "filteredMail": filteredMail,
          "filteredNumber": filteredNumber})
  }, [filteredName, filteredSurname, filteredMail, filteredNumber, filteredGroup]);

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
                        <Button onClick={reverseIdIndexes}>{filterId === "ASC"? "^": "v"}</Button>
                        </th>
                      <th><Input type="text" value={filteredName} onChange={(event)=>setFilteredName(event.target.value)}></Input></th>
                      <th><Input type="text" value={filteredSurname} onChange={(event)=>setFilteredSurname(event.target.value)}></Input></th>
                      <th><Input type="select" onChange={(e) => setFilteredGroup(e.target.value)}>
                        <option value={"none"}> wszystkie grupy</option>
                        {Array.from({ length: highestGroup }, (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            grupa {index + 1}
                          </option>
                        ))}
                        </Input></th>
                      <th><Input type="text" value={filteredMail} onChange={(event)=>setFilteredMail(event.target.value)}></Input></th>
                      <th><Input type="text" value={filteredNumber} onChange={(event)=>setFilteredNumber(event.target.value)}></Input></th>
                  </tr>
              </thead>
              <tbody>
                  {Array.isArray(filteredData) && filteredData.length !== 0? filteredData.map((student)=>(
                      <tr key={student.id_ucznia}>
                          <td>{student.id_ucznia}</td>
                          <td>{student.imie}</td>
                          <td>{student.nazwisko}</td>
                          <td>{student.id_grupy}</td>
                          <td>{student.email}</td>
                          <td>{student.telefon}</td>
                      </tr>
                  )):
                    
                      <tr>
                          <td colSpan={6}>żaden uczeń nie pasuje do podanych kryterii</td>
                      </tr>
                }
              </tbody>
          </Table>
      </Container>
  )
}

export default AdminPanel