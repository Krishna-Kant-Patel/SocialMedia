// PasswordResetForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const PasswordResetForm = ({ token }) => {
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      await axios.post(`http://localhost:8000/api/reset-password/${token}`, { newPassword });
      alert('Password reset successful');
      // Redirect or display success message as needed
    } catch (error) {
      alert("Something wrong happen")
      setNewPassword('')
      console.error('Error resetting password:', error.response.data.message);
      // Handle error and display appropriate message to the user
    }
  };

  return (
    <>
      <h2>Reset Password</h2>
      <div className='fBox'>
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <button className='button-89' onClick={handleResetPassword}>Reset Password</button>
    </>
  );
};

export default PasswordResetForm;
