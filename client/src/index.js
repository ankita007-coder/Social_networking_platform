import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './utils/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Toaster position='top-center'/>
    <App />
    </AuthProvider>
  </React.StrictMode>
);

