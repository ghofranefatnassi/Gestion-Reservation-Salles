import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import './contact.css';

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

const Contact = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' , height :"100%"}} bgcolor="#EFEEEE">
      <CustomTabPanel value={value} index={0}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ color: '#000B1C', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>List of employees</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              backgroundColor: "#fff", 
              width: "300px", 
              height: '45px', 
              display: 'flex', 
              alignItems: "center", 
              color: '#7C858C', 
              borderRadius: '20px', 
              padding: '0 15px',
              border: '1px solid #e0e0e0'
            }}>
              <SearchIcon />
              <input 
                type='text' 
                style={{
                  backgroundColor: "transparent", 
                  height: '100%', 
                  border: 'none', 
                  outline: 'none',
                  marginLeft: '8px',
                  flex: 1
                }} 
                placeholder='Search'
              />
            </div>
            <Button 
              variant="contained"
              sx={{
                backgroundColor: '#D9D9D9',
                color: '#000B1C',
                border: '1px solid #000B1C',
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: '500',
                padding: '8px 20px',
                '&:hover': {
                  backgroundColor: '#c9c9c9',
                },
              }}
            >
              Search
            </Button>
          </div>
        </div>

        <TableContainer component={Paper} sx={{ marginTop: '20px', padding: '20px', borderRadius: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Button 
              variant="contained"
              startIcon={<PersonAddIcon />}
              sx={{
                backgroundColor: '#D9D9D9',
                color: '#000B1C',
                border: '1px solid #000B1C',
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: '500',
                padding: '8px 20px',
                '&:hover': {
                  backgroundColor: '#c9c9c9',
                },
              }}
              onClick={()=>navigate('/Employees/Add-employee')}
            >
              Add Employee
            </Button>
          </div>

          <Table sx={{ minWidth: 650 }} size="small" aria-label="employee table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#7C858C', fontWeight: '500' }}>
                  Photo 
                </TableCell>
                <TableCell align="right" sx={{ color: '#7C858C', fontWeight: '500' }}>
                  E-amil 
                </TableCell>
                <TableCell align="right" sx={{ color: '#7C858C', fontWeight: '500' }}>
                  Role
                </TableCell>
                <TableCell align="right" sx={{ color: '#7C858C', fontWeight: '500' }}>
                  Username 
                </TableCell>
                <TableCell align="right" sx={{ color: '#7C858C', fontWeight: '500' }}>
                  Is active
                </TableCell>
                <TableCell align="right" sx={{ color: '#7C858C', fontWeight: '500' }}>
                  Is staff
                </TableCell>
                <TableCell align="right" sx={{ color: '#7C858C', fontWeight: '500' }}>
                  Last login
                </TableCell>
                <TableCell align="right" sx={{ color: '#7C858C', fontWeight: '500' }}>
                  Update
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  <Button sx={{ 
                    color: '#FFf',
                    backgroundColor:"#399918" ,
                    width:"71px",
                    height:"18px",
                    '&:hover': {
                  backgroundColor: '#25722E',
                    },
                    }}
                    onClick={()=>navigate('/Employees/Update')}>Update</Button>
                  <IconButton aria-label="delete">
                      <DeleteIcon sx={{ color: '#FF0000' }}/>
                    </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
      
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
};

export default Contact;