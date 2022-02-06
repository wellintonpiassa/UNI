import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { useAuth } from '../contexts/auth';
import About from '../pages/about';
import Home from '../pages/home';
import Introduction from '../pages/introduction';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';

export type RootStackParamList = {
  Introduction: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Home: undefined;
  About: undefined;
};

// Rotas utilizadas quando o usuário não realizou login.
const AuthRoutes: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        component={Introduction}
        name="Introduction"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SignUp}
        name="SignUp"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={About}
        name="About"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SignIn}
        name="SignIn"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Rotas utilizadas quando o usuário realizou login.
const AppRoutes: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        component={Home}
        name="Home"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Routes: React.FC = () => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
