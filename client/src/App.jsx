import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  Friends,
  Groups,
  Home,
  Login,
  Page404,
  Photos,
  Profile,
  Register,
} from './pages';
import { AuthProvider, useAuth } from './utils/AuthContext';


const App = () => {
  const PrivateRoute = ({ element, ...props }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? element : <Navigate to="/" />;
  };
  
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route
            path="/members"
            element={<PrivateRoute element={<Friends />} />}
          />
          <Route
            path="/groups"
            element={<PrivateRoute element={<Groups />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="/photos"
            element={<PrivateRoute element={<Photos />} />}
          />
          <Route path='*' element={<Page404/>}/>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
