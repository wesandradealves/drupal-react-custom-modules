// import api from './api';
import axios from 'axios';

export const ObterMesaDiretora = () => {
  var config = {
      method: 'get',
      url: `${window.location.origin}:5000/ObterMesaDiretora`,
      headers: { 
          'Content-Type': 'application/json'
      }
  };

  return axios(config).then(function (response) {
    //console.log(response.data);
    return JSON.stringify(response.data);
    
  })
  .catch(function (error) {
    console.log(error);
  });    
};


export const ObterPlenario = () => {
  var config = {
      method: 'get',
      url: `${window.location.origin}:5000/ObterPlenario`,
      headers: { 
          'Content-Type': 'application/json'
      }
  };

  return axios(config).then(function (response) {
    console.log(response.data);
    return JSON.stringify(response.data);
    
  })
  .catch(function (error) {
    console.log(error);
  });    
};

