import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/auth/',
});
export const createUser = async (userData) => {
    try {
      const response = await api.post('users/', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to create user' };
    }
  };
  
  export const updateUser = async (id, userData) => {
    try {
      const response = await api.put(`users/${id}/`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to update user' };
    }
  };
  
  export const deleteUser = async (id) => {
    try {
      await api.delete(`users/${id}/`);
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to delete user' };
    }
  };
  

  export const fetchUsers = async () => {
    try {
      const response = await api.get('users/');
      // Ensure we always return an array
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch users' };
    }
  };
  
  export const fetchUserById = async (id) => {
    try {
      const response = await api.get(`users/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch employee' };
    }
  };
// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 error and we haven't already tried to refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
          refresh: refreshToken
        });
        
        localStorage.setItem('access_token', response.data.access);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh failed - log user out
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location = '/';
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;