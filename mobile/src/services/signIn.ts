import api from './api';

export enum LoginStatus {
  Success,
  WrongCredentials,
  NetworkError,
}

interface SignInInfo {
  status: LoginStatus;
  token: string;
}

async function signIn(email: string, password: string) {
  let signInInfo: SignInInfo = {
    status: LoginStatus.NetworkError,
    token: '',
  };
  try {
    const { data } = await api.post('/login', {
      email,
      senha: password,
    });
    signInInfo.status = LoginStatus.Success;
    signInInfo.token = data.jwt;
    return signInInfo;
  } catch (error: any) {
    if (error.response && !error.response.data.auth) {
      signInInfo.status = LoginStatus.WrongCredentials;
    }
    return signInInfo;
  }
}

export default signIn;
