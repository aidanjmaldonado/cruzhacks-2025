import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import * as api from '../chatService';
import { AppContext } from '../Contexts/AppContext';
import AppHeader from './NavBar';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setName, setSession_ID, setMessages, setActivePage } = useContext(AppContext);

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
        setActivePage('chat');
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
    <React.Fragment>
      <AppHeader />
      <Box
        sx={{
          width: { xs: '95vw', sm: '85vw', md: '75vw', lg: '60vw' },
          maxWidth: '900px',
          margin: 'auto',
          mt: { xs: 3, sm: 5 },
          p: { xs: 2, sm: 3 },
          textAlign: 'center',
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          // border: '1px solid #e0e0e0',
          borderRadius: 3,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          bgcolor: 'background.secondary',
        }}
      >
        <Box>
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: 500, mb: 3, color: '#000000' }}
          >
            Share Your UCSC Story with Hazel
          </Typography>
          <Typography
            variant="body1"
            color="secondary"
            sx={{ mb: 1, fontSize: '0.95rem', color: '#757575' }}
          >
            Hazel is our automated interviewer here at Rallie.tech. She specializes in gathering
            stories about navigating bureaucratic systems at UCSC. When you chat with Hazel, she'll
            ask open-ended questions to help understand your unique perspective. Your stories help
            Rallie build our knowledgebase, and offer support to other students from real experiences.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          {/* Disclaimer */}
          <Box
            sx={{
              mb: 3,
              p: { xs: 1.5, sm: 2 },
              bgcolor: 'background.bright',
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: '#757575', fontSize: '0.85rem' }}
            >
              Note: Knowledge and stories shared here will be shared publicly
            </Typography>
          </Box>

          {/* Error message */}
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mb: 3, fontSize: '0.9rem' }}
            >
              {error}
            </Typography>
          )}

          {/* Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStartInterview}
            disabled={loading}
            sx={{
              borderRadius: 2,
              px: { xs: 3, sm: 4 },
              py: 1.2,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              color: '#fffefa',
              minWidth: '160px',
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Start Sharing'}
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Home;