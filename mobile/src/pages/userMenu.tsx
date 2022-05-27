import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserMenu = () => {
  const navigation = useNavigation();

  const options = [
    {
      text: 'Perfil',
      icon: 'account',
      onPress: () => {},
    },
    {
      text: 'Próximos eventos',
      icon: 'calendar',
      onPress: () => {},
    },
    {
      text: 'Formas de pagamento',
      icon: 'credit-card-outline',
      onPress: () => {},
    },
    {
      text: 'Lista de favoritos',
      icon: 'heart',
      onPress: () => navigation.navigate('Favorites'),
    },
    {
      text: 'Histórico de compra',
      icon: 'history',
      onPress: () => {},
    },
    {
      text: 'Notificações',
      icon: 'bell-outline',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      {options.map(({ text, icon, onPress }) => (
        <View>
          <TouchableOpacity style={styles.option} onPress={onPress}>
            <Icon color="#666666" name={icon} size={22} />
            <Text style={styles.text}>{text}</Text>
          </TouchableOpacity>
          <View style={styles.line} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  text: {
    fontSize: 16,
    marginLeft: 20,
    color: '#666666',
  },
  line: {
    width: '100%',
    height: 1,
    opacity: 0.25,
    backgroundColor: '#666666',
  },
});

export default UserMenu;
