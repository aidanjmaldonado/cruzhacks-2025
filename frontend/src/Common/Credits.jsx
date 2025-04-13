import React from 'react';
import credits from '../../credits.json'; // Verify this path
import { Box, Typography, List, ListItem, ListItemText, Container } from '@mui/material';

const CreditsPage = () => {
  // Debug logs to check data
  console.log('CreditsPage rendered');
  console.log('credits:', credits);
  console.log('credits.names:', credits.names);

  // Fallback if credits.names is not an array
  const names = Array.isArray(credits.names) ? credits.names : [];

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        p: 0,
        m: 0,
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 4,
          }}
        >
          Credits
        </Typography>
        {names.length === 0 ? (
          <Typography sx={{ textAlign: 'center', color: 'red' }}>
            No credits data available. Check credits.json.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
              },
              gap: 2,
              maxWidth: '1200px',
              mx: 'auto',
            }}
          >
            {names.map((name, index) => (
              <List
                key={index}
                sx={{
                  p: 0,
                  textAlign: 'center',
                }}
              >
                <ListItem sx={{ justifyContent: 'center' }}>
                  <ListItemText primary={name} />
                </ListItem>
              </List>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CreditsPage;