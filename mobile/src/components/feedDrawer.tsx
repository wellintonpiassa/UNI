import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../contexts/auth';

function FeedDrawer() {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView style={styles.Container}>
      <DrawerItem
        activeTintColor="white"
        icon={({ color, size }) => (
          <Icon color={color} name="clipboard-account-outline" size={size} />
        )}
        inactiveTintColor="white"
        label="Área do usuário"
        onPress={() => navigation.navigate('UserMenu')}
      />
      <DrawerItem
        activeTintColor="white"
        icon={({ color, size }) => (
          <Icon color={color} name="clipboard-text" size={size} />
        )}
        inactiveTintColor="white"
        label="Área do organizador"
        onPress={() => {}}
      />
      <DrawerItem
        activeTintColor="white"
        icon={({ color, size }) => (
          <Icon color={color} name="cog" size={size} />
        )}
        inactiveTintColor="white"
        label="Configurações"
        onPress={() => {}}
      />
      <DrawerItem
        activeTintColor="white"
        icon={({ color, size }) => (
          <Icon color={color} name="information" size={size} />
        )}
        inactiveTintColor="white"
        label="Ajuda"
        onPress={() => {}}
      />
      <DrawerItem
        activeTintColor="white"
        icon={({ color, size }) => (
          <Icon color={color} name="power" size={size} />
        )}
        inactiveTintColor="white"
        label="Sair"
        onPress={signOut}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#150050',
  },
});

export default FeedDrawer;
