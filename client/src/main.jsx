import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Story from './pages/Story.jsx';
import NotFound from './pages/NotFound.jsx';
import CollabTale from './components/CollabTale.jsx';
import Signup from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx'

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
        path: '/story',
        element: <Story />
      },
      {
        path: '/story/:id',
        element: <Story />
      },
      {
        path: '/CollabTale',
        element: <CollabTale />
      },
      {
        path: '/signup',  
        element: <Signup />
      }
    ],
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
