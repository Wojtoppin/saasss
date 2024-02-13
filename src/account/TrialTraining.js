import React, {useState, useEffect} from "react";
import './TrialTraining.css'
import {Input, Button} from "reactstrap"
import {
    Table,
    Container
    } from "react-bootstrap";
    import 'bootstrap/dist/css/bootstrap.min.css';

const TrialTraining = (props) =>{
    return(
        <Container className="d-flex justify-content-center mt-5 container1" style={{ position: 'relative', zIndex: 2, marginBottom: "10px"}}>

            <Table  style={{marginBottom:"0px"}}>
                <tbody>
                    <tr>
                        <th colSpan={2} style={{textAlign:"right"}}>
                            <Button onClick={()=> props.setIsTrialTrainingVisible(false)} style={{color:"black", background:"white"}}>X</Button>
                        </th>
                        </tr>
                    <tr>
                        
                        <th><Input type="text" placeholder="imię"> </Input></th>
                        <th><Input type="text" placeholder="nazwisko"> </Input></th>
                    </tr>
                    <tr>
                        
                        <th><Input type="text" placeholder="telefon rodzica"> </Input></th>
                        <th><Input type="text" placeholder="email rodzica"> </Input></th>

                    </tr>
                    <tr>
                        
                        <th><Input type="text" placeholder="rocznik"> </Input></th>
                        <th><Input type="text" placeholder="Grupa"> </Input></th>

                    </tr>
                    <tr>
                        <th><Input type="text" placeholder="adres"> </Input></th>
                        <th><Input type="text" placeholder="kod pocztowy"> </Input></th>
                    </tr>
                    <tr>
                        
                        <th colSpan={2}>
                            <Input type="select" placeholder="rozmiar koszulki" defaultValue={"m"}>
                                <option value="xs">XS</option>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                            </Input>
                        </th>
                    </tr>
                    <tr>
                        
                        <th colSpan={2}>
                            <Input type="text" placeholder="Uwagi"> </Input></th>
                    </tr>
                    <tr>
                        <th colSpan={2}><span>Akceptuję regulamin: <Input type="checkbox"></Input></span></th>
                    </tr>

                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={2}>
                            <Button style={{width:"40%"}}>Wyślij zgłoszenie na próbny trening</Button>
                        </th> 
                    </tr>
                </tfoot>

            </Table>





        </Container>
    )
}

export default TrialTraining