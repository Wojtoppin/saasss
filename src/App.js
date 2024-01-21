import React, {useState} from 'react';
import './App.css';
import Callendar from './main/Callendar';
import Header from './main/Header';
import ImagesSwiper from './main/ImagesSwiper';

function App() {
  const [isCallendarVisible, setIsCallendarVisible] = useState(false)
  return (
    <div className="App" style={{overflow:"auto", WebkitOverflowScrolling:"touch"}}>
        <Header  isCallendarVisible={isCallendarVisible} setIsCallendarVisible={setIsCallendarVisible}/>
        <ImagesSwiper />
        {isCallendarVisible && <Callendar/>}
    </div>
  );
}

export default App;
