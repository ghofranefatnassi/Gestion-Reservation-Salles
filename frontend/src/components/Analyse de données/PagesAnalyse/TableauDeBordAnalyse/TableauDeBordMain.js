import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import AnalyseActivites from './AnalyseActivites';
import AnalyseCommissions from './AnalyseCommissions';
import AnalyseContact from './AnalyseContact';
import AnalyseContrats from './AnalyseContrats';
import AnalyseProjets from './AnalyseProjets';
const CustomTab = styled(Tab)(({ theme, selected }) => ({
    color: '#7C858C',
    fontWeight: 'bold',
    ...(selected && {
      backgroundColor: 'white',      
    }),
    textAlign:"left",
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

const TableauDeBordMain = () => {
    const [value, setValue] = React.useState(0);
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
      <CustomTab label="Analyde Contacts" {...a11yProps(0)} />
      <CustomTab label="Analyse Projets" {...a11yProps(1)} />
      <CustomTab label="Analyse Contrats" {...a11yProps(2)} />
      <CustomTab label="Analyse Activités" {...a11yProps(3)}/>
      <CustomTab label="Analyse Commissions" {...a11yProps(4)} />
    </Tabs>
    <TabPanel value={value} index={0}>
    <AnalyseContact/>
    </TabPanel>

    <TabPanel value={value} index={1}>
    <AnalyseProjets/>
    </TabPanel>

    <TabPanel value={value} index={2}>
    <AnalyseContrats/>
    </TabPanel>

    <TabPanel value={value} index={3}>
    <AnalyseActivites/>
    </TabPanel>

    <TabPanel value={value} index={4}>
    <AnalyseCommissions/>
    </TabPanel>
  </Box>
  )
}

export default TableauDeBordMain
