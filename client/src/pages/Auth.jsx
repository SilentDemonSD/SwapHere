import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserContext } from '../App'; // Assuming you use context

const Auth = () => {
  const { setUser } = useContext(UserContext);

  const handleSuccess = async (response) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
        token: response.credential,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user); // Update global state
    } catch (error) {
      console.error('Login failed:', error);
    }
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const res = await axios.post(`${apiUrl}/api/auth/google`, {
      googleId: response.credential,
      name: response.name,
      email: response.email,
      photo: response.picture,
    });
    localStorage.setItem('token', res.data.token);
    navigate('/profile');
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={(error) => console.log(error)} />
    </div>
  );
};

export default Auth;
