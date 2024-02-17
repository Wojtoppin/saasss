import React, {useState} from 'react';
import './App.css';
import Callendar from './main/Callendar';
import Header from './main/Header';
import ImagesSwiper from './main/ImagesSwiper';
import Login from './account/Login';
import AdminPanel from './AdminPanel/AdminPanel';
import TrialTraining from './account/TrialTraining';

function App() {
  const [isCallendarVisible, setIsCallendarVisible] = useState(false)
  const [isLoginVisible, setIsLoginVisible] = useState(false)
  const [isUsersDataVisible, setIsUsersDataVisible] = useState(false)
  const [isTrialTrainingVisible, setIsTrialTrainingVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginDisplay, setLoginDisplay] = useState("")
  const [status, setStatus] = useState("")

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
             
        {isTrialTrainingVisible && <TrialTraining isTrialTrainingVisible={isTrialTrainingVisible} setIsTrialTrainingVisible={setIsTrialTrainingVisible}/>}
        {isCallendarVisible && <Callendar/>}
        {status === "admin" && isUsersDataVisible && <AdminPanel/>}
        

        

    </div>
  );
}

export default App;
