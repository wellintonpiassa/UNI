import { createDrawerNavigator } from '@react-navigation/drawer';

import FeedDrawer from '../components/feedDrawer';
import Feed from '../pages/feed';

const Drawer = createDrawerNavigator();

const FeedNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={() => <FeedDrawer />}
      screenOptions={{
        swipeEnabled: false,
      }}>
      <Drawer.Screen
        component={Feed}
        name="Feed"
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default FeedNavigator;
