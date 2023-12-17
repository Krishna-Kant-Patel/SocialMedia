import React, {useState} from 'react';
import { postdata } from '../Apis/Apicall';
import './regs.css'

function Regs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
        
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
        postdata(formData);
        // console.log('Submitted Form Data:', formData);
        setFormData({
          name: '',
          email: '',
          password: ''
        })
      };

  return (
    <>
       <div className='formContainer' >
      <h2 className='formHeading'>User Registration</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="inputBox">
        
        <input
          type="text"
          id="username"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="UserName"
        />
        </div>
        <div className="inputBox">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Enter E-mail"
        />
        </div>
        <div className="inputBox">
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          placeholder="Enter Password"
        />
        </div>
        

        

        

        <button type="submit" class="button-89" role="button">Register</button>
      </form>
    </div>
    </>
  )
}

export default Regs;
