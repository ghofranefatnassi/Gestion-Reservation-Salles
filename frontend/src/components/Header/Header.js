import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MoreIcon from '@mui/icons-material/MoreVert';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import "./Header.css";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button 
          variant="outlined" 
          sx={{
            borderColor: '#626262',
            color: '#000B1C',
            '&:hover': {
              borderColor: '#626262',
              backgroundColor: 'rgba(98, 98, 98, 0.04)'
            }
          }}
          endIcon={<ArrowCircleRightRoundedIcon className='icon-header'/>}
        >
          Logout
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#D9D9D9' }}>
        <Toolbar className='header'>
          <Box sx={{ 
            position: 'absolute', 
            left: 0, 
            right: 0, 
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <div className='DT'>Dashboard Admin</div>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}> 
            <Button 
              variant="outlined"
              sx={{
                borderColor: '#626262',
                color: '#000B1C',
                '&:hover': {
                  borderColor: '#626262',
                  backgroundColor: 'rgba(98, 98, 98, 0.04)'
                }
              }}
              endIcon={<ArrowCircleRightRoundedIcon className='icon-header'/>}
            >
              Logout
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;