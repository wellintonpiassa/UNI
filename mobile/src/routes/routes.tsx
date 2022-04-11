import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import { useAuth } from '../contexts/auth';
import About from '../pages/about';
import Introduction from '../pages/introduction';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';

import FeedNavigator from './feedNavigator';

export type RootStackParamList = {
  Introduction: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Feed: undefined;
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
        component={FeedNavigator}
        name={'FeedNavigator' as keyof RootStackParamList}
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
