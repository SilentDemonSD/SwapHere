// client/src/pages/Auth.jsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import

const Auth = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSuccess = async (response) => {
    try {
      const decoded = jwtDecode(response.credential); // Use named export
      const res = await axios.post(`${apiUrl}/api/auth/google`, {
        googleId: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        photo: decoded.picture,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="container">
        <div className="card">
          <h2>Sign In</h2>
          <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('Login Failed')} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;