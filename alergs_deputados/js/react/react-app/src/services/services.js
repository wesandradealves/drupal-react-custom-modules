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

export const listarComissoesDeputado = (idProponente, idDeputado) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarComissoesDeputado`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        idProponente: idProponente,
        idDeputado: idDeputado
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const listarPronunciamentosDeputado = (Ano, idProponente) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarPronunciamentosDeputado`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        Ano: Ano,
        idProponente: idProponente
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

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

export const listarNoticias = (listaIdMateria) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarNoticias`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        listaIdMateria: listaIdMateria,
        publicada: "S"
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const listarFotosdeDeputadosAL = (idDeputado) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarFotosdeDeputadosAL`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        idDeputado: idDeputado  
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const listarDadosDeputadosTV = (nomeDeputado) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarDadosDeputadosTV`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        nomeDeputado: nomeDeputado  
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const listarDadosRadioDeputados = (idDeputado) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarDadosRadioDeputados`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        idDeputado: idDeputado  
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const listarArtigosDeputados = (idDeputado) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarArtigosDeputados`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        idDeputado: idDeputado  
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const listarNoticiasDeputados = (idDeputado, top) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarNoticiasDeputados`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data:  {
        top: top,
        idDeputado: idDeputado  
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const listaProposicaoCompleto = (nomeProponente) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listaProposicaoCompleto`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        nomeProponente: nomeProponente  
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const obtemProposicaoCompleto = (siglaTipoProposicao, nroProposicao, anoProposicao) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/obtemProposicaoCompleto`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        siglaTipoProposicao: siglaTipoProposicao,
        nroProposicao: nroProposicao,
        anoProposicao: anoProposicao
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const listaSituacaoProposicao = (siglaTipoProposicao, nroProposicao, anoProposicao) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listaSituacaoProposicao`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        siglaTipoProposicao: siglaTipoProposicao,
        nroProposicao: nroProposicao,
        anoProposicao: anoProposicao
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};

export const listarLegislaturaDeputado = (codProponente) => {
  var config = {
      method: 'post',
      url: `${window.location.origin}:5000/listarLegislaturaDeputado`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data: {
        codProponente: codProponente
      }      
  };

  return axios(config).then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });    
};