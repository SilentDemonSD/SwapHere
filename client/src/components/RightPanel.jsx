import React from 'react';
import { Box } from '@mui/material';
import Auth from '../pages/Auth';

const RightPanel = () => (
  <Box sx={{ p: 2, background: 'rgba(255, 255, 255, 0.05)', height: '100vh' }}>
    <Auth />
  </Box>
);

export default RightPanel;
