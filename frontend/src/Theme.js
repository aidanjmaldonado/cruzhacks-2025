import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#233a46', // Prussian Blue
      contrastText: '#fffefa', // Beige for readable contrast
    },
    secondary: {
      main: '#6a7887', // Old Rose
      contrastText: '#000807', // Black for contrast
    },
    tertiary: {
      main: '#93C48B', // Pistachio
      contrastText: '#000807', // Black for contrast
    },
    background: {
      sender: '#7fa376',
      bright: '#fffefa',
      secondary:'#fdf9e9',
      default: '#f1e5ca', // Beige
    },
    text: {
      primary: '#000807', // Black for main text
      secondary: '#1C3144', // Prussian Blue for secondary text
      disabled: '#93C48B', // Pistachio for disabled text
      hint: '#B98389', // Old Rose for hints
    },
    divider: '#1C3144', // Pistachio for dividers
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#000807', // Black for h1
    },
    // Optional: Define other typography variants
    body1: {
      color: '#000807', // Black for body text
    },
    body2: {
      color: '#1C3144', // Prussian Blue for secondary body text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;