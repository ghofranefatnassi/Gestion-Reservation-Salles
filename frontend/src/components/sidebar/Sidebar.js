import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import Header from '../Header/Header';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupIcon from '@mui/icons-material/Group';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css";
import { Button } from '@mui/material';

const drawerWidth = 280;

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const menuItems = [
    { 
      text: "DASHBOARD", 
      icon: selectedIndex === 0 ? <DashboardIcon /> : <DashboardOutlinedIcon />, 
      link: '/Dashboard' 
    },
    { text: "EMPLOYEES",
      icon: selectedIndex === 1 ? <GroupIcon /> : <GroupOutlinedIcon />, 
      link: '/Employees'
    },
    { text: "ROOMS", 
      icon: selectedIndex === 2 ? <HomeWorkIcon /> : <HomeWorkOutlinedIcon />, 
      link: '/Rooms'
    },
    { text: "BOOKINGS",
      icon: selectedIndex === 3 ? <EventAvailableIcon /> : <EventAvailableOutlinedIcon />,  
      link: '/Bookings' 
    },
    { text: "VISITORS",  
      icon: selectedIndex === 4 ? <SupervisedUserCircleIcon /> : <SupervisedUserCircleOutlinedIcon />, 
      link: '/Bookings'
    },
  ];

  const drawer = (
    <div className="sidebar-container">
      <Toolbar sx={{ bgcolor: '#000B1C', minHeight: '64px !important' }} />
      <List className="sidebar-list">
        {menuItems.map((item, index) => (
          <ListItemButton
            key={item.text}
            component={item.link ? Link : 'div'}
            to={item.link}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
            className={`sidebar-item ${selectedIndex === index ? 'selected' : ''}`}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#00CCCB',
                '& .MuiListItemIcon-root': {
                  color: '#000B1C',
                },
                '& .MuiTypography-root': {
                  color: '#000B1C',
                },
                '&:hover': {
                  backgroundColor: '#00CCCB',
                },
              },
            }}
          >
            <ListItemIcon className="sidebar-icon">
              {React.cloneElement(item.icon, {
                className: selectedIndex === index ? 'selected-icon' : '',
                sx: {
                  color: selectedIndex === index ? '#000B1C' : '#00CCCB'
                }
              })}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              className={`sidebar-text ${selectedIndex === index ? 'selected-text' : ''}`}
              sx={{
                color: selectedIndex === index ? '#000B1C' : '#00CCCB',
                marginLeft: selectedIndex === index ? '10px' : '0px',
                transition: 'margin-left 0.3s ease',
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        marginTop: 'auto'
      }}>
        <Button
          variant="contained"
          startIcon={<SettingsIcon />}
          sx={{
            backgroundColor: '#D9D9D9',
            color: '#000B1C',
            fontWeight: 'bold',
            width: '220px',
            height: '45px',
            borderRadius: '50px',
            '&:hover': {
              backgroundColor: '#c9c9c9',
            }
          }}
        >
          Settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Header />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            height: '100vh',
            position: 'fixed',
            overflow: 'hidden',
            backgroundColor: '#000B1C',
            display: 'flex',
            flexDirection: 'column'
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;