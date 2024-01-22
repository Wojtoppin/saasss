import React, {useState, useEffect} from "react";
import './Callendar.css'
import {Input} from "reactstrap"
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
    const [element, setElement] = useState(850);
    const [currentGroup, setCurrentGroup] = useState("1");
    

    const monthDate = new Date(displayedMonth[1], displayedMonth[0], 1);
    const firstDayOfTheMonth = monthDate.getDay() === 0? 6 : monthDate.getDay()-1;
    // const currentDayOfTheMonth = currentDate.getDay() === 0? 6 : currentDate.getDay()-1;
    const currentDay = currentDate.getDate();

    const test1json = [
        ["16:00", " ", " ", "18:00", "17:30", " ", " "],
        ["16:00", " ", "16:00", " ", "17:30", " ", " "],
        ["16:00", " ", "16:00", " ", "17:30", " ", " "],
        ["16:00", " ", " ", "18:00", "17:30", " ", " "],
        ["16:00", " ", "16:00", " ", "17:30", " ", " "],
    ];
    const test2json = [
        [" ", "16:00", " ", "16:00", "15:30", " ", " "],
        [" ", "16:00", " ", "18:00", "15:30", " ", " "],
        [" ", "16:00", "18:00", " ", "15:30", " ", " "],
        [" ", "16:00", "18:00", " ", "15:30", " ", " "],
        [" ", "16:00", " ", "18:00", "15:30", " ", " "],
    ];
    const test3json = [
        ["17:30", "17:30", " ", "18:30", " ", " ", " "],
        ["17:30", "17:30", " ", "18:30", " ", " ", " "],
        ["17:30", "17:30", " ", "18:30", " ", " ", " "],
        ["17:30", "17:30", " ", "18:30", " ", " ", " "],
        ["17:30", "17:30", " ", "18:30", " ", " ", " "],
    ];

    const days = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", 'sobota', "niedziela"];
    const shortDays = ["pon", "wt", "śr", "czw", "pt", 'sb', "nd"];
    const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"]
    const daysInMonths = [31,displayedMonth[1] % 4 === 0?29:28,31,30,31,30,31,31,30,31,30,31]
    

    const renderBody = () => {
        return Array.from({ length: bodyAmount }, (_, index) => (
            <tr key={"weekend index" + index}>
                <td style={{background:"#03a7a7"}}><h5 style={{color:"white"}} className="notSelectable">{index+1}</h5></td>
                
                {Array.from({ length: 7 }, (_, Newindex) => {

                    let tmpJsonIndex;

                    if (currentGroup === "1") {
                    tmpJsonIndex = test1json[index][Newindex];
                    } else if (currentGroup === "2") {
                    tmpJsonIndex = test2json[index][Newindex];
                    } else if (currentGroup === "3") {
                    tmpJsonIndex = test3json[index][Newindex];
                    }
                    
                    let currentDayNumerical = (Newindex)+7*index;
                    let hasHappened = hasThisDayHappend((Newindex + 1)+7*index);
                    let isNotInCurrentMonth = currentDayNumerical < firstDayOfTheMonth || currentDayNumerical > firstDayOfTheMonth + daysInMonths[displayedMonth[0]] -1;

                    return (
                    <td style={{
                        background:
                        tmpJsonIndex === " " || tmpJsonIndex === ""? 
                            hasHappened? 
                                isNotInCurrentMonth?"#03a7a7":"#C7C7C7"
                                :
                                isNotInCurrentMonth?"#03a7a7":"white" 
                            :
                            hasHappened? 
                                isNotInCurrentMonth?"#03a7a7":"#BF9960"
                                :
                                isNotInCurrentMonth?"#03a7a7":"orange"


                        }} key={"days index" + index + ":" + Newindex}>
                        {element >= 850? 
                        <h5>
                            {tmpJsonIndex === " " || isNotInCurrentMonth? "": tmpJsonIndex}
                        </h5>
                        :
                        <h6>
                            {tmpJsonIndex === " " || isNotInCurrentMonth? "": tmpJsonIndex}
                        </h6>}

                    </td>
                )})}
            </tr>
        ));
      };

    const renderHead = () =>{
        return Array.from({ length: headAmount}, (_, index) => (
            <th style={{background:"#03a7a7"}} key={"head index" + index}>
                <h3 className="thBlue">{element >= 850? days[index]:shortDays[index]}</h3>
            </th>               
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
        if ((day < currentDay && displayedMonth[0] === currentDate.getMonth() && displayedMonth[1] === currentDate.getFullYear()) || displayedMonth[0] < currentDate.getMonth() || displayedMonth[1] < currentDate.getFullYear()){
            return true
        }else{
            return false
        }
    }

    const checkContainerWidth = () =>{
        let containerWidth = document.getElementById("responsive").clientWidth;
        setElement(containerWidth);
    }

    useEffect(()=>{
        checkContainerWidth();
    },[element])

    return(
            <Container
             className="d-flex justify-content-center mt-2" id="responsive"
              onClick={checkContainerWidth}
               onLoad={checkContainerWidth}
                 style={{ position: 'relative', zIndex: 2, top:element >= 850?"15%": "10%"}}>
                <Table className="borderedTable" bordered>
                    <thead>
                        
                        <tr>
                            <th colSpan="2" style={{background:"#03a7a7", userSelect:"none"}} onClick={previousMonth}><h2 className="thBlue">{"<"}</h2></th>
                            <th colSpan={headAmount-3} style={{background:"#03a7a7"}}><h2 className="thBlue">{months[displayedMonth[0]]} {displayedMonth[1]}</h2></th>
                            <th colSpan="2" style={{background:"#03a7a7", userSelect:"none"}} onClick={nextMonth}><h2 className="thBlue">{">"}</h2></th>
                        </tr>
                        <tr>
                            <th style={{background:"#03a7a7"}}><h3 className="thBlue notSelectable">#</h3></th>
                            {renderHead()}
                        </tr>
                    </thead>
                    <tbody>
                        {renderBody()}
                        <tr>
                            <th colSpan={headAmount+1} style={{background:"#03a7a7", userSelect:"none"}}>
                            <Input type="select" onChange={(e) => {setCurrentGroup(e.target.value); console.log(e.target.value);}}>
                                <option value={1}>podstawowa</option>
                                <option value={2}>średnio zaawansowana</option>
                                <option value={3}>zaawansowana</option>
                            </Input>
                            </th>
                        </tr>
                    </tbody>

                </Table>
            </Container>
    )
}

export default Callendar;