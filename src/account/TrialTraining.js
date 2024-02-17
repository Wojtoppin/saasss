import React, {useEffect, useState} from "react";
import {Input, Button} from "reactstrap"
import {
    Table,
    Container
    
    } from "react-bootstrap";
    import 'bootstrap/dist/css/bootstrap.min.css';

const TrialTraining = (props) =>{
    
    const [studentYear, setStudentYear] = useState("2006")
    const [groupId, setGroupId] = useState("A")
    const [studentSize, setStudentSize] = useState("M")
    const [regulations, setRegulations] = useState(false)
    const [isButtonClicked,setIsButtonCliecked] = useState(false)

    const [formData, setFormData] = useState(
            { "studentName":"",
             "studentSurname":"",
             "parentNumber":"",
             "parentMail":"",
             "studentAdress":"",
             "postalCode":"",
             "comments":""
        }
    )


    const updateFormData = (value, name) =>{
        setFormData(prevData =>{
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
    




    const isFormCorrect = () =>{
        return(
            ((formData.studentName!==0)
            &&(formData.studentSurname.length!==0)
            &&(formData.parentNumber.length===11)
            &&(formData.parentMail.length!==0)
            &&(formData.studentAdress.length!==0)
            &&(formData.postalCode.length===6)
            &&(regulations===true))?true:false
            )
    }
    useEffect(()=>{
        // console.log({...formData, "regulations":regulations, "studentYear":studentYear,"studentSize":studentSize,"groupId":groupId})
        // isFormCorrect();
    }, [formData,regulations, studentSize, groupId, studentYear])


    return(
        <Container className="d-flex justify-content-center mt-5 container1" style={{ position: 'relative', zIndex: 2, marginBottom: "10px"}}>

            <Table  style={{marginBottom:"0px"}}>
                <tbody>
                    <tr>
                        <th colSpan={4} style={{textAlign:"right"}}>
                            <Button onClick={()=> props.setIsTrialTrainingVisible(false)} style={{color:"black", background:"white"}}>X</Button>
                        </th>
                        </tr>
                    <tr>
                        
                        <th colSpan={2}><Input type="text" style={{borderColor:(formData.studentName.length!==0 || !isButtonClicked)?"#e5e8eb":"red"}} placeholder="Imię" onChange={(e)=>updateFormData(e.target.value,"studentName")} value={formData.studentName}></Input></th>
                        <th colSpan={2}><Input type="text" style={{borderColor:formData.studentSurname.length!==0 || !isButtonClicked?"#e5e8eb":"red"}}  placeholder="Nazwisko" onChange={(e)=>updateFormData(e.target.value,"studentSurname")} value={formData.studentSurname}></Input></th>
                    </tr>
                    <tr>
                        
                        <th colSpan={2}><Input type="text" style={{borderColor:formData.parentNumber.length > 10 || !isButtonClicked?"#e5e8eb":"red"}}  placeholder="Telefon rodzica" onChange={(e)=>updateFormData(e.target.value,"parentNumber")} value={formData.parentNumber}></Input></th>
                        <th colSpan={2}><Input type="text" style={{borderColor:formData.parentMail.length!==0 || !isButtonClicked?"#e5e8eb":"red"}}  placeholder="Email rodzica" onChange={(e)=>updateFormData(e.target.value,"parentMail")} value={formData.parentMail}></Input></th>

                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="year" style={{ color:"#595c5f"}}>Wybierz swój rocznik</label>
                        </th>

                        <th width="40%">
                            <Input type="select" id="year" onChange={(e) => setStudentYear(e.target.value)} defaultValue={"2006"} placeholder="Rocznik">
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
                            <Input type="select" id="group" onChange={(e) => setGroupId(e.target.value)} defaultValue={"A"} placeholder="Grupa">
                                <option value={"A"}>A</option>
                                <option value={"B"}>B</option>
                                <option value={"C"}>C</option>
                                <option value={"D"}>D</option>
                            </Input>
                        </th>

                    </tr>
                    <tr>
                        <th colSpan={2}><Input type="text" style={{borderColor:formData.studentAdress.length!==0 || !isButtonClicked?"#e5e8eb":"red"}}  placeholder="Adres" onChange={(e)=>updateFormData(e.target.value,"studentAdress")} value={formData.studentAdress}></Input></th>
                        <th colSpan={2}><Input type="text" style={{borderColor:formData.postalCode.length > 5 || !isButtonClicked?"#e5e8eb":"red"}}  placeholder="Kod pocztowy" onChange={(e)=>updateFormData(e.target.value,"postalCode")} value={formData.postalCode}></Input></th>
                    </tr>
                    <tr>
                        <th><label htmlFor="size" style={{ color:"#595c5f"}}>Wybierz rozmiar swojej koszulki</label></th>
                        <th colSpan={3}>
                            <Input type="select" id="size" onChange={(e) => setStudentSize(e.target.value)} placeholder="Rozmiar koszulki" defaultValue={"M"}>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </Input>
                        </th>
                    </tr>
                    <tr>
                        
                        <th colSpan={4}>
                            <Input type="text" placeholder="Uwagi" onChange={(e)=>updateFormData(e.target.value,"comments")} value={formData.comments}></Input></th>
                    </tr>
                    <tr>
                        <th colSpan={4}>
                            <label style={{userSelect:"none"}} htmlFor="regulations">Akceptuję <a href="">regulamin: </a></label>
                            <Input style={{marginLeft:"10px",borderColor:(regulations||!isButtonClicked)?"#e5e8eb":"red"}} onChange={(e) =>setRegulations(e.target.checked)} type="checkbox" id="regulations"></Input>
                            </th>
                    </tr>

                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={4}>
                            <Button style={{width:"40%"}} onClick={()=>{setIsButtonCliecked(true)}}>Wyślij zgłoszenie na próbny trening</Button>
                        </th> 
                    </tr>
                </tfoot>

            </Table>





        </Container>
    )
}

export default TrialTraining