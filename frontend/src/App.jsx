import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './Common/Home'; // New component to handle sessionId fetch
import Interview from './Interview';
import ErrorPage from './Common/ErrorPage'; // Optional: for error handling
import AppContextProvider from './Contexts/AppContext';
import Credits from './Common/Credits';
import User from './User';
// import AppHeader from './Common/NavBar';
const router = createBrowserRouter([
  {
    path: '/',
    element: <User></User>
  },
  {
    path: '/chat',
    element: <Home />, // Fetches sessionId and navigates
  },
  {
    path: '/chat/:sessionId',
    element: <Interview />,
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
  {
    path: '/credits',
    element: <Credits />
  }
]);

function App() {
  return (
  <AppContextProvider>
    <RouterProvider router={router} />
    </AppContextProvider>)
  
}

export default App;