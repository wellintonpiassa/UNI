import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import Routes from './routes/routes';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#610094',
    accent: '#150050',
    text: 'white',
  },
};

const App = () => {
  return (
    <>
      <StatusBar />
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;
