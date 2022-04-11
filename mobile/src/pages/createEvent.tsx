import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import * as Yup from 'yup';

import { useAuth } from '../contexts/auth';
import DatePicker from '../components/datePicker';
import Picker from '../components/picker';
import PrimaryButton from '../components/primaryButton';
import ScrollView from '../components/scrollView';
import TextInput from '../components/textInput';
import { createEvent } from '../services/event';
import { event } from 'react-native-reanimated';

interface FormData {
  name: string;
  city: string;
  address: string;
  startDate: string;
  endDate: string;
  tickets: string;
  price: string;
  imageURL: string;
  description: string;
  startTime: string;
  endTime: string;
}

const CreateEvent = () => {
  const navigation = useNavigation();
  const { userInfo } = useAuth();

  const createEventSchema = Yup.object({
    name: Yup.string().required('Campo obrigatório'),
    city: Yup.string().required('Campo obrigatório'),
    address: Yup.string().required('Campo obrigatório'),
    startDate: Yup.string().required('Campo obrigatório'),
    endDate: Yup.string().required('Campo obrigatório'),
    tickets: Yup.number().positive("Deve ser maior que 0")
      .required('Campo obrigatório')
      .min(1, 'Deve ter no mínimo 1 Ingresso'),
    price: Yup.number().positive("Deve ser maior que 0").integer('Campo obrigatório'),
    imageURL: Yup.string().required('Campo obrigatório'),
    description: Yup.string().required('Campo obrigatório'),
    startTime: Yup.string().required('Campo obrigatório'),
    endTime: Yup.string().required('Campo obrigatório'),
  });

  const initialInfo: FormData = {
    name: '',
    city: '',
    address: '',
    startDate: '',
    endDate: '',
    tickets: '',
    price: '',
    imageURL: '',
    description: '',
    startTime: '',
    endTime: ''
  };

  async function handleFormSubmit(
    values: FormData,
    { setSubmitting }: FormikHelpers<FormData>,
  ) {
    const startDateTime = new Date(values.startDate +' '+values.startTime);
    const endDateTime = new Date(values.endDate +' '+values.endTime);
    const eventInfo = {
      ...values, 
      tickets:Number(values.tickets) , 
      email: userInfo.email,
      startDateTime, endDateTime
    }
    setSubmitting(true);

    const status = await createEvent(eventInfo);
    navigation.navigate('CreateEventStatus', {status});
  }

  return (
    <ScrollView style={styles.Background}>
      <Formik
        initialValues={initialInfo}
        validateOnChange={false}
        validationSchema={createEventSchema}
        onSubmit={handleFormSubmit}>
        {({ values, errors, isSubmitting, handleChange, handleSubmit }) => (
          <View>
            <View style={styles.NameContainer}>
              <TextInput
                containerStyle={styles.Name}
                errorMessage={errors.name}
                placeholder="Nome do Evento"
                value={values.name}
                onChangeText={handleChange('name')}
              />
            </View>
            <View style={styles.NameContainer}>
              <TextInput
                containerStyle={styles.Name}
                errorMessage={errors.address}
                placeholder="Endereço"
                value={values.address}
                onChangeText={handleChange('address')}
              />
            </View>
            <View style={styles.InfoContainer}>
              <Picker
                errorMessage={errors.city}
                options={[
                  'Aracaju',
                  'Belém',
                  'Belo Horizonte',
                  'Boa Vista',
                  'Brasília',
                  'Cambé',
                  'Campo Grande',
                  'Cuiabá',
                  'Curitiba',
                  'Florianópolis',
                  'Fortaleza',
                  'Goiânia',
                  'João Pessoa',
                  'Londrina',
                  'Macapá',
                  'Maceió',
                  'Manaus',
                  'Natal',
                  'Palmas',
                  'Porto Alegre',
                  'Porto Velho',
                  'Recife',
                  'Rio Branco',
                  'Rio de Janeiro',
                  'Salvador',
                  'São Luís',
                  'São Paulo',
                  'Teresina',
                  'Vitória',
                ]}
                placeholder="Cidade"
                onChange={handleChange('city')}
              />
            </View>
            <View style={styles.Row}>
              <DatePicker
                containerStyle={styles.startDate}
                errorMessage={errors.startDate}
                minDate={new Date()}
                placeholder="Data de Inicio"
                onChange={handleChange('startDate')}
              />
              <DatePicker
                containerStyle={styles.startDate}
                errorMessage={errors.startTime}
                placeholder="Horario de Inicio"
                onChange={handleChange('startTime')}
                mode="time"
              />
              <DatePicker
                containerStyle={styles.startDate}
                errorMessage={errors.endDate}
                minDate={new Date()}
                placeholder="Data de Fim"
                onChange={handleChange('endDate')}
              />
              <DatePicker
                containerStyle={styles.startDate}
                errorMessage={errors.endTime}
                placeholder="Horario de Fim"
                onChange={handleChange('endTime')}
                mode="time"
              />
            </View>
            <View style={styles.AccountContainer}>
              <TextInput
                errorMessage={errors.tickets}
                placeholder="Número de ingressos"
                value={values.tickets}
                onChangeText={handleChange('tickets')}
              />
              <TextInput
                containerStyle={styles.Name}
                errorMessage={errors.price}
                placeholder="Preço"
                value={values.price}
                onChangeText={handleChange('price')}
              />
            </View>
            <TextInput
              errorMessage={errors.imageURL}
              placeholder="URL da imagem do evento"
              value={values.imageURL}
              onChangeText={handleChange('imageURL')}
            />
            <TextInput
              errorMessage={errors.description}
              placeholder="Descrição sobre o evento"
              value={values.description}
              onChangeText={handleChange('description')}
            />
            <View style={styles.Footer}>
              <PrimaryButton disabled={isSubmitting} onPress={handleSubmit}>
                Cadastrar Evento
              </PrimaryButton>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  NameContainer: { marginBottom: 20 },
  InfoContainer: { marginTop: 10, marginBottom: 10 },
  AccountContainer: { marginTop: 20, marginBottom: 10 },
  Background: {
    flex: 1,
    backgroundColor: '#150050',
    paddingHorizontal: 20,
  },
  Name: {
    marginBottom: 10,
  },
  Row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  Phone: {
    flex: 1.5,
    marginRight: 6,
  },
  startDate: {
    flex: 1,
  },
  Footer: {
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default CreateEvent;