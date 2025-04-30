import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SanteTNS from './Page1/SanteTNS';
import SanteParticulier from './Page1/SanteParticulier';
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
          <Box sx={{mt:1}}>
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
const Page1 = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' ,backgroundColor:"#f2f2f2"}} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Sante TNS" {...a11yProps(0)} />
                    <Tab label="Sante Particulier" {...a11yProps(1)} />
                    <Tab label="Prevoyance TNS" {...a11yProps(2)} />
                    <Tab label="Sante Expa...." {...a11yProps(3)} />
                    <Tab label="Sante Collective" {...a11yProps(4)} />
                    <Tab label="Prevoyance Collective" {...a11yProps(5)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
            <SanteTNS/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            <SanteParticulier/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
            
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
            </CustomTabPanel>
        </Box>
  )
}

export default Page1
