// ResetPasswordPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import PasswordResetForm from './PasswordForm';
import './style.css';


const ResetPasswordPage = () => {
  const { token } = useParams();

  return (
    <div  className='frcontainer'>
      
      <PasswordResetForm token={token} />
    </div>
  );
};

export default ResetPasswordPage;
