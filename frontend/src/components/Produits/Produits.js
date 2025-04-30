import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Page1 from './Page produit/Page1';
const CustomTab = styled(Tab)(({ theme, selected }) => ({
  color: '#7C858C',
  fontWeight: 'bold',
  ...(selected && {
    backgroundColor: 'white',      
  }),
  fontSize:'12.5px'
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{padding:0,margin:0}}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const Produits = () => {
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
return (
  <Box
  sx={{ flexGrow: 1, bgcolor: '#F2F2F2', display: 'flex', height: '100%' }}
>
  <Tabs
    orientation="vertical"
    value={value}
    onChange={handleChange}
    aria-label="Vertical tabs example"
    sx={{ borderRight: 1, borderColor: 'divider' ,width:170}}
  >
  <p style={{color:'#101720',fontSize:"13px",fontWeight:"bold"}}>Produits</p>
    <CustomTab label="Affaire nouvelles" {...a11yProps(1)} />
    <CustomTab label="Evolution du stock" {...a11yProps(2)} />
    <CustomTab label="X presilation" {...a11yProps(3)} />
    <CustomTab label="Analyse par compagnie" {...a11yProps(4)}/>
    <p style={{color:'#101720',fontSize:"13px",fontWeight:"bold"}}>Projets</p>
    <CustomTab label="Analyse global" {...a11yProps(5)} />
    <CustomTab label="X" {...a11yProps(6)} />
    <CustomTab label="Compagnie" {...a11yProps(7)} />
    <CustomTab label="Type de risque" {...a11yProps(8)}/>
  </Tabs>
  
  <TabPanel value={value} index={1}>
  <Page1/>
  </TabPanel>

  <TabPanel value={value} index={2}>
  </TabPanel>

  <TabPanel value={value} index={3}>
  </TabPanel>

  <TabPanel value={value} index={4}>
  </TabPanel>

  <TabPanel value={value} index={5}>
  </TabPanel>
</Box>
)
}

export default Produits
