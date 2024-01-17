import './App.css';
import Callendar from './main/Callendar';
import Header from './main/Header';

function App() {
  return (
    <div className="App" style={{overflow:"auto", WebkitOverflowScrolling:"touch"}}>
        <Header/>
        <Callendar/>
    </div>
  );
}

export default App;
