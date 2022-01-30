import api from './api';

interface SignUpInfo {
  name: string;
  isAdmin: boolean;
  group: string;
  phone: string;
  birthday: string;
  email: string;
  password: string;
}

async function signUp(info: SignUpInfo) {
  await api.post('/cadastro', {
    nome: info.name,
    administrador: info.isAdmin,
    participacao_atletica: info.group,
    celular: info.phone,
    data_nascimento: info.birthday,
    email: info.email,
    senha: info.password,
  });
}

export default signUp;
