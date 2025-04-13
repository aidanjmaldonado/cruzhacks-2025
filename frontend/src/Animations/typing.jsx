import React from "react";

// const TypingIndicator = () => {
//   return (
//     <div className="flex items-center space-x-1">
//       <span className="text-sm text-gray-500">Typing</span>
//       <div className="flex space-x-1">
//         <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//         <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//         <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
//       </div>
//     </div>
//   );
// };

// export default TypingIndicator;

// In your ../Animations/typing.js file (or create it if it doesn't exist)

import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const TypingAnimation = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: 1,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        maxWidth: '70%',
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box 
          component="span" 
          sx={{ 
            width: 8, 
            height: 8, 
            bgcolor: '#757575', 
            borderRadius: '50%',
            animation: 'typing-dot 1.4s infinite ease-in-out both',
            animationDelay: '0s',
            '@keyframes typing-dot': {
              '0%, 80%, 100%': { opacity: 0.4, transform: 'scale(0.8)' },
              '40%': { opacity: 1, transform: 'scale(1)' }
            }
          }} 
        />
        <Box 
          component="span" 
          sx={{ 
            width: 8, 
            height: 8, 
            bgcolor: '#757575', 
            borderRadius: '50%',
            animation: 'typing-dot 1.4s infinite ease-in-out both',
            animationDelay: '0.2s'
          }} 
        />
        <Box 
          component="span" 
          sx={{ 
            width: 8, 
            height: 8, 
            bgcolor: '#757575', 
            borderRadius: '50%',
            animation: 'typing-dot 1.4s infinite ease-in-out both',
            animationDelay: '0.4s'
          }} 
        />
      </Box>
    </Box>
  );
};

export default TypingAnimation;
