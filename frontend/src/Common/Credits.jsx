// src/Common/Credits.jsx
import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import names from "../credits.json";
import AppHeader from '../Common/NavBar';
const nameList = names.names;

export default function Credits() {
  // Split names into three roughly equal columns
  const columnCount = 3;
  const namesPerColumn = Math.ceil(nameList.length / columnCount);
  const columns = [
    nameList.slice(0, namesPerColumn),
    nameList.slice(namesPerColumn, 2 * namesPerColumn),
    nameList.slice(2 * namesPerColumn),
  ];

  return (
    <React.Fragment>
      <AppHeader />
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // bgcolor: 'background.secondary',
          px: 2,
        }}
      >
        <Container
          sx={{
            py: 4,
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            bgcolor: 'background.secondary', // Optional: contrast with the outer bg
            textAlign: 'center',

          }}
        >
          <Typography
            variant="h4"
            component="h1"
            // gutterBottom
            sx={{ fontWeight: 'bold', mb: 1 }}
            color='primary'
          >
            Credits
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: '1.125rem',mb: 4 }}
            color="secondary"
          >
            Thank you for participating
          </Typography>
          <Grid container spacing={10} justifyContent="center">
            {columns.map((column, colIndex) => (
              <Grid sx = {{xs:12, sm:4}} key={colIndex}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {column.map((name, index) => (
                    <Typography
                      color="text.primary"
                      key={`${colIndex}-${index}`}
                      variant="body1"
                      sx={{ fontSize: '1.125rem', color: 'text.primary' }}
                    >
                      {name}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};  