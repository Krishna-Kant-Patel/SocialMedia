import { useState, useEffect, useContext } from "react";
import React from 'react';
import './login.css'
import { getdata } from "../Apis/Apicall";
import { useNavigate, Link } from 'react-router-dom';
import { MyContext } from "../contextApi/customApi";


function Login() {
  const {setUserdata} = useContext(MyContext);
    const navigate = useNavigate();
    const [userdata, setData] = useState();
    const [location, setlocation] = useState('/home');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });

    useEffect(()=>{
        getdata(setData);
    },[])

      const handleSubmit = (e) => {
        e.preventDefault();
        const valid = userdata.filter((item)=>item.name===formData.username && item.password===formData.password)
      
    
    setUserdata(valid);
    if(valid.length>0){
      alert("succesful")
      navigate('/home')
    }
    else{
      alert("fail to login");
    }

        
        // console.log(userdata);
      };
    
      // Function to handle changes in form fields
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
  return (
    <>
     <div className='formContainer' >
      <h2 className='formHeading'>Log in</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="inputBox">
        
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="UserName"
        />
        </div>
        
        <div className="inputBox">
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter Password"
        />
        </div>
        

        

        <Link to='/forget' className="forgotpass">Forget Password?</Link>

        <button type="submit" to={`${location}`} class="button-89" role="button">Login</button>
      </form>
    </div>
    </>
  )
}

export default Login;
