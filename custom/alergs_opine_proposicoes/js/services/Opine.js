import axios from 'axios';

export const listarVotacaoProposicao = (cpfCnpjParticipante, tipoProposicao, numeroProposicao, anoProposicao) => {
  return axios.post(`${window.location.origin}:5000/listarVotacaoProposicao`, {
    cpfCnpjParticipante: cpfCnpjParticipante, tipoProposicao: tipoProposicao, numeroProposicao: numeroProposicao, anoProposicao: anoProposicao
  })
    .then(res => {
      return JSON.stringify(res.data);
    });
}

export const incluirVotacaoProposicao = (cpfCnpjParticipante, voto, tipoProposicao, numeroProposicao, anoProposicao) => {
  return axios.post(`${window.location.origin}:5000/incluirVotacaoProposicao`, {
    cpfCnpjParticipante: cpfCnpjParticipante, voto: voto, tipoProposicao: tipoProposicao, numeroProposicao: numeroProposicao, anoProposicao: anoProposicao
  })
}

export const listarComentarioProposicao = (tipoProposicao, numeroProposicao, anoProposicao, cpfCnpjParticipante) => {
  return axios.post(`${window.location.origin}:5000/listarComentarioProposicao`, {
    tipoProposicao: tipoProposicao, numeroProposicao: numeroProposicao, anoProposicao: anoProposicao, cpfCnpjParticipante: cpfCnpjParticipante
  }) .then(res => {
    return JSON.stringify(res.data);
  });
}

export const incluirComentarioProposicao = (cpfCnpjParticipante, comentario, tipoProposicao, numeroProposicao, anoProposicao) => {
  return axios.post(`${window.location.origin}:5000/incluirComentarioProposicao`, {
    cpfCnpjParticipante: cpfCnpjParticipante, comentario: comentario, tipoProposicao: tipoProposicao, numeroProposicao: numeroProposicao, anoProposicao: anoProposicao
  }) .then(res => {
    return JSON.stringify(res.data);
  });
}
