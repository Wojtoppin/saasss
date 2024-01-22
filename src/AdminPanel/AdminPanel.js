import React, {useState, useEffect} from "react";
import { Container, Table } from "reactstrap";
import './AdminPanel.css'

const AdminPanel = (props) =>{
    const [data, setData] = useState({});

    const fetchData = async () => {
        try {
          const response = await fetch('https://zienex.pythonanywhere.com/data');
  
          if (response.ok) {
            const responseData = await response.json();
            setData(responseData);
          } else {
            console.error('Failed to fetch data. Status:', response.status);
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      };

    useEffect(() => {
        fetchData();
  }, []);

    return(
        <Container className="d-flex justify-content-center mt-5 container1" style={{ position: 'relative', marginBottom:"2vh",  zIndex: 2}}>
            <Table  style={{marginBottom:"0px"}}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>id grupy</th>
                        <th>poziom umiejętności</th>
                        <th>email ucznia</th>
                        <th>telefon ucznia</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.length !== 0 && data.map((element)=>(
                        <tr key={element.id_ucznia}>
                            <td>{element.id_ucznia}</td>
                            <td>{element.imie}</td>
                            <td>{element.nazwisko_ucznia}</td>
                            <td>{element.id_grupy}</td>
                            <td>{element.poziom_umiejetnosci}</td>
                            <td>{element.email_ucznia}</td>
                            <td>{element.telefon_ucznia}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default AdminPanel