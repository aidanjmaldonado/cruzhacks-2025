import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './Common/Home'; // New component to handle sessionId fetch
import ChatWindow from './Common/ChatWindow';
import ErrorPage from './Common/ErrorPage'; // Optional: for error handling
import AppContextProvider from './Contexts/AppContext';
import Credits from './Common/Credits';
const router = createBrowserRouter([
  {
    path: '/chat',
    element: <Home />, // Fetches sessionId and navigates
  },
  {
    path: '/chat/:sessionId',
    element: <ChatWindow />,
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
  // Fallback for unmatched routes
  {
    path: '*',
    element: <Navigate to="/chat" replace />,
  },
  {
    path: '/credits',
    element: <Credits />
  }
]);

function App() {
  return (
  <AppContextProvider><RouterProvider router={router} /></AppContextProvider>)
  
}

export default App;