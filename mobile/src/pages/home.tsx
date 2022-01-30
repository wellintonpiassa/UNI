import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import PrimaryButton from '../components/primaryButton';
import ScrollView from '../components/scrollView';

import { useAuth } from '../contexts/auth';

const Home = () => {
  const { signOut } = useAuth();

  return (
    <ScrollView style={styles.Background}>
      <View style={styles.Container}>
        <Text>Você esta autenticado!</Text>
        <PrimaryButton onPress={signOut}>Sair</PrimaryButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#150050',
  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
