import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('idToken');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (token && email && role) {
      setUser({ email, role });
    }
    setLoading(false);
  }, []);

  const login = (idToken, email, role) => {
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
    setUser({ email, role });
  };

  const logout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
