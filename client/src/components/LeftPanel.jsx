import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Dashboard, Person, Settings, Info, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LeftPanel = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 2, background: 'rgba(255, 255, 255, 0.05)', height: '100vh' }}>
      <IconButton onClick={() => navigate('/dashboard')}>
        <Dashboard sx={{ color: '#fff' }} />
      </IconButton>
      <IconButton onClick={() => navigate('/profile')}>
        <Person sx={{ color: '#fff' }} />
      </IconButton>
      <IconButton onClick={() => navigate('/settings')}>
        <Settings sx={{ color: '#fff' }} />
      </IconButton>
      <IconButton onClick={() => navigate('/about')}>
        <Info sx={{ color: '#fff' }} />
      </IconButton>
      <IconButton onClick={() => navigate('/')}>
        <Home sx={{ color: '#fff' }} />
      </IconButton>
    </Box>
  );
};

export default LeftPanel;
