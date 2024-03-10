import React, {useEffect, useState} from 'react';
import './App.scss';
import Callendar from './main/Callendar';
import Header from './main/Header';
import ImagesSwiper from './main/ImagesSwiper';
import Login from './account/Login';
import AdminPanel from './AdminPanel/AdminPanel';
import TrialTraining from './account/TrialTraining';
import AttendaceList from './AdminPanel/AttendanceList';

function App() {
  
  //all
  const loader = <div style={{width:"100%",display:"flex",justifyContent:"center"}}><div className="loader"></div></div>;


  //visibility
  const [isCallendarVisible, setIsCallendarVisible] = useState(false)
  const [isLoginVisible, setIsLoginVisible] = useState(false)
  const [isUsersDataVisible, setIsUsersDataVisible] = useState(false)
  const [isTrialTrainingVisible, setIsTrialTrainingVisible] = useState(false)
  const [isAttendanceListVisible, setIsAttendanceListVisible] = useState(false)
  const [loginDisplay, setLoginDisplay] = useState("")
  
  //login variables
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [status, setStatus] = useState("")

  //trainings
  const [studentYear, setStudentYear] = useState("2006")
  const [groupId, setGroupId] = useState(1)
  const [studentSize, setStudentSize] = useState("M")
  const [regulations, setRegulations] = useState(false)
  const [trainingformData, setTrainingFormData] = useState(
    { "Name":"",
     "Surname":"",
     "Phone":"",
     "Mail":"",
     "Adress":"",
     "PostalCode":"",
     "Comments":""}
  )
  const [currentFormType,setCurrentFormType] = useState("");
  
  


  const logout = () =>{
    setIsLoginVisible(false)
    setIsLoggedIn(false)
    setLoginDisplay("")
    setStatus("")
  }


  // AdminPanel && TrialTraining
  const [headers, setHeaders] = useState([]);

  const getGroups = async () =>{
    try {
      const response = await fetch('https://zienex.pythonanywhere.com/spreadsheet_col_names');

      if (response.ok) {
        const responseData = await response.json();
        setHeaders(responseData)
      } else {
        console.error('Failed to fetch data. Status:', response.status);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  useEffect(()=>{
    getGroups();
  },[])



  return (
    <div className="App" style={{overflow:"auto", WebkitOverflowScrolling:"touch"}}>
        <Header
         isCallendarVisible={isCallendarVisible}
          setIsCallendarVisible={setIsCallendarVisible}
            isLoginVisible={isLoginVisible}
              setIsLoginVisible={setIsLoginVisible}
                isLoggedIn={isLoggedIn}
                    loginDisplay={loginDisplay}
                      logout={logout}
                        status={status}
                          isUsersDataVisible={isUsersDataVisible}
                            setIsUsersDataVisible={setIsUsersDataVisible}
                              isTrialTrainingVisible={isTrialTrainingVisible}
                                setIsTrialTrainingVisible={setIsTrialTrainingVisible}
                                  currentFormType={currentFormType}
                                    setCurrentFormType={setCurrentFormType}
                                      isAttendanceListVisible={isAttendanceListVisible}
                                        setIsAttendanceListVisible={setIsAttendanceListVisible}
          />
        <ImagesSwiper />
        {isLoginVisible && <Login
         isLoginVisible={isLoginVisible}
          setIsLoginVisible={setIsLoginVisible}
           isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
             setLoginDisplay={setLoginDisplay}
             setStatus={setStatus}
             setIsUsersDataVisible={setIsUsersDataVisible}
             />}
        


        {isTrialTrainingVisible &&
         <TrialTraining isTrialTrainingVisible={isTrialTrainingVisible}
          setIsTrialTrainingVisible={setIsTrialTrainingVisible}
          trainingformData={trainingformData}
          setTrainingFormData={setTrainingFormData}
          studentYear={studentYear}
          setStudentYear={setStudentYear}
          groupId={groupId}
          setGroupId={setGroupId}
          studentSize={studentSize}
          setStudentSize={setStudentSize}
          regulations={regulations}
          setRegulations={setRegulations}
          currentFormType={currentFormType}
          headers={headers}
          
          
          
          />
          }


        {isCallendarVisible && <Callendar/>}
        {status === "admin" && isUsersDataVisible && <AdminPanel headers={headers} loader={loader}/>}
        {status === "admin" && isAttendanceListVisible && <AttendaceList loader={loader}/>}
        

        

    </div>
  );
}

export default App;
