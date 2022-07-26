import React, { useState, useCallback, useMemo } from 'react';
import { AuthContext } from './AuthContext.js';

function AuthProvider({ children }) {
  const savedUserData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(
    savedUserData ? {username: savedUserData.username} : null
  );
  const logIn = useCallback((userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser({username: userData.username});
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  const providedData = useMemo(
    () => ({
      logIn,
      logOut,
      user
    }),
    [logIn, logOut, user]
  );

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;