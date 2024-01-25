import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  const login = (newToken, newUserDetails) => {
    setToken(newToken);
    setUserDetails(newUserDetails);
    setIsLoggedIn(true);

    // Store authentication information in localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('userDetails', JSON.stringify(newUserDetails));
  };

  const logout = () => {
    setToken('');
    setUserDetails(null);
    setIsLoggedIn(false);
    // Remove authentication information from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
  };
  
  
  useEffect(() => {
 
    const storedToken = localStorage.getItem('token');
    const storedUserDetails = localStorage.getItem('userDetails');
  
    if (storedToken && storedUserDetails) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
      setIsLoggedIn(false);
    }
  }, []); 
  



  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);