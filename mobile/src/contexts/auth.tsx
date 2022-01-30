import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import signInService from '../services/signIn';

interface AuthContextData {
  isSigned: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSavedInfo() {
      const loggedPreviously = await AsyncStorage.getItem('@UNI:isLoggedIn');
      setIsLoading(!!loggedPreviously);
    }
    loadSavedInfo();
  }, []);

  async function signIn(email: string, password: string) {
    const status = await signInService(email, password);
    if (status) {
      await AsyncStorage.setItem('@UNI:isLoggedIn', '');
      setIsLoggedIn(true);
    }
    return status;
  }

  async function signOut() {
    await AsyncStorage.removeItem('@UNI:isLoggedIn');
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isSigned: !!isLoggedIn,
        signIn,
        signOut,
      }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}
