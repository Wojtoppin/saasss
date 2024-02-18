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
  const [textIfNoneMatches, setTextIfNoneMatches] = useState("żaden uczeń nie pasuje do podanych kryterii");
  const [element, setElement] = useState(850);
  
  

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
          setTextIfNoneMatches("żaden uczeń nie pasuje do podanych kryterii")
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

  const setEditedValues = (edited_name, edited_surname, edited_mail, edited_number, edited_group) =>{
    setEditedName(edited_name)
    setEditedSurname(edited_surname)
    setEditedMail(edited_mail)
    setEditedNumber(edited_number)
    setEditedGroup(edited_group)
  }

  const sendData = async (data_urodzenia, adres, dataDołączenia, poziomUmiejetnosci, uwagi) =>{
    setFilteredData([])
    setTextIfNoneMatches(<div style={{width:"100%",display:"flex",justifyContent:"center"}}><div className="loader"></div></div>)
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
    } catch (error) {
      console.error('Error patching data:', error.message);
    }
    

  }
  const checkContainerWidth = () =>{
    let containerWidth = document.getElementById("adminContainer").clientWidth;
    setElement(containerWidth);

}

  useEffect(()=>{
      checkContainerWidth();
      
  },[])

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    filterStudents();
  }, [filteredName, filteredSurname, filteredMail, filteredNumber, filteredGroup]);

  return(
      <Container onClick={checkContainerWidth} id="adminContainer" className=" justify-content-center mt-5 container1" style={{position: 'relative', overflowX:"scroll",  zIndex: 2,marginBottom:"2vh"}}> 
          <Table responsive style={{marginBottom:"0px"}}>
              <thead>
                  <tr>
                      <th>
                        <Button onClick={reverseIdIndexes}>{filterId === "ASC"? "^": "v"}</Button>
                        
                      </th>
                      <th className="field" style={{minWidth:"40px"}}>
                        <Input id="Imię" required autoComplete="off" type="text" value={filteredName} onChange={(event)=>setFilteredName(event.target.value)}></Input>
                        <label htmlFor="Imię" title="Imię" style={{display:"block", overflow:"hidden"}}></label>
                      </th>
                      <th className="field" style={{minWidth:"40px"}}>
                        <Input id="Nazwisko" required autoComplete="off" type="text" value={filteredSurname} onChange={(event)=>setFilteredSurname(event.target.value)}></Input>
                        <label htmlFor="Nazwisko" title="Nazwisko" style={{display:"block", overflow:"hidden"}}></label>
                      
                      </th>
                      <th style={{minWidth:"40px"}}>
                        <Input type="select" placeholder="id grupy" onChange={(e) => setFilteredGroup(e.target.value)}>
                        <option value={"none"}> wszystkie grupy</option>
                        {Array.from({ length: highestGroup }, (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            grupa {index + 1}
                          </option>
                        ))}
                        </Input>
                      </th>

                      <th className="field" style={{minWidth:"40px"}}>
                        <Input id="email" required autoComplete="off" type="text" value={filteredMail} onChange={(event)=>setFilteredMail(event.target.value)}></Input>
                        <label htmlFor="email" title="email" style={{display:"block", overflow:"hidden"}}></label>                      
                      </th>
                      <th colSpan={2} className="field" style={{minWidth:"100px"}}>
                        <Input id="telefon" required autoComplete="off" type="text" value={filteredNumber} onChange={(event)=>setFilteredNumber(event.target.value)}></Input>
                        <label htmlFor="telefon" title="telefon" style={{display:"block", overflow:"hidden"}}></label>                      
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {Array.isArray(filteredData) && filteredData.length !== 0? filteredData.map((student)=>(
                      editedId.toString() === student.id_ucznia.toString()?
                        <tr key={student.id_ucznia}>
                          <td>{student.id_ucznia}</td>
                          <td><Input style={{minWidth:"40px"}} type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="center"></Input></td>
                          <td><Input style={{minWidth:"40px"}} type="text" value={editedSurname} onChange={(e) => setEditedSurname(e.target.value)} className="center"></Input></td>
                          <td><Input type="select" defaultValue={student.id_grupy} onChange={(e) => setEditedGroup(e.target.value)}>
                          {Array.from({ length: highestGroup }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                              grupa {index + 1}
                            </option>
                          ))}
                          </Input></td>
                          <td><Input style={{minWidth:"40px"}} type="text" value={editedMail} onChange={(e) => setEditedMail(e.target.value)} className="center"></Input></td>
                          <td><Input style={{minWidth:"80px"}} type="text" value={editedNumber} onChange={(e) => setEditedNumber(e.target.value)} className="center" maxLength={11}></Input></td>
                          <td>

                            <Button id="editImageButton" onClick={()=>{setEditedId("none"); sendData(student.data_urodzenia, student.adres_ucznia, student.data_dolaczenia, student.poziom_umiejetnosci, student.uwagi)}}>
                              <img src={process.env.PUBLIC_URL + '/done.png'} id="editImage" alt="done"/>
                            </Button>{" "}

                            <Button id="editImageButton" onClick={()=>setEditedId("none")}><img src={process.env.PUBLIC_URL + '/cancel.png'} id="editImage" alt="cancel"/></Button>
                          </td>
                        </tr>
                        :
                        <tr key={student.id_ucznia}>
                            <td className="clamp">{student.id_ucznia}</td>
                            <td className="clamp">{student.imie}</td>
                            <td className="clamp">{student.nazwisko}</td>
                            <td className="clamp">{student.id_grupy}</td>
                            <td className="clamp">{student.email}</td>
                            <td className="clamp">{student.telefon}</td>
                            <td style={{padding:element>=650?"8px":"0px"}}>
                              {editedId.toString() === "none"?
                                <Button id="editImageButton" style={{padding:element>=650?"8px":"0px"}} onClick={()=>{setEditedId(student.id_ucznia);setEditedValues(student.imie, student.nazwisko, student.email, student.telefon, student.id_grupy)}}><img src={process.env.PUBLIC_URL + '/edit.png'} id="editImage" alt="edit"/></Button>
                                :
                                ""}
                            </td>
                        </tr>
                    
                  )):
                    
                      <tr>
                          <td colSpan={6}>{textIfNoneMatches}</td>
                      </tr>
                }
              </tbody>
          </Table>
      </Container>
  )
}

export default AdminPanel