import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/style.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Item from './Item.jsx';
import MenuList from './MenuList.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MenuList />,
      },
      {
        path: '/items/:id',
        element: <Item />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
