import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../Contexts/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Divider,
} from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
import * as api from '../chatService';

const ChatWindow = () => {
  const {messages, setMessages, name, setName, session_ID, setSession_ID} = useContext(AppContext);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       // Optionally re-fetch session data if needed
  //       const res = await api.startInterview();
  //       if (res.session_ID !== session_ID) {
  //         throw new Error('Session ID mismatch');
  //       }
  //       setStudentName(res.userId);
  //       setMessages([
  //         {
  //           text: res.initialQuestion,
  //           sender: 'bot',
  //           timestamp: new Date().toLocaleTimeString(),
  //         },
  //       ]);
  //     } catch (error) {
  //       console.error('Failed to initialize chat:', error);
  //       setError('Failed to initialize chat. Please try again.');
  //       navigate('/error'); // Redirect on failure
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (session_ID) {
  //     init();
  //   } else {
  //     setError('No session ID provided.');
  //     setLoading(false);
  //     navigate('/error');
  //   }
  // }, [session_ID, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const submitAnswer = async (answer) => {
    const lastQuestion = messages.findLast((msg) => msg.sender === 'bot')?.text || '';
    try {
      const res = await api.submitAnswer(lastQuestion, answer, session_ID);
      setMessages((prev) => [
        ...prev,
        {
          text: answer,
          sender: 'student',
          timestamp: new Date().toLocaleTimeString(),
        },
        {
          text: res.next_question || 'No more questions',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setName(res.name);
    } catch (error) {
      console.error('Failed to submit answer:', error);
      setError('Failed to submit answer. Please try again.');
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setError(null);
    await submitAnswer(input);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };



  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography color="error">{error}</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Go Home
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        height: 500,
        margin: 'auto',
        mt: 5,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">
            Chat with {name || ''} (Session: {session_ID.slice(0, 8)})
          </Typography>
        </Toolbar>
      </AppBar>
      {error && (
        <Typography color="error" sx={{ p: 2 }}>
          {error}
        </Typography>
      )}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent:
                  message.sender === 'student' ? 'flex-end' : 'flex-start',
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  maxWidth: '70%',
                  p: 1,
                  backgroundColor:
                    message.sender === 'student' ? '#1976d2' : '#ffffff',
                  color: message.sender === 'student' ? '#ffffff' : '#000000',
                  borderRadius: 2,
                }}
              >
                <ListItemText
                  primary={message.text}
                  secondary={message.timestamp}
                  secondaryTypographyProps={{
                    color: message.sender === 'student' ? '#e0e0e0' : '#757575',
                  }}
                />
              </Paper>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={3}
        />
        <Button
          variant="contained"
          color="primary"
          // endIcon={<SendIcon />}
          onClick={handleSend}
          disabled={!input.trim()}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;