// import api from './api';
import axios from 'axios';

export const incluirCadastroNewsletter = (email) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/incluirCadastroNewsletter`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        email: email,
        nome: "",
        cidade: "",
        uf: "",
        fone: "",
        confirmadoSN: "",
        bancadas: [],
        comissoes: []
      }     
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const consultarEmailNewsletter = (email) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/consultarEmailNewsletter`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        email: email  
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const excluirCadastroNewsletter = (email) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/excluirCadastroNewsletter`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        email: email  
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};