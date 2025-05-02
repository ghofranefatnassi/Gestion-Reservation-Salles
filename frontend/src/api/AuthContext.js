// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await api.get('profile/');
          setUser(response.data);
        } catch (err) {
          console.error('Failed to load user', err);
          logout();
        }
      }
      setLoading(false);
    };
    
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('login/', { email, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      const userResponse = await api.get('profile/');
      setUser(userResponse.data);
      return true; // Success
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);