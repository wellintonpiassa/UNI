import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import Introduction from '../pages/introduction';
import SignUp from '../pages/signup';

export type RootStackParamList = {
  Introduction: undefined;
  SignUp: undefined;
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
    </Stack.Navigator>
  );
};

const Routes: React.FC = () => {
  return <AuthRoutes />;
};

export default Routes;
