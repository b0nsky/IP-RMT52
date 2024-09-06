import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import ReactDOM from 'react-dom/client'
import React from 'react'
import router from './routers/router.jsx'
import { RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
    
  </React.StrictMode>
);
