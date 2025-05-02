import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId='742170507889-v03ub5pg2fqvn6qh85h3471elcqb80h6.apps.googleusercontent.com'>
      <BrowserRouter> {/* Enveloppez les routes avec BrowserRouter */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
