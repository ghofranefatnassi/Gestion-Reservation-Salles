import React, { useState } from 'react';
import "./FormSignup.css"; // Make sure this path is correct
import logo from "../../images/logo.png";
import '@fontsource/inter'; 
import '@fontsource/inter/400.css';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import Login from '../../images/login.png'
const SignupForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSwitchChange = () => {
        setLoading(!loading);
        if (!loading) {
          navigate ("/")
        }
      };
  
    return (
        <div className="page">
        <div className="content_signup">
          <div className="left-section">
            <img src={logo} alt="Logo" className="logo" />
            <img src={Login} alt="Login Illustration" className="illustration" />
          </div>
          <div className="container">
            <div className="text1">Signup</div>
            <Stack direction="row" alignItems="center" spacing={1}>
              <div className="text2">
                You have an account  ? click here
                <FormControlLabel
                  control={
                    <Switch
                      checked={loading}
                      onChange={handleSwitchChange}
                      name="loading"
                      color="primary"
                      size="small"
                    />
                  }
                  style={{ marginLeft: '3px' }}
                />
              </div>
            </Stack>
            <label style={{marginTop:10}} className="label">Nom d'utilisateur</label>
            <div className="input-container" >
              <input type="text" className="input" placeholder="E-mail"  />
            </div>
            <label className="label">E-mail</label>
            <div className="input-container">
              <input type="email" className="input" placeholder="E-mail" />
            </div>
            <label className="label">Mot de passe</label>
            <div className="input-container">
              <input type="password" className="input" placeholder="********" />
            </div>
            <label className="label">Confirme mot de passe</label>
            <div className="input-container">
              <input type="password" className="input" placeholder="********" />
            </div>
            <button className="bt">S'inscrire</button>
          </div>
        </div>
      </div>
    );
}

export default SignupForm
