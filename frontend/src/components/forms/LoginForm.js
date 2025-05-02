import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './Form.css';
import '@fontsource/inter';
import '@fontsource/inter/400.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const success = await login(email, password);
      if (success) {
        console.log('✅ Received token:', success.token); // 👈 Add this line
        localStorage.setItem('access_token', success.token); // or 'token' if you prefer
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="page">
      <div className="content5">
        <div className="container_login">
          <div className="text1">Login</div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <label className="label">E-mail</label>
              <input
                type="email"
                className="input"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-row">
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="bt">
              Sign In
            </button>
          </form>

          <div className="text2_login">
            Don't have an account?{' '}
            <span
              style={{ color: '#4e73df', cursor: 'pointer' }}
              onClick={() => navigate('/signup')}
            >
              Sign up here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
