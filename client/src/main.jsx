import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Story from './pages/Story.jsx';
import NotFound from './pages/NotFound.jsx';
import User from './pages/User.jsx';
import Signup from './pages/SignUp.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/story',
        element: <Story />
      }, {
        path: '/story/:id', // Adjusted the path for Vote
        element: <Story />
      },
    ],
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
