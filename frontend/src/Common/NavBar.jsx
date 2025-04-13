import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext';

const AppHeader = () => {
  const { activePage, setActivePage } = useContext(AppContext);
  const navigate = useNavigate();

  const navButton = (label, page, route) => (
    <Button
      color="inherit"
      onClick={() => {
        setActivePage(page);
        navigate(route);
      }}
      sx={{
        borderBottom: activePage === page ? '2px solid white' : 'none',
        borderRadius: 0,
      }}
    >
      {label}
    </Button>
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Rallie - UCSC
        </Typography>
        {navButton('Home', 'home', '/')}
        {navButton('Interview', 'chat', '/chat')}
        {navButton('Credits', 'credits', '/credits')}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
