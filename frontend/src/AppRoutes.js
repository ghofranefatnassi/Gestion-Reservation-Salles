// src/AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contacts from './pages/Contacts';
import Tableau from './pages/Tableau';
import Layout from './components/Layout/Layout';
import RendezVous from './components/RendezVous/RendezVous';
import UpdateEmployee from './components/Contrat/UpdateEmployee';
import AddEmployee from './components/Contrat/AddEmployee';
import ProtectedRoute from './api/ProtectedRoute';
import RoomsPage from './pages/room';

function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        
        {/* Protected routes wrapped with Layout */}
        <Route element={<Layout />}>
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Tableau />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employees" 
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employees/update" 
            element={
              <ProtectedRoute>
                <UpdateEmployee />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employees/add-employee" 
            element={
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bookings" 
            element={
              <ProtectedRoute>
                <RendezVous />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rooms" 
            element={
              <ProtectedRoute>
                <RoomsPage/>
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default AppRoutes;