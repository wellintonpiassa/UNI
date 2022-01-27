import {Image, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Logo from '../../assets/images/logo.png';

const Introduction = () => {
  return (
    <View style={styles.Background}>
      <Text />
      <View style={styles.LogoContainer}>
        <Image source={Logo} />
      </View>
      <View style={styles.Footer}>
        <Button
          style={styles.Button}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Criar Conta
        </Button>
        <Button
          style={[styles.Button, styles.Login]}
          mode="outlined"
          labelStyle={styles.LoginText}
          onPress={() => console.log('Pressed')}>
          Já tenho conta
        </Button>
        <View style={styles.InfoContainer}>
          <Icon name="chevron-double-up" size={25} color="white" />
          <Text>Sobre o UNI</Text>
        </View>
      </View>
    </View>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#150050',
  },
  LogoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  Button: {
    width: '80%',
    marginTop: 10,
    borderColor: 'white',
  },
  Login: {
    borderWidth: 1,
  },
  LoginText: {
    color: 'white',
  },
  Footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  InfoContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
});
