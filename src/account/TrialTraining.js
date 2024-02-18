import React, {useEffect, useState} from "react";
import {Input, Button} from "reactstrap"
import {
    Table,
    Container
    
    } from "react-bootstrap";
    import 'bootstrap/dist/css/bootstrap.min.css';

const TrialTraining = (props) =>{
    
    
    const [isButtonClicked,setIsButtonCliecked] = useState(false)

    


    const updateFormData = (value, name) =>{
        props.setTrainingFormData(prevData =>{
            if(name==="postalCode"){
                value = value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.slice(0, 2) + '-' + value.slice(2);
                }
                value = value.slice(0, 6);
            }
            if(name==="parentNumber"){
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
    
    // const isFormCorrect = () =>{
    //     return(
    //         ((props.trainingformData.studentName!==0)
    //         &&(props.trainingformData.studentSurname.length!==0)
    //         &&(props.trainingformData.parentNumber.length===11)
    //         &&(props.trainingformData.parentMail.length!==0)
    //         &&(props.trainingformData.studentAdress.length!==0)
    //         &&(props.trainingformData.postalCode.length===6)
    //         &&(regulations===true))?true:false
    //         )
    // }
    // useEffect(()=>{
    //     // console.log({...props.trainingformData, "regulations":regulations, "studentYear":studentYear,"studentSize":studentSize,"groupId":groupId})
    //     // isFormCorrect();
    // }, [props.trainingformData,regulations, studentSize, props.groupId, props.studentYear])


    return(
        <Container className="d-flex justify-content-center mt-5 container1" style={{ position: 'relative', zIndex: 2, marginBottom: "10px"}}>

            <Table  style={{marginBottom:"0px"}}>
                <tbody>
                    <tr>
                        <th colSpan={3} style={{textAlign:"left"}}>
                            <h2 style={{marginLeft:"10px"}}>Zapisz się na{props.currentFormType==="trial"?" próbny trening":" trening"}</h2>
                        </th>
                        <th colSpan={1} style={{textAlign:"right"}}>
                            <Button onClick={()=> props.setIsTrialTrainingVisible(false)} style={{color:"black", background:"white", height:"100%"}}>X</Button>
                        </th>
                        </tr>
                    <tr>
                        <th colSpan={2} className="field">
                            <Input id="Imię" required autocomplete="off" type="text" style={{borderColor:(props.trainingformData.studentName.length!==0 || !isButtonClicked)?"#e5e8eb":"red"}} onChange={(e)=>updateFormData(e.target.value,"studentName")} value={props.trainingformData.studentName}></Input>
                            <label htmlFor="Imię" title="Imię" style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                        <th colSpan={2} className="field">
                            <Input id="Nazwisko" required autocomplete="off" type="text" style={{borderColor:props.trainingformData.studentSurname.length!==0 || !isButtonClicked?"#e5e8eb":"red"}} onChange={(e)=>updateFormData(e.target.value,"studentSurname")} value={props.trainingformData.studentSurname}></Input>
                            <label htmlFor="Nazwisko" title="Nazwisko" style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                    </tr>

                    <tr>
                        <th colSpan={2} className="field">
                            <Input id="nrTelefonu" required autocomplete="off" type="text" style={{borderColor:props.trainingformData.parentNumber.length > 10 || !isButtonClicked?"#e5e8eb":"red"}}  onChange={(e)=>updateFormData(e.target.value,"parentNumber")} value={props.trainingformData.parentNumber}></Input>
                            <label htmlFor="nrTelefonu" title="Telefon rodzica" style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                        <th colSpan={2} className="field">
                            <Input id="mail" required autocomplete="off" type="text" style={{borderColor:props.trainingformData.parentMail.length!==0 || !isButtonClicked?"#e5e8eb":"red"}} onChange={(e)=>updateFormData(e.target.value,"parentMail")} value={props.trainingformData.parentMail}></Input>
                            <label htmlFor="mail" title="Email rodzica" style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="year" title="Email rodzica" style={{display:"block", overflow:"hidden"}}>Wybierz swój rocznik</label>
                        </th>
                        <th width="40%" className="field">
                            <Input type="select" id="year" onChange={(e) => props.setStudentYear(e.target.value)} defaultValue={"2006"} placeholder="Rocznik">
                                <option value={"2006"}>2006</option>
                                <option value={"2007"}>2007</option>
                                <option value={"2008"}>2008</option>
                                <option value={"2009"}>2009</option>
                            </Input>
                        </th>
                        <th>
                            <label htmlFor="group" style={{ color:"#595c5f"}}>Wybierz grupę</label>
                        </th>
                        <th width="40%">
                            <Input type="select" id="group" onChange={(e) => props.setGroupId(e.target.value)} defaultValue={"A"} placeholder="Grupa">
                                <option value={"A"}>A</option>
                                <option value={"B"}>B</option>
                                <option value={"C"}>C</option>
                                <option value={"D"}>D</option>
                            </Input>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={2} className="field">
                            <Input id="Adres" required autocomplete="off" type="text" style={{borderColor:props.trainingformData.studentAdress.length!==0 || !isButtonClicked?"#e5e8eb":"red"}} onChange={(e)=>updateFormData(e.target.value,"studentAdress")} value={props.trainingformData.studentAdress}></Input>
                            <label htmlFor="Adres" title="Adres"  style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                        <th colSpan={2} className="field">
                            <Input id="postalCode" required autocomplete="off" type="text" style={{borderColor:props.trainingformData.postalCode.length > 5 || !isButtonClicked?"#e5e8eb":"red"}} onChange={(e)=>updateFormData(e.target.value,"postalCode")} value={props.trainingformData.postalCode}></Input>
                            <label htmlFor="postalCode" title="Kod pocztowy"  style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                    </tr>
                    {props.currentFormType==="normal" && <tr>
                        <th><label htmlFor="size" style={{ color:"#595c5f"}}>Wybierz rozmiar swojej koszulki</label></th>
                        <th colSpan={3}>
                            <Input type="select" id="size" onChange={(e) => props.setStudentSize(e.target.value)} placeholder="Rozmiar koszulki" defaultValue={"M"}>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </Input>
                        </th>
                    </tr>}
                    <tr>
                        <th colSpan={4} className="field">
                            <Input id="Uwagi" required autocomplete="off" type="text" onChange={(e)=>updateFormData(e.target.value,"comments")} value={props.trainingformData.comments}></Input>
                            <label htmlFor="Uwagi" title="Uwagi" style={{display:"block", overflow:"hidden"}}></label>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={4}>
                            <label style={{userSelect:"none"}} htmlFor="regulations">Akceptuję <a href="">regulamin: </a></label>
                            <Input style={{marginLeft:"10px",borderColor:(props.regulations||!isButtonClicked)?"#e5e8eb":"red"}} onChange={(e) =>props.setRegulations(e.target.checked)} type="checkbox" id="regulations"></Input>
                            </th>
                    </tr>

                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={4}>
                            <Button style={{width:"40%"}} onClick={()=>{setIsButtonCliecked(true)}}>Wyślij zgłoszenie na {props.currentFormType==="trial"?" próbny trening":" trening"}</Button>
                        </th> 
                    </tr>
                </tfoot>

            </Table>





        </Container>
    )
}

export default TrialTraining