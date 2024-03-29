import React, {useState, useEffect} from "react";
import { Container, Table, Input, Button } from "reactstrap";
import './AdminData.scss'

const AttendaceList = (props) =>{
  const [data, setData] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(1)
  

  

  const fetchData = async () => {
      try {
        const response = await fetch(`https://zienex.pythonanywhere.com/students_by_group?group=${currentGroup}`);

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


//   const sendData = async (data_urodzenia, adres, dataDołączenia, poziomUmiejetnosci, uwagi) =>{
//     setFilteredData([])
//     setTextIfNoneMatches(<div style={{width:"100%",display:"flex",justifyContent:"center"}}><div className="loader"></div></div>)
//     try {
//       const response = await fetch('https://zienex.pythonanywhere.com/edit_student_data', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           'id_ucznia': parseInt(editedId,10),
//           'imie': editedName,
//           'nazwisko': editedSurname,
//           'data_urodzenia': data_urodzenia,
//           'adres_ucznia': adres,
//           'telefon': editedNumber,
//           'email': editedMail,
//           'id_grupy': editedGroup,
//           'data_dolaczenia': dataDołączenia,
//           'poziom_umiejetnosci':poziomUmiejetnosci,
//           'uwagi':uwagi
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Request failed');
//       }else{
//         // fetchData();
//       }
//     } catch (error) {
//       console.error('Error patching data:', error.message);
//     }
    

//   }

    const renderBody = ()=>{
        return data.length !== 0? data.map((element,index)=>{
            return <tr key={index}>
                <td style={{ backgroundColor: index % 2 === 0 ? "#F1F1F1" : "#fff" }}>{index + 1}</td>
                <td style={{ backgroundColor: index % 2 === 0 ? "#F1F1F1" : "#fff" }}>{element[0]}</td>
                <td style={{ backgroundColor: index % 2 === 0 ? "#F1F1F1" : "#fff" }}>{element[1]}</td>
                <td style={{ backgroundColor: index % 2 === 0 ? "#F1F1F1" : "#fff", padding:"0px", paddingRight:"1px", paddingLeft:"1px" }}><Input type="checkbox" style={{width:"100%",height:`30px`}}/></td>
            </tr>
        }):<tr><th colspan={4}>{props.loader}</th></tr>;
    }
  

  

  useEffect(() => {
    fetchData();
    setData([])
  }, [currentGroup]);
  
 
  return(
      <Container className="mainData container1" style={{overflowX:"hidden", borderRadius:"10px", height:"auto"}}> 
          <Table responsive style={{marginBottom:"0px"}}>
              <thead>
                <tr>
                    <th colSpan={4}>
                        <Input type="select"onChange={(e) => setCurrentGroup(e.target.value)} defaultValue={currentGroup}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                        </Input>
                    </th>
                </tr>
                <tr>
                    <th width="10%" id="testHeight"></th>
                    <th width="35%">Imię</th>
                    <th width="40%">Nazwisko</th>
                    <th width="15%">Obecność</th>
                </tr>
              </thead>
              <tbody>
                  {renderBody()}
              </tbody>
          </Table>
      </Container>
  )
}

export default AttendaceList