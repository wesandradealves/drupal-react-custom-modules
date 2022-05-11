// import api from './api';
import axios from 'axios';

export const listarDestaqueDeputados = () => {
  var config = {
      method: 'get',
      url: `${window.location.origin}:5000/listarDestaqueDeputados`,
      headers: { 
          'Content-Type': 'application/json'
      }
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};