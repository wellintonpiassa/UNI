import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { useAuth } from '../contexts/auth';
import About from '../pages/about';
import CreateEvent from '../pages/createEvent';
import CreateEventStatus from '../pages/createEventStatus';
import Favorites from '../pages/favorites';
import Introduction from '../pages/introduction';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';
import UserMenu from '../pages/userMenu';

import FeedNavigator from './feedNavigator';

export type IRoutes = {
  About: undefined;
  CreateEvent: undefined;
  CreateEventStatus: { status: boolean };
  Favorites: undefined;
  Feed: undefined;
  Introduction: undefined;
  SignIn: undefined;
  SignUp: undefined;
  UserMenu: undefined;
};

// Rotas utilizadas quando o usuário não realizou login.
const AuthRoutes: React.FC = () => {
  const Stack = createStackNavigator<IRoutes>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        component={SignIn}
        name="SignIn"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={About}
        name="About"
        options={{ headerShown: false }}
      />
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
    </Stack.Navigator>
  );
};

// Rotas utilizadas quando o usuário realizou login.
const AppRoutes: React.FC = () => {
  const Stack = createStackNavigator<IRoutes>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#150050' },
        headerTintColor: 'white',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        component={FeedNavigator}
        name={'FeedNavigator' as keyof IRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={CreateEvent}
        name="CreateEvent"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={CreateEventStatus}
        name="CreateEventStatus"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={UserMenu}
        name="UserMenu"
        options={{
          title: 'Área do Usuário',
        }}
      />
      <Stack.Screen
        component={Favorites}
        name="Favorites"
        options={{
          title: 'Favoritos',
        }}
      />
    </Stack.Navigator>
  );
};

const Routes: React.FC = () => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
