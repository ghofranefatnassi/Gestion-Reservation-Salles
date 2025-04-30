import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './RendezVous.css'
import Teams from './Teams';
import SurPlace from './SurPlace';
import GoogleMeet from './GoogleMeet';
import AppelTel from './AppelTel';
import Skipe from './Skipe';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const RendezVous = () => {

   
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
<div className='RMain'>
    <Box sx={{ width: '100%' }} bgcolor="#F2F2F2">
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Teams" {...a11yProps(0)} />
            <Tab label="Rendez-vous sur place" {...a11yProps(1)} />
            <Tab label="Google meet" {...a11yProps(2)} />
            <Tab label="Apple téléphoniques" {...a11yProps(3)} />
            <Tab label="Skipe" {...a11yProps(4)} />
        </Tabs>
    </Box>
    <CustomTabPanel value={value} index={0}>
    <div className='tit'>
    Teams
    </div>
    <Teams/>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
    <div className='tit'>
    Rendez-vous sur place
    </div>
        <SurPlace/>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={2}>
    <div className='tit'>
    Google meet
    </div>
    <GoogleMeet/>
</CustomTabPanel>
<CustomTabPanel value={value} index={3}>
<div className='tit'>
Apple téléphoniques
</div>
<AppelTel/>
</CustomTabPanel>
<CustomTabPanel value={value} index={4}>
<div className='tit'>
Skipe
</div>
<Skipe/>
</CustomTabPanel>
</Box>
</div>
  )
}

export default RendezVous
