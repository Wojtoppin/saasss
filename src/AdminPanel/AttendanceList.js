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
          let newResponeData = responseData.map((element)=>{
            return {"name":element[0], "surname":element[1],"isChecked":true}
          })
          setData(newResponeData);
        } else {
          console.error('Failed to fetch data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

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
    <>
    <Container className="mainData container1" style={{overflowX:"hidden", borderRadius:"10px", height:"10svh"}}>
    <Input type="select"onChange={(e) => setCurrentGroup(e.target.value)} defaultValue={currentGroup}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                        </Input>
    </Container>
      <Container className="mainData mt-3 container1" style={{overflowX:"hidden", borderRadius:"10px", height:"85svh"}}> 
          <Table className="dataTable" hover responsive style={{marginBottom:"0px"}}>
              <thead>
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
      </>
  )
}

export default AttendaceList