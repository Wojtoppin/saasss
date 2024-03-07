import React, {useState, useEffect} from "react";
import { Container, Table, Input, Button } from "reactstrap";
import './AdminPanel.css'

const AdminPanel = (props) =>{
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
  
  const [isHeadRendered,setIsHeadRendered] = useState(false);
  

  

  const fetchData = async () => {
      try {
        const response = await fetch('https://zienex.pythonanywhere.com/students_data');

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
          // setFilteredData(responseData);
          // setTextIfNoneMatches("żaden uczeń nie pasuje do podanych kryterii")
        } else {
          console.error('Failed to fetch data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

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
        // fetchData();
      }
    } catch (error) {
      console.error('Error patching data:', error.message);
    }
    

  }

  const checkContainerWidth = () =>{
    let containerWidth = document.getElementById("adminContainer").clientWidth;
    setElement(containerWidth);

  }

  const renderHead = () => {
    return Object.keys(props.headers).map((element,index) => {
      return <th key={index + "header element"}>{element}</th>;
    });
  };

  const renderBody = () => {
    return data.map((student, index) => {
      return (
        <tr key={index}>
          {Object.keys(props.headers).map((header, headerIndex) => {
            return <td key={headerIndex}>{student[header]}</td>;
          })}
        </tr>
      );
    });
  }

  useEffect(() => {
    checkContainerWidth();
    fetchData();
  }, []);
  
 
  return(
      <Container onClick={checkContainerWidth} id="adminContainer" className=" justify-content-center mt-5 container1" style={{position: 'relative', overflowX:"scroll",  zIndex: 2,marginBottom:"2vh"}}> 
          <Table responsive style={{marginBottom:"0px"}}>
              <thead>
                  <tr>
                      {renderHead()}
                  </tr>
              </thead>
              <tbody>
                  {renderBody()}
                  
              </tbody>
          </Table>
      </Container>
  )
}

export default AdminPanel