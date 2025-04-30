import React, { useState } from 'react';
import "./Form.css";
import '@fontsource/inter'; 
import '@fontsource/inter/400.css';
/*import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';*/
//import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
 /* const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSwitchChange = () => {
    setLoading(!loading);
    if (!loading) {
      navigate("/sign-up");
    }
  };*/

  return (
    <div className="page">
      <div className='content5'>
        <div className='container_login'>
          <div className='text1'>Login</div>
          
          <div className="input-row">
            <label className="label">E-mail</label>
            <input type='text' className="input" placeholder="E-mail"/>
          </div>
          
          <div className="input-row">
            <label className="label">Password</label>
            <input type='password' className="input" placeholder="Password"/>
          </div>
          
          <button className="bt">
            Sign In
          </button>
        {/* 
          <Stack direction="row" alignItems="center" spacing={1} className="switch-container">
            <div className='text2_login'>
              You don't have an account? Click here
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
          </Stack>*/} 
        </div>
      </div>
    </div>
  );
}

export default LoginForm;