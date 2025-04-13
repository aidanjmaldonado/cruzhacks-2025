// src/components/AppHeader.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Rallie - UCSC
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        <Button color="inherit" onClick={() => navigate('/chat')}>Interview</Button>
        <Button color="inherit" onClick={() => navigate('/credits')}>Credits</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
