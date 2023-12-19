// src/components/ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      await axios.post('http://localhost:8000/api/forgot-password', { email });
      setMessage('Password reset email sent. Please check your inbox.');
      
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='fcontainer'>
      <h2>Forgot Password</h2>
      <div className='fBox'>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button className='button-89' onClick={handleForgotPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
