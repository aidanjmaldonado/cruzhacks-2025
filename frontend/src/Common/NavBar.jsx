import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const AppHeader = () => {
  const { activePage, setActivePage } = useContext(AppContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Switch to icons below 'md'

  const navButton = (label, page, route, Icon) => (
    <>
      {isSmallScreen ? (
        <IconButton
          color="inherit"
          onClick={() => {
            setActivePage(page);
            navigate(route);
          }}
          sx={{
            color: '#fffefa',
            borderBottom: activePage === page ? '2px solid #fffefa' : 'none',
            borderRadius: 1,
            p: 1,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <Icon />
        </IconButton>
      ) : (
        <Button
          color="inherit"
          onClick={() => {
            setActivePage(page);
            navigate(route);
          }}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.95rem',
            px: { xs: 1.5, sm: 2 },
            py: 0.5,
            borderRadius: 1,
            color: '#fffefa',
            borderBottom: activePage === page ? '2px solid #fffefa' : 'none',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {label}
        </Button>
      )}
    </>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        borderBottom: '1px solid #e0e0e0',
        bgcolor: 'primary.main',
      }}
    >
      <Toolbar
        sx={{
          minHeight: 56,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 500,
            color: '#fffefa',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          Rallie - UCSC
        </Typography>
        <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 } }}>
          {navButton('Home', 'home', '/', HomeIcon)}
          {navButton('Interview', 'chat', '/chat', ChatIcon)}
          {navButton('Credits', 'credits', '/credits', InfoIcon)}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;