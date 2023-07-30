import './App.css';
import { Login } from './components/Login_pg';
import { Home } from './components/Home';
import { Profpic } from './components/Profpic';
import { Play } from './components/Play';
import { Reg } from './components/Reg';
import { Create } from './components/Create';
import {Logo} from './components/logo';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
  <div >
    
    
    


    <Router>
      
      <Routes>
      <Route path="/" element={<Reg />} />
        <Route path="/register" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/play" element={<Play />} />
        <Route path="/propic" element={<Profpic />} />
        
      </Routes>

     
    </Router>
   
    </div>
  );
}

export default App;
