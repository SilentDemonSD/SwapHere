import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    const res = await axios.post('/api/auth/google', {
      googleId: response.credential,
      name: response.name,
      email: response.email,
      photo: response.picture,
    });
    localStorage.setItem('token', res.data.token);
    navigate('/profile');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('Login Failed')} />
    </GoogleOAuthProvider>
  );
};

export default Auth;
