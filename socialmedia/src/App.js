import axios from "axios";
import './App.css';
import Navbar from "./components/NavBar/NavBar";
import Regs from "./components/Regs/Regs";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { Routes, Route } from 'react-router-dom';


function App() {
  
  return (
    
    <>
    <Navbar/>
    <Routes>
    
    <Route path="/signup" element={<Regs/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/home" element={<Home/>} />
      
    </Routes>
      
    </>
  );
}

export default App;
