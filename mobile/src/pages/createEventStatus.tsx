import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import * as Yup from 'yup';

import PrimaryButton from '../components/primaryButton';
import type { RouteProp } from '@react-navigation/core';
import type {RootStackParamList} from '../routes/routes'
import type { StackNavigationProp } from '@react-navigation/stack';

import Success from '../../assets/images/success.png';
import Failed from '../../assets/images/failed.png';

const CreateEventStatus = () => {
  const navigation = useNavigation();
  const { status } = useRoute<RouteProp<RootStackParamList,'CreateEventStatus'>>().params;

  return (
    <View style={styles.Background}>
        <Image source={status ? Success: Failed}/>
        <PrimaryButton onPress={()=>navigation.navigate('Feed') } >
          Próximo
        </PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#150050',
    paddingHorizontal: 20,
  },
});

export default CreateEventStatus;
