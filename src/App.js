import React, {useState} from 'react';
import './App.scss';
import Callendar from './main/Callendar';
import Header from './main/Header';
import ImagesSwiper from './main/ImagesSwiper';
import Login from './account/Login';
import AdminPanel from './AdminPanel/AdminPanel';
import TrialTraining from './account/TrialTraining';

function App() {
  
  //visibility
  const [isCallendarVisible, setIsCallendarVisible] = useState(false)
  const [isLoginVisible, setIsLoginVisible] = useState(false)
  const [isUsersDataVisible, setIsUsersDataVisible] = useState(false)
  const [isTrialTrainingVisible, setIsTrialTrainingVisible] = useState(false)
  const [loginDisplay, setLoginDisplay] = useState("")
  
  //login variables
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [status, setStatus] = useState("")

  //trainings
  const [studentYear, setStudentYear] = useState("2006")
  const [groupId, setGroupId] = useState("A")
  const [studentSize, setStudentSize] = useState("M")
  const [regulations, setRegulations] = useState(false)
  const [trainingformData, setTrainingFormData] = useState(
    { "studentName":"",
     "studentSurname":"",
     "parentNumber":"",
     "parentMail":"",
     "studentAdress":"",
     "postalCode":"",
     "comments":""}
  )
  const [currentFormType,setCurrentFormType] = useState("");



  const logout = () =>{
    setIsLoginVisible(false)
    setIsLoggedIn(false)
    setLoginDisplay("")
    setStatus("")
  }


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
          
          
          
          
          />
          }


        {isCallendarVisible && <Callendar/>}
        {status === "admin" && isUsersDataVisible && <AdminPanel/>}
        

        

    </div>
  );
}

export default App;
