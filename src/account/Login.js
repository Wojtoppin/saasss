import React, {useState} from "react";
import { Container, Table } from "reactstrap";
import { Input, Button } from "reactstrap"

const Login = (props) =>{
    const [login, setLogin] = useState("user1@example.com")
    const [password, setPassword] = useState("password1")
    const [message, setMessage] = useState("")

    const sendRequest = async () => {
        props.setStatus("admin");
        props.setIsLoggedIn(true);
        props.setLoginDisplay(login);
        props.setIsLoginVisible(false);
        props.setIsUsersDataVisible(true);



      }

    return (
        <Container className="d-flex justify-content-center mt-5 container1" style={{ position: 'relative',  zIndex: 2}}>
            
                <Table style={{marginBottom:"0px"}}>
                    <thead>
                        <tr>
                            <th colSpan={2} style={{textAlign:"right"}}><Button style={{color:"black", background:"white"}} onClick={() =>props.setIsLoginVisible(false)}>X</Button></th>
                        </tr>
                        <tr>
                            <th className="field">
                                <Input id="login" required autoComplete="off" type="text" value={login} onChange={(event)=>setLogin(event.target.value)}></Input>
                                <label htmlFor="login" title="login" style={{display:"block", overflow:"hidden"}}></label>
                            </th> 
                            <th className="field">
                              <Input id="password" type="password" value={password} onChange={(event)=>setPassword(event.target.value)}></Input>
                              <label htmlFor="password" title="hasło" style={{display:"block", overflow:"hidden"}}></label>                              
                            </th> 
                        </tr>
                        <tr>
                            <th colSpan={2}>
                                <Button style={{width:"40%"}} onClick={()=>{sendRequest(); setMessage(<div style={{width:"100%",display:"flex",justifyContent:"center"}}><div className="loader"></div></div>)}}>zaloguj</Button>
                            </th> 
                        </tr>
                    </thead>
                    {message !== "" && <tbody>
                        <tr>
                            <th colSpan={2}>{message}</th>
                        </tr>
                    </tbody>}
                </Table>
            

        </Container>
    )
}

export default Login