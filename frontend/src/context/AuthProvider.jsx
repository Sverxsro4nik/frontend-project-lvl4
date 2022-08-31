/* eslint-disable react/prop-types */
import React, { useState, useCallback, useMemo } from 'react';
import { AuthContext } from './contex.js';

function AuthProvider({ children }) {
  const savedUserData = JSON.parse(localStorage.getItem('user'));
  const getAuthHeader = () => {
    const userId = savedUserData;
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  const [user, setUser] = useState(
    savedUserData ? { username: savedUserData.username } : null,
  );
  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const providedData = useMemo(
    () => ({
      logIn,
      logOut,
      user,
      getAuthHeader,
    }),
    [logIn, logOut, user, getAuthHeader],
  );

  return (
    <AuthContext.Provider value={providedData}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
