// import api from './api';
import axios from 'axios';



export const incluirCadastroOuvidoria = (dataOuvidoria) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/incluirCadastroOuvidoria`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        dataOuvidoria: dataOuvidoria
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const atualizarStatusCadastroOuvidoria = (idDemanda) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/atualizarStatusCadastroOuvidoria`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        idDemanda: idDemanda
      }      
  };

  


  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const enviarEmail = (dataOuvidoria,csrfToken) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}/ouvidoria/send`,
      headers: { 
        'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json'
      },
      data: {
        dataOuvidoria: dataOuvidoria
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};