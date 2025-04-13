import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatWindow from './Common/ChatWindow';
import AppHeader from './Common/NavBar';
import * as api from './chatService';
const LocalChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  // const [name] = useState('Local Bot');
  const sessionId = 'local-session-123'; // Mock session ID
  const navigate = useNavigate();
  const submitAnswer = async (answer) => {
    const userMessage = {
      text: answer,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  
    // Combine current messages with the new one
    const updatedMessages = [...messages, userMessage];
  
    // Optimistically update UI
    setMessages(updatedMessages);
  
    // Call API with the full updated message list
    const res = await api.submitAnswerPrompt(updatedMessages);
    console.log(res);
  
    // Add the bot's response
    const botMessage = {
      text: res.answer,
      sender: 'hazel',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  
    setMessages((prev) => [...prev, botMessage]);
  };
  
  useEffect(() => {
    setMessages([
      {
        text: 'Hello! What can I help you with today?',
        sender: 'Hazel',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    setError(null);
    setIsSending(true);

    try {
      await submitAnswer(input);
      setInput('');
    } catch (error) {
      console.error('Failed to process answer:', error);
      setError('Failed to process answer. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetMessages = () => {
    setMessages([
      {
        text: 'Hello! What can I help you with today?',
        sender: 'Hazel',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
    setInput('');
    setError(null);
  };

  return (
    <React.Fragment>
      <AppHeader />
      <ChatWindow
        sessionId={sessionId}
        name={''}
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        handleKeyPress={handleKeyPress}
        error={error}
        isSending={isSending}
        additionalButtons={[
          {
            label: 'Reset Messages',
            onClick: handleResetMessages,
          },
        ]}
      />

    </React.Fragment>
  );
};

export default LocalChat;