import React, {useState} from "react";
import './Callendar.css'
import {
    Table,
    Container
    } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Callendar = (props) =>{
    const currentDate = new Date();
    const headAmount = 7;
    const [bodyAmount, setBodyAmount] = useState(5);
    const [displayedMonth, setDisplayedMonth] = useState([currentDate.getMonth(), currentDate.getFullYear()]);

    const monthDate = new Date(displayedMonth[1], displayedMonth[0], 1);
    const firstDayOfTheMonth = monthDate.getDay() === 0? 6 : monthDate.getDay()-1;
    const currentDayOfTheMonth = currentDate.getDay() === 0? 6 : currentDate.getDay()-1;
    const currentDay = currentDate.getDate();

    const testjson = [
        ["16:00", " ", " ", "18:00", "17:30", " ", " "],
        ["16:00", " ", "16:00", " ", "17:30", " ", " "],
        ["16:00", " ", "16:00", " ", "17:30", " ", " "],
        ["16:00", " ", " ", "18:00", "17:30", " ", " "],
        ["16:00", " ", "16:00", " ", "17:30", " ", " "],

    ];
    const days = ["poniedziałe", "wtorek", "środa", "czwartek", "piątek", 'sobota', "niedziela"];
    const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"]


    const renderBody = () => {
        return Array.from({ length: bodyAmount }, (_, index) => (
            <tr key={"weekend index" + index}>
                <td style={{background:"#03a7a7"}}><h5 style={{color:"white"}}>{index+1}</h5></td>
                
                {Array.from({ length: 7 }, (_, Newindex) => {
                    let tmpJsonIndex = testjson[index][Newindex]
                    return (
                    <td style={{
                        background:tmpJsonIndex === " "? 
                        hasThisDayHappend((Newindex + 1)+7*index)? "#C7C7C7":"white" 
                        :
                        hasThisDayHappend((Newindex + 1)+7*index)? "#BF9960":"orange"
                        }} key={"days index" + index + ":" + Newindex}>
                            
                        <h5 style={{color:"black"}}>{tmpJsonIndex === " "? "": tmpJsonIndex}</h5>
                    </td>
                )})}
            </tr>
        ));
      };

    const renderHead = () =>{
        return Array.from({ length: headAmount}, (_, index) => (
            <th style={{background:"#03a7a7"}} key={"head index" + index}><h2 className="thBlue">{days[index]}</h2></th>               
        ));
    }

    const nextMonth = () => {
        displayedMonth[0] < 11?
        setDisplayedMonth(prevDisplayedMonth => [
          prevDisplayedMonth[0] + 1,
          prevDisplayedMonth[1]
        ])
        :
        setDisplayedMonth(prevDisplayedMonth => [
            prevDisplayedMonth[0] = 0,
            prevDisplayedMonth[1] + 1
          ])
      };

    const previousMonth = () => {
        displayedMonth[0] > 0?
        setDisplayedMonth(prevDisplayedMonth => [
          prevDisplayedMonth[0] - 1,
          prevDisplayedMonth[1]
        ])
        :
        setDisplayedMonth(prevDisplayedMonth => [
            prevDisplayedMonth[0] = 11,
            prevDisplayedMonth[1] - 1
          ])
      };

      const hasThisDayHappend = (day) =>{
        if ((day < currentDay && displayedMonth[0] === currentDate.getMonth()) || displayedMonth[0] < currentDate.getMonth() || displayedMonth[1] < currentDate.getFullYear()){
            return true
        }else{
            return false
        }
      }



    return(
        <div className="mainCallendar">
            <Container className="d-flex justify-content-center mt-5">
            <Table className="table">
                <thead>

                    <tr>
                        <th colSpan="2" style={{background:"#03a7a7"}} onClick={previousMonth}><h1 className="thBlue">{"<"}</h1></th>
                        <th colSpan={headAmount-3} style={{background:"#03a7a7"}}><h1 className="thBlue">{months[displayedMonth[0]]} {displayedMonth[1]}</h1></th>
                        <th colSpan="2" style={{background:"#03a7a7"}} onClick={nextMonth}><h1 className="thBlue">{">"}</h1></th>
                    </tr>
                    <tr>
                        <th style={{background:"#03a7a7"}}><h2 className="thBlue"></h2></th>
                        {renderHead()}
                    </tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </Table>
            </Container>
        </div>
    )
}

export default Callendar;