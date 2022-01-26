import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import * as Yup from 'yup';

import DatePicker from '../components/datePicker';
import Picker from '../components/picker';
import PrimaryButton from '../components/primaryButton';
import ScrollView from '../components/scrollView';
import TextInput from '../components/textInput';

interface SignUpInfo {
  name: string;
  type: string;
  group: string;
  phone: string;
  birthday: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const signUpSchema = Yup.object({
    name: Yup.string().required('Campo obrigatório'),
    type: Yup.string().required('Campo obrigatório'),
    group: Yup.string().required('Campo obrigatório'),
    phone: Yup.string()
      .required('Campo obrigatório')
      .min(11, 'Deve ter no mínimo 11 dígitos'),
    birthday: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
  });
  const initialInfo: SignUpInfo = {
    name: '',
    type: '',
    group: '',
    phone: '',
    birthday: '',
    email: '',
    password: '',
  };

  return (
    <ScrollView style={styles.Background}>
      <View style={styles.HeaderTextContainer}>
        <Text style={styles.HeaderText}>Criar</Text>
        <Text style={styles.HeaderText}>Conta</Text>
      </View>

      <Formik
        initialValues={initialInfo}
        validateOnChange={false}
        validationSchema={signUpSchema}
        onSubmit={values => console.log(values)}>
        {({ values, errors, handleChange, setFieldValue, handleSubmit }) => (
          <View>
            <TextInput
              containerStyle={styles.Name}
              errorMessage={errors.name}
              placeholder="Nome Completo"
              value={values.name}
              onChangeText={handleChange('name')}
            />
            <Picker
              errorMessage={errors.type}
              options={['Universitário', 'Organizador de eventos']}
              placeholder="Tipo de usuário"
              onChange={handleChange('type')}
            />
            <Picker
              errorMessage={errors.group}
              options={[
                'Não',
                'Exatas UEL',
                'ASCOF UEL',
                'XXI de Agosto',
                'XV de Setembro',
                'Educa UEL',
                'Pio XII',
                'V de Outubro',
              ]}
              placeholder="Participa de alguma atlética?"
              onChange={handleChange('group')}
            />
            <View style={styles.Row}>
              <TextInput
                containerStyle={styles.Phone}
                errorMessage={errors.phone}
                placeholder="Celular"
                value={values.phone}
                onChangeText={handleChange('phone')}
              />
              <DatePicker
                containerStyle={styles.Birthday}
                errorMessage={errors.birthday}
                placeholder="Data de nascimento"
                onChange={date => setFieldValue('birthday', date.toISOString())}
              />
            </View>
            <TextInput
              errorMessage={errors.email}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
            />
            <TextInput
              errorMessage={errors.password}
              placeholder="Senha"
              value={values.password}
              onChangeText={handleChange('password')}
            />
            <View style={styles.Footer}>
              <PrimaryButton onPress={handleSubmit}>Cadastrar</PrimaryButton>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#150050',
    paddingHorizontal: 20,
  },
  HeaderTextContainer: {
    marginBottom: 30,
    marginTop: 10,
  },
  HeaderText: {
    fontSize: 40,
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
  Birthday: {
    flex: 1,
  },
  Footer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default SignUp;