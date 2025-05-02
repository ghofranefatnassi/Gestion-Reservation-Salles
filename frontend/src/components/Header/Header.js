import * as React from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MoreIcon from '@mui/icons-material/MoreVert';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import "./Header.css";

const Header = () => {
  // State management
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  // Hooks
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Menu control
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Logout handler
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
      setLogoutDialogOpen(false);
    }
  };

  // Menu handlers
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);

  // Menu IDs
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  // Menu components
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => setLogoutDialogOpen(true)}>
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
      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout from your account?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)} disabled={isLoggingOut}>
            Cancel
          </Button>
          <Button 
            onClick={handleLogout} 
            color="primary"
            disabled={isLoggingOut}
            startIcon={isLoggingOut ? <CircularProgress size={20} /> : null}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* App Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#D9D9D9' }}>
        <Toolbar className='header'>
          {/* Centered Title */}
          <Box sx={{ 
            position: 'absolute', 
            left: 0, 
            right: 0, 
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <div className='DT'>Dashboard Admin</div>
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Logout Button */}
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
              onClick={() => setLogoutDialogOpen(true)}
            >
              Logout
            </Button>
          </Box>

          {/* Mobile Menu Button */}
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

      {/* Render Menus */}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;