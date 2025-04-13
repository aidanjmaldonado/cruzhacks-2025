import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './Contexts/AppContext';
import ChatWindow from './Common/ChatWindow';
import * as api from './chatService';
import {AppBar} from '@mui/material';
import AppHeader from './Common/NavBar';

const StandardChat = () => {
  const { messages, setMessages, name, setName, session_ID } = useContext(AppContext);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session_ID) {
      console.log("StandardChat mounted on refresh");
      navigate(`/chat/`);
    }
  }, [session_ID, navigate]);

  const submitAnswer = async (answer) => {
    const lastQuestion = messages.findLast((msg) => msg.sender === 'bot')?.text || '';
    try {
      setMessages((prev) => [
        ...prev,
        {
          text: answer,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const res = await api.submitAnswer(lastQuestion, answer, session_ID);

      setMessages((prev) => [
        ...prev,
        {
          text: res.next_question || 'No more questions',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      setName(res.name);
    } catch (error) {
      console.error('Failed to submit answer:', error);
      setError('Failed to submit answer. Please try again.');
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    setError(null);
    setIsSending(true);

    try {
      await submitAnswer(input);
      setInput('');
    } catch (error) {
      console.error('Failed to submit answer:', error);
      setError('Failed to submit answer. Please try again.');
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

  const handleClearLocal = () => {
    localStorage.clear();
    navigate(`/chat/`);
  };

  return (
    <React.Fragment>
      <AppHeader />
      <ChatWindow
        sessionId={session_ID}
        name={name}
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        handleKeyPress={handleKeyPress}
        error={error}
        isSending={isSending}
        additionalButtons={[
          {
            label: 'change user',
            onClick: handleClearLocal,
          },
        ]}
      />      
    </React.Fragment>
  );
};

export default StandardChat;