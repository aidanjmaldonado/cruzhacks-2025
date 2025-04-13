import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatWindow from './Common/ChatWindow';
import AppHeader from './Common/NavBar';
const LocalChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  // const [name] = useState('Local Bot');
  const sessionId = 'local-session-123'; // Mock session ID
  const navigate = useNavigate();

  const submitAnswer = async (answer) => {
    try {
      setMessages((prev) => [
        ...prev,
        {
          text: answer,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Mock bot response
      // call with messages(messaages.length-1)
      const botResponse = `Echo: ${answer}`;

      setMessages((prev) => [
        ...prev,
        {
          text: botResponse,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (error) {
      console.error('Failed to process answer:', error);
      setError('Failed to process answer. Please try again.');
    }
  };
  useEffect(() => {
    setMessages([
      {
        text: 'Hi what are your issues i am here to help',
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
    setMessages([]);
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