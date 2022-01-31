import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import theme from './config/theme';
import { AuthProvider } from './contexts/auth';
import Routes from './routes/routes';

const App = () => {
  return (
    <>
      <StatusBar />
      <AuthProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    </>
  );
};

export default App;
