import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Navbar = () => (
  <AppBar position="static" sx={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '10px 20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'}}>
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6">SwapHere</Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
