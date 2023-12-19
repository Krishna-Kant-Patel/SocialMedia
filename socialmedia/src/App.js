import {useState } from 'react';
import './App.css';
import Navbar from "./components/NavBar/NavBar";
import Regs from "./components/Regs/Regs";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from "./components/ForgetPass/ForgetPass";
import ResetPasswordPage from "./components/ForgetPass/ResetPassword";
import { MyContext } from './components/contextApi/customApi';


function App() {
  const [userdata, setUserdata] = useState();
  const [postImage, setPostImage] = useState();
  const [imagedata, setImage] = useState();
   
  return (
    
    <>
    <MyContext.Provider value={{userdata, setUserdata,
    postImage, setPostImage,
    imagedata, setImage
    }}>
    <Navbar/>
    
    <Routes>
    <Route path="/home" element={<Home/>} />
    <Route path="/signup" element={<Regs/>} />
    <Route path="" element={<Login/>} />
    
    <Route path="/forget" element={<ForgotPassword/>} />
    <Route path="/reset-password/:token" element={<ResetPasswordPage/>} />
      
    </Routes>
    </MyContext.Provider>
    </>
  );
}

export default App;
