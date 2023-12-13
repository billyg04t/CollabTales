import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import CollabTale from './components/CollabTale.jsx';
import Signup from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';
import User from './pages/User.jsx'
import SingleStory from './pages/SingleStory.jsx';  // Import the new page

import Footer from './components/Footer.jsx'

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
      {

        path: '/stories/:storyId', // Add a dynamic route parameter for storyId
        element: <SingleStory />
      },
      {
        path: '/Footer',
        element: <Footer />

      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);