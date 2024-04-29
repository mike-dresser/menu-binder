import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/style.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Item from './pages/Item/Item.jsx';
import MenuList from './pages/MenuList.jsx';
import NewItem from './pages/NewItem.jsx';

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
      {
        path: '/new',
        element: <NewItem />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
