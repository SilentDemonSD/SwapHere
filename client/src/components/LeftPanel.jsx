import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Dashboard, Person, Settings, Info, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LeftPanel = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'rgba(18, 18, 18, 0.9)',
        backdropFilter: 'blur(10px)',
        height: '100vh',
        width: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        paddingTop: '20px',
        boxShadow: 3, // M3 elevation
      }}
    >
      <Tooltip title="Dashboard" placement="right">
        <IconButton
          onClick={() => navigate('/dashboard')}
          sx={{
            color: '#cb6ce6',
            '&:hover': { background: 'rgba(203, 108, 230, 0.2)', color: '#fff' },
            transition: 'all 0.3s ease',
          }}
        >
          <Dashboard />
        </IconButton>
      </Tooltip>
      <Tooltip title="Profile" placement="right">
        <IconButton
          onClick={() => navigate('/profile')}
          sx={{
            color: '#cb6ce6',
            '&:hover': { background: 'rgba(203, 108, 230, 0.2)', color: '#fff' },
            transition: 'all 0.3s ease',
          }}
        >
          <Person />
        </IconButton>
      </Tooltip>
      <Tooltip title="Settings" placement="right">
        <IconButton
          onClick={() => navigate('/settings')}
          sx={{
            color: '#cb6ce6',
            '&:hover': { background: 'rgba(203, 108, 230, 0.2)', color: '#fff' },
            transition: 'all 0.3s ease',
          }}
        >
          <Settings />
        </IconButton>
      </Tooltip>
      <Tooltip title="About" placement="right">
        <IconButton
          onClick={() => navigate('/about')}
          sx={{
            color: '#cb6ce6',
            '&:hover': { background: 'rgba(203, 108, 230, 0.2)', color: '#fff' },
            transition: 'all 0.3s ease',
          }}
        >
          <Info />
        </IconButton>
      </Tooltip>
      <Tooltip title="Home" placement="right">
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            color: '#cb6ce6',
            '&:hover': { background: 'rgba(203, 108, 230, 0.2)', color: '#fff' },
            transition: 'all 0.3s ease',
          }}
        >
          <Home />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default LeftPanel;
