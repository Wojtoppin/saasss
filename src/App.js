import './App.css';
import Callendar from './main/Callendar';
import Header from './main/Header';
import ImagesSwiper from './main/ImagesSwiper';

function App() {
  return (
    <div className="App" style={{overflow:"auto", WebkitOverflowScrolling:"touch"}}>
        {/* <ImagesSwiper/> */}
        {/* <Header/> */}
        <Callendar/>
    </div>
  );
}

export default App;
