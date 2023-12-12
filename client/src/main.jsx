import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import CollabTale from './components/CollabTale.jsx';
import Signup from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';
import User from './pages/User.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/CollabTale',
        element: <CollabTale />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/dashboard', // Added route for Dashboard
        element: <Dashboard />
      },
      {
        path: '/User',
        element: <User />
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);