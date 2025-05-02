import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Corrected import

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backendUrl = 'http://localhost:8000'; // change if needed

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/auth/login/`, {
        email,
        password,
      });

      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);

      const userData = jwtDecode(res.data.access);
      alert(`Welcome back, ${userData.email}`);
    } catch (err) {
      console.error(err.response?.data);
      alert('Invalid email or password.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/google/`, {
        access_token: credentialResponse.credential,
      });

      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);

      const userData = jwtDecode(res.data.access);
      alert(`Welcome ${userData.email}!`);
    } catch (error) {
      console.error(error.response?.data);
      alert('Google login failed.');
    }
  };

  const handleGoogleError = () => {
    alert('Google login was unsuccessful.');
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 10 }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: 8 }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: 8 }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: 10 }}>
            Login
          </button>
        </form>

        <hr style={{ margin: '20px 0' }} />
        <div style={{ textAlign: 'center' }}>
          <p>Or login with Google</p>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
