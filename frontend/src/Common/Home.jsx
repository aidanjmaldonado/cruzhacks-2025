import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Paper } from '@mui/material';
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
        mt: 8,
        px: 3,
        textAlign: 'center',
        position: 'relative',
        minHeight: '80vh',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Share Your UCSC Story with Hazel
      </Typography>
      
      <Box sx={{ mb: 5 }}>
        <Typography variant="body1" color="textSecondary" paragraph sx={{ mb: 3 }}>
          Hazel is our automated interviewer here at Rallie.tech. She specializes in gathering 
          stories about navigating bureaucratic systems at UCSC. When you chat with Hazel, she'll ask open-ended questions to help understand your unique 
          perspective. Your stories help Rallie build our knowledgebase, and offer support to other students from real experiences 
        </Typography>
        
      </Box>

      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0,
        mb: 4,
        px: 3
      }}>
        {/* Disclaimer */}
        <Box sx={{ mb: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Note: Knowledge and stories shared here will be shared publically
          </Typography>
        </Box>
        
        {/* Error message */}
        {error && (
          <Typography color="error" sx={{ mb: 3 }}>
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
          sx={{ py: 1.5, px: 4 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Start Interview'}
        </Button>
      </Box>
    </Box>
  );
};

export default Home;