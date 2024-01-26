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
  
  const [editedId, setEditedId] = useState("none");
  const [editedName, setEditedName] = useState("");
  const [editedSurname, setEditedSurname] = useState("");
  const [editedMail, setEditedMail] = useState("");
  const [editedNumber, setEditedNumber] = useState("");
  const [editedGroup, setEditedGroup] = useState("none");

  

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
  }

  const reverseIdIndexes = () =>{
    setFilteredData(filteredData.reverse())
    setFilteredId(filterId === "ASC"? "DESC": "ASC")
  }

  const setEditedValues = (edited_name, edited_surname, edited_mail, edited_number) =>{
    setEditedName(edited_name)
    setEditedSurname(edited_surname)
    setEditedMail(edited_mail)
    setEditedNumber(edited_number)
  }

  const sendData = async (data_urodzenia, adres, dataDołączenia, poziomUmiejetnosci, uwagi) =>{
    try {
      const response = await fetch('https://zienex.pythonanywhere.com/edit_student_data', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id_ucznia': parseInt(editedId,10),
          'imie': editedName,
          'nazwisko': editedSurname,
          'data_urodzenia': data_urodzenia,
          'adres_ucznia': adres,
          'telefon': editedNumber,
          'email': editedMail,
          'id_grupy': editedGroup,
          'data_dolaczenia': dataDołączenia,
          'poziom_umiejetnosci':poziomUmiejetnosci,
          'uwagi':uwagi
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }else{
        fetchData();
      }

      const result = await response.json();
      console.log('Successfully patched data:', result);
    } catch (error) {
      console.error('Error patching data:', error.message);
    }
    

  }

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    filterStudents();
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
                      <th></th>
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
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {Array.isArray(filteredData) && filteredData.length !== 0? filteredData.map((student)=>(
                      editedId.toString() === student.id_ucznia.toString()?
                        <tr key={student.id_ucznia}>
                          <td>{student.id_ucznia}</td>
                          <td><Input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="center"></Input></td>
                          <td><Input type="text" value={editedSurname} onChange={(e) => setEditedSurname(e.target.value)} className="center"></Input></td>
                          <td><Input type="select" defaultValue={student.id_grupy} onChange={(e) => setEditedGroup(e.target.value)}>
                          {Array.from({ length: highestGroup }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                              grupa {index + 1}
                            </option>
                          ))}
                          </Input></td>
                          <td><Input type="text" value={editedMail} onChange={(e) => setEditedMail(e.target.value)} className="center"></Input></td>
                          <td><Input type="text" value={editedNumber} onChange={(e) => setEditedNumber(e.target.value)} className="center" maxLength={11}></Input></td>
                          <td>

                            <Button id="editImageButton" onClick={()=>{setEditedId("none"); sendData(student.data_urodzenia, student.adres_ucznia, student.data_dolaczenia, student.poziom_umiejetnosci, student.uwagi)}}>
                              <img src={process.env.PUBLIC_URL + '/done.png'} id="editImage" alt="done"/>
                            </Button>{" "}

                            <Button id="editImageButton" onClick={()=>setEditedId("none")}><img src={process.env.PUBLIC_URL + '/cancel.png'} id="editImage" alt="cancel"/></Button>
                          </td>
                        </tr>
                        :
                        <tr key={student.id_ucznia}>
                            <td>{student.id_ucznia}</td>
                            <td>{student.imie}</td>
                            <td>{student.nazwisko}</td>
                            <td>{student.id_grupy}</td>
                            <td>{student.email}</td>
                            <td>{student.telefon}</td>
                            <td>
                              {editedId.toString() === "none"?
                                <Button id="editImageButton" onClick={()=>{setEditedId(student.id_ucznia);setEditedValues(student.imie, student.nazwisko, student.email, student.telefon)}}><img src={process.env.PUBLIC_URL + '/edit.png'} id="editImage" alt="edit"/></Button>
                                :
                                ""}
                            </td>
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