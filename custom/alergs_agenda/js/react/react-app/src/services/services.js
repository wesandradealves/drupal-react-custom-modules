// import api from './api';
import axios from 'axios';



export const listarDadosAgendaEventos = (dataAgenda) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarDadosAgendaEventos`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        dataAgenda: dataAgenda
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const listarAgendaPresidencia = (dataAgenda) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarAgendaPresidencia`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        dataAgenda: dataAgenda
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const listarAgendaReunioes = (inicioReuniao) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarAgendaReunioes`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        inicioReuniao: inicioReuniao
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const listarAgendaHistoricoReunioes = (inicioReuniao) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarAgendaHistoricoReunioes`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        inicioReuniao: inicioReuniao
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};