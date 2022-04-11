import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import * as Yup from 'yup';

import PrimaryButton from '../components/primaryButton';
import ScrollView from '../components/scrollView';
import TextInput from '../components/textInput';
import { useAuth } from '../contexts/auth';
import { LoginStatus } from '../services/signIn';

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { signIn } = useAuth();
  const signUpSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    password: Yup.string()
      .required('Campo obrigatório')
      .min(5, 'Deve ter no mínimo 5 dígitos'),
  });
  const initialInfo: FormData = {
    email: '',
    password: '',
  };

  async function handleFormSubmit(
    values: FormData,
    { setSubmitting }: FormikHelpers<FormData>,
  ) {
    setSubmitting(true);
    const status = await signIn(values.email, values.password);
    if (status === LoginStatus.NetworkError) {
      setErrorMessage(
        'Erro de conexão!\nPor favor, tente novamente mais tarde.',
      );
      setSubmitting(false);
    } else if (status === LoginStatus.WrongCredentials) {
      setErrorMessage(
        'Dados incorretos.\nPor favor, verifique as informações inseridas.',
      );
      setSubmitting(false);
    }
  }

  return (
    <>
      <Portal>
        <Modal
          contentContainerStyle={styles.ModalContainer}
          visible={!!errorMessage}
          onDismiss={() => setErrorMessage('')}>
          <Text style={styles.ModalText}>{errorMessage}</Text>
        </Modal>
      </Portal>
      <ScrollView style={styles.Background}>
        <View style={styles.HeaderTextContainer}>
          <Text style={styles.HeaderText}>Faça</Text>
          <Text style={styles.HeaderText}>Login</Text>
        </View>

        <Formik
          initialValues={initialInfo}
          validateOnChange={false}
          validationSchema={signUpSchema}
          onSubmit={handleFormSubmit}>
          {({ values, errors, handleChange, handleSubmit }) => (
            <View>
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
                <PrimaryButton onPress={handleSubmit}>Entrar</PrimaryButton>
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.TextFooter}>
          <Text style={styles.thin}>Primeira vez aqui?</Text>
          <Text
            style={styles.bold}
            onPress={() => navigation.navigate('SignUp')}>
            Cadastre-se
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#150050',
    paddingHorizontal: 20,
  },
  ModalContainer: {
    backgroundColor: 'white',
    padding: 40,
    margin: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalText: {
    color: 'black',
  },
  HeaderTextContainer: {
    marginVertical: 60,
    marginLeft: 10,
  },
  HeaderText: {
    fontSize: 40,
  },
  Footer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  TextFooter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 100,
  },
  thin: {
    fontSize: 25,
    paddingBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default SignIn;
