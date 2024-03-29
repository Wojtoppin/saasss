import React, {useEffect, useState} from "react";
import {Input, Button} from "reactstrap"
import {
    Table,
    Container
    
    } from "react-bootstrap";
    import 'bootstrap/dist/css/bootstrap.min.css';

const TrialTraining = (props) =>{
    
    
    const [isButtonClicked,setIsButtonCliecked] = useState(false)
    const [message, setMessage] = useState("");
    


    const updateFormData = (value, name) =>{
        props.setTrainingFormData(prevData =>{
            if(name==="PostalCode"){
                value = value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.slice(0, 2) + '-' + value.slice(2);
                }
                value = value.slice(0, 6);
            }
            if(name==="Phone"){
                value = value.replace(/\D/g, '');
                if (value.length > 3) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                }
                if (value.length > 7) {
                    value = value.slice(0, 7) + '-' + value.slice(7);
                }
                value = value.slice(0, 11);

            }
            const updatedData = {...prevData, [name]:value}
            return(updatedData)
        })
    }
    
    const sendFormData = async () =>{

        console.log(Object.assign({}, ...Object.values(props.headers).map((header, index) => {
            switch (header) {
                case "Group":
                    return { [Object.keys(props.headers)[index]]: props.groupId };
                case "Year":
                    return { [Object.keys(props.headers)[index]]: props.studentYear };
                case "Size":
                    return { [Object.keys(props.headers)[index]]: props.studentSize };
                case "Agree":
                    return { [Object.keys(props.headers)[index]]: props.regulations ? 1 : 0 };
                case "OneTimer":
                    return { [Object.keys(props.headers)[index]]: props.currentFormType === "trial" ? 1 : 0 };
                default:
                    return { [Object.keys(props.headers)[index]]: props.trainingformData[header] };
            }
        })))
        
        const iscorrect =
         (props.trainingformData.Name.length!==0)&&
         (props.trainingformData.Surname.length!==0)&&
         (props.trainingformData.Phone.length > 10)&&
         (props.trainingformData.Mail.length!==0)&&
         (props.trainingformData.Adress.length!==0)&&
         (props.trainingformData.PostalCode.length > 5)&&
         (props.regulations);
        

        if(iscorrect){
            try {
                
                setMessage(<div style={{width:"100%",display:"flex",justifyContent:"center"}}><div className="loader"></div></div>)
                const response = await fetch('https://zienex.pythonanywhere.com/add_student', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(
                    Object.assign({}, ...Object.values(props.headers).map((header, index) => {
                        switch (header) {
                            case "Group":
                                return { [Object.keys(props.headers)[index]]: props.groupId };
                            case "Year":
                                return { [Object.keys(props.headers)[index]]: props.studentYear };
                            case "Size":
                                return { [Object.keys(props.headers)[index]]: props.studentSize };
                            case "Agree":
                                return { [Object.keys(props.headers)[index]]: props.regulations ? 1 : 0 };
                            case "OneTimer":
                                return { [Object.keys(props.headers)[index]]: props.currentFormType === "trial" ? 1 : 0 };
                            default:
                                return { [Object.keys(props.headers)[index]]: props.trainingformData[header] };
                        }
                    }))
                    ),
                });
                
                if (response.ok) {
                  const data = await response.json();
                  setMessage(<img src={process.env.PUBLIC_URL + '/greenDone.png'} id="acceptImage" alt="edit"/>)
                  setTimeout(()=>props.setIsTrialTrainingVisible(false),1500)
                } else {
                  console.error('Request failed with status:', response.status);
                  


                  setMessage("Chwilowo wystąpił problem z serwerem, spróbuj jeszcze raz wysłać to zgłoszenie za 5 min")
                }
    
              } catch (error) {
                console.error('Error during request:', error);
            }
        }
    }

    return(
        <Container className="d-flex justify-content-center mt-5 container1" style={{ position: 'relative', zIndex: 2, marginBottom: "10px"}}>

            <Table  style={{marginBottom:"0px"}}>
                <tbody>
                    <tr>
                        <th colSpan={3} style={{textAlign:"left"}}>
                            <h2 style={{marginLeft:"10px"}} className="notSelectable" >Zapisz się na{props.currentFormType==="trial"?" próbny trening":" trening"}</h2>
                        </th>
                        <th colSpan={1} style={{textAlign:"right"}}>
                            <Button onClick={()=> props.setIsTrialTrainingVisible(false)} style={{color:"black", background:"white", height:"100%"}}>X</Button>
                        </th>
                        </tr>
                    <tr>
                        <th colSpan={2} className="field">
                            <Input id="Imię" required autoComplete="off" type="text" style={{borderColor:(props.trainingformData.Name.length!==0 || !isButtonClicked)?"#e5e8eb":"red"}} onChange={(e)=>updateFormData(e.target.value,"Name")} value={props.trainingformData.Name}></Input>
                            <label htmlFor="Imię" title="Imię" style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                        <th colSpan={2} className="field">
                            <Input id="Nazwisko" required autoComplete="off" type="text" style={{borderColor:props.trainingformData.Surname.length!==0 || !isButtonClicked?"#e5e8eb":"red"}} onChange={(e)=>updateFormData(e.target.value,"Surname")} value={props.trainingformData.Surname}></Input>
                            <label htmlFor="Nazwisko" title="Nazwisko" style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                    </tr>

                    <tr>
                        <th colSpan={2} className="field">
                            <Input id="nrTelefonu" required autoComplete="off" type="text" style={{borderColor:props.trainingformData.Phone.length > 10 || !isButtonClicked?"#e5e8eb":"red"}}  onChange={(e)=>updateFormData(e.target.value,"Phone")} value={props.trainingformData.Phone}></Input>
                            <label htmlFor="nrTelefonu" title="Telefon rodzica" style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                        <th colSpan={2} className="field">
                            <Input id="mail" required autoComplete="off" type="text" style={{borderColor:props.trainingformData.Mail.length!==0 || !isButtonClicked?"#e5e8eb":"red"}} onChange={(e)=>updateFormData(e.target.value,"Mail")} value={props.trainingformData.Mail}></Input>
                            <label htmlFor="mail" title="Email rodzica" style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="year" className="notSelectable" title="Email rodzica" style={{display:"block", overflow:"hidden"}}>Wybierz swój rocznik</label>
                        </th>
                        <th width="40%" className="field">
                            <Input type="select" id="year" onChange={(e) => props.setStudentYear(e.target.value)} defaultValue={props.studentYear} placeholder="Rocznik">
                                <option value={"2006"}>2006</option>
                                <option value={"2007"}>2007</option>
                                <option value={"2008"}>2008</option>
                                <option value={"2009"}>2009</option>
                            </Input>
                        </th>
                        <th>
                            <label htmlFor="group" className="notSelectable" style={{ color:"#595c5f"}}>Wybierz grupę</label>
                        </th>
                        <th width="40%">
                            <Input type="select" id="group" onChange={(e) => props.setGroupId(e.target.value)} defaultValue={props.groupId} placeholder="Grupa">
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </Input>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={2} className="field">
                            <Input id="Adres" required autoComplete="off" type="text" style={{borderColor:props.trainingformData.Adress.length!==0 || !isButtonClicked?"#e5e8eb":"red"}} onChange={(e)=>updateFormData(e.target.value,"Adress")} value={props.trainingformData.Adress}></Input>
                            <label htmlFor="Adres" title="Adres"  style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                        <th colSpan={2} className="field">
                            <Input id="postalCode" required autoComplete="off" type="text" style={{borderColor:props.trainingformData.PostalCode.length > 5 || !isButtonClicked?"#e5e8eb":"red"}} onChange={(e)=>updateFormData(e.target.value,"PostalCode")} value={props.trainingformData.PostalCode}></Input>
                            <label htmlFor="postalCode" title="Kod pocztowy"  style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                    </tr>
                    <tr>
                        <th><label htmlFor="size" className="notSelectable" style={{ color:"#595c5f"}}>Wybierz rozmiar swojej koszulki</label></th>
                        <th colSpan={3}>
                            <Input type="select" id="size" onChange={(e) => props.setStudentSize(e.target.value)} placeholder="Rozmiar koszulki" defaultValue={props.studentSize}>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </Input>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={4} className="field">
                            <Input id="Uwagi" required autoComplete="off" type="text" onChange={(e)=>updateFormData(e.target.value,"Comments")} value={props.trainingformData.Comments}></Input>
                            <label htmlFor="Uwagi" title="Uwagi" style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={4}>
                            <label style={{userSelect:"none"}} htmlFor="regulations">Akceptuję <a href="">regulamin: </a></label>
                            <Input style={{marginLeft:"10px",borderColor:(props.regulations||!isButtonClicked)?"#e5e8eb":"red"}} checked={props.regulations} onChange={(e) =>props.setRegulations(e.target.checked)} type="checkbox" id="regulations"></Input>
                            </th>
                    </tr>

                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={4}>
                        {message.length === 0?<Button style={{width:"40%"}} onClick={()=>{setIsButtonCliecked(true);sendFormData()}}>Wyślij zgłoszenie na {props.currentFormType==="trial"?" próbny trening":" trening"}</Button>:message}
                        </th> 
                    </tr>
                </tfoot>

            </Table>
            
            





        </Container>
    )
}

export default TrialTraining