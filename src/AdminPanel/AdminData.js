import React, {useState, useEffect} from "react";
import { Container, Table} from "reactstrap";
import './AdminData.scss'

const AdminData = (props) =>{
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([])

  

  const fetchData = async () => {
      try {
        const response = await fetch('https://zienex.pythonanywhere.com/all-students');

        if (response.ok) {
          const responseData = await response.json();
          setHeaders(responseData[0]);
          setData(responseData.slice(1));
        } else {
          console.error('Failed to fetch data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };




  const renderHead = () => {
    return headers.map((element,index) => {
      return <th style={{background:"rgb(108, 117, 125)", color:"white"}} key={index + "header element"}>{element}</th>;
    });
  };

  const renderBody = () => {
    return data.length !==0 ? data.map((student, index) => {
        return (
        
        <tr key={index}>
            {student.map(element=>{
              return <td>{element}</td>
            })}  
          </tr>
        );
      
    }):<tr><th colSpan={headers.length}>{props.loader}</th></tr>;
  }

  useEffect(() => {
    fetchData();
  }, []);
  

  return(
      <Container className="mainData container1" style={{overflowX:"hidden", borderRadius:"10px"}}>
          
            <Table className="dataTable" hover responsive style={{marginBottom:"2px"}}>
                <thead className="sticky-thc">
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

export default AdminData