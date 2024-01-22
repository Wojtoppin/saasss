import React from "react";
import './Login.css'
import { Container, Table } from "reactstrap";
import { Input, Button } from "reactstrap"

const Login = (props) =>{

    return (
        <Container className="d-flex justify-content-center mt-5" id="responsiveLogin" style={{ position: 'relative',  zIndex: 2}}>
            <div className="login">
                <Table style={{marginBottom:"0px"}}>
                    <thead>
                        <tr>
                            <th colSpan={2} style={{textAlign:"right"}}><Button style={{color:"black", background:"white"}} onClick={() =>props.setIsLoginVisible(false)}>X</Button></th>
                        </tr>
                        <tr>
                            <th>login:</th> 
                            <th><Input type="text"></Input></th> 
                        </tr>
                        <tr>
                            <th>hasło:</th> 
                            <th><Input type="password"></Input></th> 
                        </tr>
                        <tr>
                            <th colSpan={2}>
                                <Button style={{width:"40%"}}>zaloguj</Button>
                            </th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colSpan={2}>tu będzie potwierdzenie logowania</th>
                        </tr>
                    </tbody>
                </Table>
            </div>

        </Container>
    )
}

export default Login