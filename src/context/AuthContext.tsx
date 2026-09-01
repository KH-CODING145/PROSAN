import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'developer' | 'admin';
  avatar?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: 'client' | 'developer') => Promise<void>;
  signup: (name: string, email: string, role?: 'client' | 'developer') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_KEY = 'prosan_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(DEMO_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(DEMO_USER_KEY);
      }
    } catch {
      // Ignore storage write errors
    }
  }, [user]);

  const login = async (email: string, role: 'client' | 'developer' = 'client') => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const namePart = email.split('@')[0] || 'Member';
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    
    const newUser: User = {
      id: `usr_${Date.now().toString(36)}`,
      name: formattedName,
      email,
      role,
      company: role === 'client' ? 'Acme Innovation Corp' : 'Independent Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    setUser(newUser);
  };

  const signup = async (name: string, email: string, role: 'client' | 'developer' = 'client') => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const newUser: User = {
      id: `usr_${Date.now().toString(36)}`,
      name: name || 'Valued Partner',
      email,
      role,
      company: 'Enterprise Partner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
