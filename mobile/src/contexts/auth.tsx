import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { hide } from 'react-native-bootsplash';

import api from '../services/api';
import signInService, { LoginStatus } from '../services/signIn';

interface UserInfo {
  email: string;
}

interface AuthContextData {
  isSignedIn: boolean;
  userInfo: UserInfo;
  signIn: (email: string, password: string) => Promise<LoginStatus>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo>({ email: '' });
  const [token, setToken] = useState('');

  useEffect(() => {
    async function loadSavedInfo() {
      const loginToken = await AsyncStorage.getItem('@UNI:token');
      if (loginToken) {
        api.defaults.headers.common['x-access-token'] = loginToken;
        setToken(loginToken);
      }
      setIsLoading(false);
      setTimeout(() => {
        hide({ fade: true });
      }, 600);
    }
    loadSavedInfo();
  }, []);

  async function signIn(email: string, password: string) {
    const { status, token: loginToken } = await signInService(email, password);
    if (status === LoginStatus.Success) {
      await AsyncStorage.setItem('@UNI:token', loginToken);
      api.defaults.headers.common['x-access-token'] = loginToken;
      setUserInfo({ email });
      setToken(loginToken);
    }
    return status;
  }

  async function signOut() {
    await AsyncStorage.removeItem('@UNI:token');
    api.defaults.headers.common['x-access-token'] = '';
    setToken('');
  }

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: !!token,
        userInfo,
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
