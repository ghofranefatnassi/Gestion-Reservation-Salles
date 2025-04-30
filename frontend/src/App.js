import {Route, Routes ,BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contacts from './pages/Contacts';
//import Projet from './pages/Projet';
import Tableau from './pages/Tableau';
import Layout from './components/Layout/Layout';
import RendezVous from './components/RendezVous/RendezVous';
import Produit from './pages/Produit';
import  UpdateEmployee  from './components/Contrat/UpdateEmployee';
import AddEmployee from './components/Contrat/AddEmployee';
function App() {
  return (
    <>
  <Router>
        <Routes>
          <Route path='/'  element={<Login/>} />
          <Route path='/Sign-up'  element={<Signup/>} />  
          <Route element={<Layout/>}>
          <Route path='/Dashboard'  element={<Tableau/>} />   
          <Route path='/Employees'  element={<Contacts/>} />
          <Route path='/Employees/Update'  element={<UpdateEmployee/>} />
          <Route path='/Employees/Add-employee'  element={<AddEmployee/>} />
          <Route path='/Bookings'  element={<RendezVous/>} />
          <Route path='/Rooms'  element={<Produit/>} />
          </Route>
        </Routes>
  </Router>
    </>
  );
}

export default App;
