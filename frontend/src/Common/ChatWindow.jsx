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
  IconButton,
  Tooltip,
} from '@mui/material';
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
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button
          variant="contained"
          onClick={() => (window.location.href = '/')}
          sx={{ mt: 2, px: 4 }}
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
          width: { xs: '95vw', sm: '85vw', md: '75vw', lg: '60vw' },
          maxWidth: '900px',
          height: { xs: '85vh', sm: '80vh' },
          margin: 'auto',
          mt: { xs: 3, sm: 5 },
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #e0e0e0',
          borderRadius: 3,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          bgcolor: 'background.secondary',
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        >
          <Toolbar sx={{ minHeight: 56, px: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 500, flexGrow: 1 }}>
              {name ? `Chat with ${name}` : 'Hazel'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {additionalButtons.map((button, index) =>
                button.icon ? (
                  <Tooltip key={index} title={button.tooltip || ''}>
                    <IconButton
                      color="inherit"
                      onClick={button.onClick}
                      sx={{
                        color: '#fffefa',
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      {button.icon}
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Button
                    key={index}
                    color="inherit"
                    onClick={button.onClick}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                      color: '#fffefa',
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {button.label}
                  </Button>
                )
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: { xs: 2, sm: 3 },
          }}
        >
          <List disablePadding>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                disableGutters
                sx={{
                  mb: 1,
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  sx={{
                    maxWidth: { xs: '80%', sm: '70%' },
                    p: { xs: 1.5, sm: 2 },
                    bgcolor:
                      message.sender === 'user' ? 'background.sender' : 'background.bright',
                    borderRadius: 3,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <ListItemText
                    primary={message.text}
                    primaryTypographyProps={{
                      variant: 'body1',
                      color: message.sender === 'user' ? '#fffefa' : '#000000',
                    }}
                    secondary={message.timestamp}
                    secondaryTypographyProps={{
                      variant: 'caption',
                      color: message.sender === 'user' ? '#e0e0e0' : '#757575',
                    }}
                  />
                </Paper>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
            {isSending && (
              <ListItem disableGutters sx={{ justifyContent: 'flex-start' }}>
                <TypingAnimation />
              </ListItem>
            )}
          </List>
        </Box>

        <Divider sx={{ bgcolor: '#e0e0e0' }} />

        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            display: 'flex',
            gap: 1.5,
            alignItems: 'flex-end',
          }}
        >
          <TextField
            inputRef={inputRef}
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            disabled={isSending}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#e0e0e0',
                },
              },
              '& .MuiInputBase-input': {
                fontSize: '0.95rem',
                py: 1.5,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={!input.trim() || isSending}
            sx={{
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
              py: 1.2,
              textTransform: 'none',
              fontWeight: 500,
              minWidth: '80px',
            }}
          >
            {isSending ? 'Sending...' : 'Send'}
          </Button>
        </Box>
      </Box>
    )
  );
};

export default ChatWindow;