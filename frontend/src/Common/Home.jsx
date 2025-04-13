import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import * as api from '../chatService';
import { AppContext } from '../Contexts/AppContext';
// import loadingAnimation from '../Animations/loading';
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setName, setSession_ID, setMessages } = useContext(AppContext);

  const handleStartInterview = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.startInterview();
      if (res.session_ID) {
        localStorage.setItem('name', res.name);
        setMessages([
          {
            text: res.initial_question,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
        setName(res.name);
        setSession_ID(res.session_ID);
        navigate(`/chat/${res.session_ID}`);
      } else {
        throw new Error('No session ID returned');
      }
    } catch (err) {
      console.error('Failed to start interview:', err);
      setError('Failed to start the interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        mt: 5,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the Interview Platform
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Click the button below to start your interview session.
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleStartInterview}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Start Interview'}
      </Button>
    </Box>
  );
};

export default Home;