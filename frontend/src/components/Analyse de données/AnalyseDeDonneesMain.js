import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableauDeBordMain from './PagesAnalyse/TableauDeBordAnalyse/TableauDeBordMain';
import ContratsMain from './PagesAnalyse/ContratsAnalyse/ContratsMain';
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
const AnalyseDeDonneesMain = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' ,backgroundColor:"#f2f2f2"}} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Tableau de bord" {...a11yProps(0)} />
                    <Tab label="Contacts" {...a11yProps(1)} />
                    <Tab label="Projets" {...a11yProps(2)} />
                    <Tab label="Contrats" {...a11yProps(3)} />
                    <Tab label="Commissions" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
            <TableauDeBordMain/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
            <ContratsMain/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
            </CustomTabPanel>
        </Box>
    )
}

export default AnalyseDeDonneesMain
