import React from "react";
import axios from 'axios';
import "../Ouvidoria/style.scss";
import { atualizarStatusCadastroOuvidoria } from '../../services/services';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8'




export default class Ouvidoria extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validado: false,
            mensagem:'Validando dados'
           
        }
        
    }
    sendData = async (value) => {
      const response = await atualizarStatusCadastroOuvidoria(value).then(data => {
          return JSON.parse(data).lista;
      }).catch(err => console.log(err));
      if(response){
        console.log("responses",response);
      this.setState({validado:true});
      this.setState({mensagem:"Sua demanda foi confirmada com sucesso"});
      return true;
      }else{
        this.setState({mensagem:"A ativação excedeu o prazo de quarenta e oito (48) horas. Por favor, preencha novamente o formulário."});
      }
      console.log('sem resposta');
      return false;
  } 
  getUrlParams(){
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    let id = params.get('id');
    var ciphertext = CryptoAES.encrypt('3870', 'alergsSecretU2FsdGVkX18U7hLByAo9FEL5a3JGxRD0votBVxaatps');
    var _ciphertext = CryptoAES.decrypt(decodeURIComponent(id), 'alergsSecretU2FsdGVkX18U7hLByAo9FEL5a3JGxRD0votBVxaatps');
    
    console.log("teste",ciphertext.toString());
    console.log(_ciphertext.toString(CryptoENC));
    this.sendData(_ciphertext.toString(CryptoENC));
    console.log(id);
    }

  
  


  
    componentDidMount = async () => {
        this.getUrlParams();
      //  await this.setContent();
    }
    


    render() {
     
        

        return (
                  <div className="ouvidoriaContent">
                      {this.state.validado ?
                    <p>{this.state.mensagem}</p>
                        :
                        <p>{this.state.mensagem}</p>
                      }
                        <a className="button enviar" href= {window.location.origin+'/ouvidoria' }>Retornar para o formulário</a>
                            </div>
        );
    }
}