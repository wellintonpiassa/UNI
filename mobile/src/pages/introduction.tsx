import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PrimaryButton from '../components/primaryButton';
import ScrollView from '../components/scrollView';
import SecondaryButton from '../components/secondaryButton';

import Logo from '../../assets/images/logo.png';

const Introduction = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.Background}>
      <View style={styles.LogoContainer}>
        <Image source={Logo} />
      </View>
      <View style={styles.Footer}>
        <PrimaryButton onPress={() => navigation.navigate('SignUp')}>
          Criar Conta
        </PrimaryButton>
        <SecondaryButton onPress={() => navigation.navigate('SignIn')}>
          Já tenho conta
        </SecondaryButton>
        <View style={styles.InfoContainer}>
          <Icon color="white" name="chevron-double-up" size={25} />
          <Text>Sobre o UNI</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#150050',
  },
  LogoContainer: {
    flex: 1,
    alignItems: 'center',
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

export default Introduction;
