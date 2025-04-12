import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './Common/Home'; // New component to handle sessionId fetch
import ChatWindow from './Common/ChatWindow';
import ErrorPage from './Common/ErrorPage'; // Optional: for error handling

const router = createBrowserRouter([
  {
    path: '/',
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
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;