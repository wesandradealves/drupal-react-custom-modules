// import api from './api';
import axios from 'axios';

export const listarTransmissoesTV = (statusTransmissao) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarTransmissoesTV`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        statusTransmissao: statusTransmissao
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const pesquisarTransmissoesTVAL = (assunto, dataInicial, dataFinal) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/pesquisarTransmissoesTVAL`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        assunto: assunto,
        dataInicial: dataInicial,
        dataFinal: dataFinal        
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};