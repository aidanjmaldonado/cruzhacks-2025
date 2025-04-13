// src/Common/Credits.jsx
import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import names from "../credits.json";

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
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: "bold", mb: 4 }}>
        Credits
      </Typography>
      <Grid container spacing={3}>
        {columns.map((column, colIndex) => (
          <Grid size={{xs:12, sm:4}} key={colIndex}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {column.map((name, index) => (
                <Typography
                  key={`${colIndex}-${index}`}
                  variant="body1"
                  sx={{ fontSize: "1.125rem", color: "text.primary" }}
                >
                  {name}
                </Typography>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}