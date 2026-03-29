import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [pendingAction, setPendingAction] = useState(null);

  const openAuth = (mode = 'login', onSuccess = null) => {
    setAuthMode(mode);
    setPendingAction(() => onSuccess);
    setShowAuthModal(true);
  };

  const closeAuth = () => {
    setShowAuthModal(false);
    setPendingAction(null);
  };

  const login = (email, name) => {
    setUser({ email, name: name || email.split('@')[0] });
    setShowAuthModal(false);
    if (pendingAction) pendingAction();
    setPendingAction(null);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, showAuthModal, authMode, openAuth, closeAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
