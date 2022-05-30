import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Image, View } from 'react-native';
import { Text } from 'react-native-paper';

import PrimaryButton from '../components/primaryButton';

import type { IRoutes } from '../routes/routes';
import type { RouteProp } from '@react-navigation/core';

import Failed from '../../assets/images/failed.png';
import Success from '../../assets/images/success.png';

const CreateEventStatus = () => {
  const navigation = useNavigation();
  const { status } = useRoute<RouteProp<IRoutes, 'CreateEventStatus'>>().params;

  return (
    <View style={styles.Background}>
      <View style={styles.ImageContainer}>
        <Image source={status ? Success : Failed} />
        <Text style={styles.StatusText}>
          {status ? 'EVENTO CRIADO COM SUCESSO' : 'FALHA AO CRIAR EVENTO'}
        </Text>
      </View>
      <View style={styles.Footer}>
        <PrimaryButton onPress={() => navigation.navigate('Feed')}>
          Próximo
        </PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#150050',
    padding: 20,
    alignItems: 'center',
  },
  ImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10,
  },
  StatusText: {
    marginTop: 30,
    fontSize: 30,
    textAlign: 'center',
  },
  Footer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 30,
  },
});

export default CreateEventStatus;
