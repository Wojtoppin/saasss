import React, {useState} from "react";
import { Container, Table } from "reactstrap";
import { Input, Button } from "reactstrap"

const Login = (props) =>{
    const [login, setLogin] = useState("user1@example.com")
    const [password, setPassword] = useState("password1")
    // const [login, setLogin] = useState("")
    // const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const sendRequest = async () => {
        try {
          const response = await fetch('https://zienex.pythonanywhere.com/login_user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: login, password: password }),
          });
          
          if (response.ok) {
            const data = await response.json();
            props.setStatus("admin");
            // props.setStatus(data["user_status"]);
            props.setIsLoggedIn(true);
            props.setLoginDisplay(login);
            props.setIsLoginVisible(false);
            props.setIsUsersDataVisible(true);
          } else {
            console.error('Request failed with status:', response.status);
            setMessage("podany login lub hasło jest nieprawidłowe")

          }
        } catch (error) {
          console.error('Error during request:', error);
          setMessage("podany login lub hasło jest nieprawidłowe")
        }
      }

    return (
        <Container className="d-flex justify-content-center mt-5 container1" style={{ position: 'relative',  zIndex: 2}}>
            
                <Table style={{marginBottom:"0px"}}>
                    <thead>
                        <tr>
                            <th colSpan={2} style={{textAlign:"right"}}><Button style={{color:"black", background:"white"}} onClick={() =>props.setIsLoginVisible(false)}>X</Button></th>
                        </tr>
                        <tr>
                            <th>
                                <Input type="text" placeholder="login" value={login} onChange={(event)=>setLogin(event.target.value)}></Input>
                            </th> 
                            <th><Input type="password" placeholder="hasło" value={password} onChange={(event)=>setPassword(event.target.value)}></Input></th> 
                        </tr>
                        <tr>
                            <th colSpan={2}>
                                <Button style={{width:"40%"}} onClick={()=>{sendRequest(); setMessage(<div style={{width:"100%",display:"flex",justifyContent:"center"}}><div class="loader"></div></div>)}}>zaloguj</Button>
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