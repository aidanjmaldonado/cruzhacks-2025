import React, { useEffect, useRef } from 'react';
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
// import RefreshIcon from '@mui/icons-material/Refresh';
// import IconButton from '@mui/material/IconButton';

import TypingAnimation from '../Animations/model_typing';

const ChatWindow = ({
  sessionId,
  name,
  messages,
  input,
  setInput,
  handleSend,
  handleKeyPress,
  error,
  isSending,
  additionalButtons = [],
}) => {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  useEffect(() => {
    if (!isSending) {
      inputRef.current?.focus();
    }
  }, [isSending]);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography color="error">{error}</Typography>
        <Button
          variant="contained"
          onClick={() => window.location.href = '/'}
          sx={{ mt: 2 }}
        >
          Go Home
        </Button>
      </Box>
    );
  }

  return (
    sessionId && (
      <Box
      sx={{
        width: {
          xs: '90vw',  // default for extra-small screens and up
          md: '80vw',
          lg: '65vw',
          // lg: '1200px' // max width for large screens and above
        },
        height: '80vh',
        margin: 'auto',
        mt: 5,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'background.secondary',
      }}
      >
        <AppBar position="static" color="primary">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              {name ? `Chat with ${name}` : 'Hazel'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {additionalButtons.map((button, index) => (
                <Button key={index} color="inherit" onClick={button.onClick}>
                  {button.label}
                </Button>
              ))}
            </Box>
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
          }}
        >
          <List>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent:
                    message.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    maxWidth: '70%',
                    p: 1,
                    backgroundColor:
                      message.sender === 'user' ? 'background.sender' : 'background.bright',
                    color: message.sender === 'user' ? '#fffefa' : 'background.sender',
                    borderRadius: 2,
                  }}
                >
                  <ListItemText
                    primary={message.text}
                    primaryTypographyProps={{
                      color: message.sender === 'user' ? '#fffefa' : '#000000',
                    }}
                    secondary={message.timestamp}
                    secondaryTypographyProps={{
                      color: message.sender === 'user' ? '#e0e0e0' : '#757575',
                    }}
                  />
                </Paper>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
            {isSending && (
              <ListItem sx={{ justifyContent: 'flex-start' }}>
                <TypingAnimation />
              </ListItem>
            )}
          </List>
        </Box>
        <Divider />
        <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
          <TextField
            inputRef={inputRef}
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={3}
            disabled={isSending}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: 16,
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            disabled={!input.trim() || isSending}
          >
            {isSending ? 'Sending...' : 'Send'}
          </Button>
        </Box>
      </Box>
    )
  );
};

export default ChatWindow;