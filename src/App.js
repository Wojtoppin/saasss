import React, {useState} from 'react';
import './App.css';
import Callendar from './main/Callendar';
import Header from './main/Header';
import ImagesSwiper from './main/ImagesSwiper';
import Login from './account/Login';

function App() {
  const [isCallendarVisible, setIsCallendarVisible] = useState(false)
  const [isLoginVisible, setIsLoginVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginDisplay, setLoginDisplay] = useState("")
  return (
    <div className="App" style={{overflow:"auto", WebkitOverflowScrolling:"touch"}}>
        <Header
         isCallendarVisible={isCallendarVisible}
          setIsCallendarVisible={setIsCallendarVisible}
            isLoginVisible={isLoginVisible}
              setIsLoginVisible={setIsLoginVisible}
                isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                    loginDisplay={loginDisplay}
                      setLoginDisplay={setLoginDisplay}
          />

        <ImagesSwiper />
        {isLoginVisible && <Login isLoginVisible={isLoginVisible} setIsLoginVisible={setIsLoginVisible} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoginDisplay={setLoginDisplay}/>}
        {isCallendarVisible && <Callendar/>}
    </div>
  );
}

export default App;
