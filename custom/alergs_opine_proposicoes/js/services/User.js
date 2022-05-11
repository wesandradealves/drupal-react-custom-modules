import axios from 'axios';

export const getNameByCpfCnpj = (cpfCnpj) => {
  return axios.get('/api/opine-proposicoes/user', {
    params: {
      cpfCnpj: cpfCnpj
    }
  })
    .then(res => {
      return JSON.stringify(res.data);
    });
}
