import React, {useState} from "react";
import './Callendar.css'
import {
    Table,
    Container
    } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Callendar = (props) =>{
    const [rowsAmount, setRowsAmount] = useState(4);

    const testjson = [
        ["16:00", " ", "16:00", " ", "17:30", " ", " "],
        ["16:00", " ", "16:00", " ", "17:30", " ", " "],
        ["16:00", " ", "16:00", " ", "17:30", " ", " "],
        ["16:00", " ", " ", "18:00", "17:30", " ", " "],
    ];




    const renderRows = () => {
        return Array.from({ length: rowsAmount }, (_, index) => (
            <tr>
                <td style={{background:"#03a7a7"}}><h5 style={{color:"white"}}>{index+1}</h5></td>
                {Array.from({ length: 7 }, (_, Newindex) => (
                    <td style={{background:testjson[index][Newindex] === " "? "white": "orange"}}>
                        <h5 style={{color:"black", textAlign:"center"}}>{testjson[index][Newindex] === " "? "": testjson[index][Newindex]}</h5>
                        </td>
                ))}
            </tr>
        ));
      };


    return(
        <div className="mainCallendar">
            <Container className="d-flex justify-content-center mt-5">
            <Table className="table">
                <thead>
                    <tr>
                        <th style={{background:"#03a7a7"}}><h2 className="thBlue"></h2></th>
                        <th style={{background:"#03a7a7"}}><h2 className="thBlue">poniedziałek</h2></th>
                        <th style={{background:"#03a7a7"}}><h2 className="thBlue">wtorek</h2></th>
                        <th style={{background:"#03a7a7"}}><h2 className="thBlue">środa</h2></th>
                        <th style={{background:"#03a7a7"}}><h2 className="thBlue">czwartek</h2></th>
                        <th style={{background:"#03a7a7"}}><h2 className="thBlue">piątek</h2></th>
                        <th style={{background:"#03a7a7"}}><h2 className="thBlue">sobota</h2></th>
                        <th style={{background:"#03a7a7"}}><h2 className="thBlue">niedziela</h2></th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </Table>
            </Container>
        </div>
    )
}

export default Callendar;