import api from './api';

async function signIn(email: string, password: string): Promise<boolean> {
  const request = await api.post('/login', {
    email,
    senha: password,
  });
  return request.data.auth;
}

export default signIn;
