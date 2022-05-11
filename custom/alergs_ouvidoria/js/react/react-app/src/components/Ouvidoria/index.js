import React from "react";
import axios from 'axios';
import "./style.scss";
import { incluirCadastroOuvidoria } from '../../services/services';

import { enviarEmail } from '../../services/services'

import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8'
import cidades from "./cidades.json";
import InputMask, { InputState } from "react-input-mask";

import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from 'react-google-recaptcha-v3';


export default class Ouvidoria extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ouvidoria: [],
           cidade:cidades,
           estadoCidade:[],
           csrfToken: '',
           ouvidoria_nome: '',
            ouvidoria_rua: '',
            ouvidoria_numero: '',
            ouvidoria_complemento: '',
            ouvidoria_bairro: '',
            ouvidoria_estado: '',
            ouvidoria_cidade: '',
            ouvidoria_cep: '',
            ouvidoria_telefone: '',
            ouvidoria_email: '',
            ouvidoria_email2: '',
            ouvidoria_demanda: '',
            ouvidoria_aceito: '',
            formErrors:{
              ouvidoria_nome: 'Campo obrigatório',
              ouvidoria_rua: 'Campo obrigatório',
              ouvidoria_numero: 'Campo obrigatório',
              
              ouvidoria_bairro: 'Campo obrigatório',
              ouvidoria_estado: 'Campo obrigatório',
              ouvidoria_cidade: 'Campo obrigatório',
              ouvidoria_cep: 'Campo obrigatório',
              ouvidoria_telefone: 'Campo obrigatório',
              ouvidoria_email: 'Campo obrigatório',
              ouvidoria_email2: 'Campo obrigatório',
             
              ouvidoria_demanda: 'Campo obrigatório',
              ouvidoria_aceito: 'Campo obrigatório'
            },
            returnErrors:{},
            emailValid: false,
            formValid: false,
            showOverlay: false,
            overlayMessage:"Validando",
            successSend:false,
            formData:{},
            hasErrors:false,
            captcha:{
              
                  enable: true,
                  
              
          }
        }
        
    }
    sendData = async (value) => {
      const response = await incluirCadastroOuvidoria(value).then(data => {
          return JSON.parse(data).lista;
      }).catch(err => console.log(err));

      console.log("responses",response);
      
      return response;
  }


  sendEmail = async (value) => {
    const response = await enviarEmail(value,this.state.csrfToken).then(data => {
        return JSON.parse(data);
    }).catch(err => console.log(err));

    console.log("responses",response);
    
    return response;
}

    handleChange= (event) => {
        this.setState({  estadoCidade: [] });
        for(var key in this.state.cidade.estados){
            if(this.state.cidade.estados[key].sigla == event.target.value){
                let city =  this.state.cidade.estados[key].cidades;
                this.setState({ estadoCidade: city });
                console.log(city);
            }
        }
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value},
          () => { this.validateField(name, value) });
    }

    handleCheckbox = (e) => {
      const name = e.target.name;
      const value = e.target.checked;
      this.setState({[name]: value},
                    () => { this.validateField(name, value) });
    
    
                  }


    handleUserInput = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if(name=='ouvidoria_telefone'){
          value = value.replace(/[^0-9]+/g, '')
        }


        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
      
      
                    }
    
      validateField(fieldName, value) {
        let fieldValidationErrors=this.state.formErrors;
        let emailValid=this.state.emailValid;
        let isFieldValid;
        console.log('valor',fieldName,value,value.length)
        switch(fieldName) {



          case 'ouvidoria_email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors[fieldName] = emailValid ? '' : 'Preencha corretamente seu email';
            this.setState({emailValid:emailValid ? true : false});

            break;


           case 'ouvidoria_email2':
            emailValid = value==this.state.ouvidoria_email;
            fieldValidationErrors[fieldName] = emailValid ? '' : 'Confirme corretamente seu email';
            

            break;
          case 'ouvidoria_complemento':
            fieldValidationErrors[fieldName] = '';
            
            break;
            case 'ouvidoria_aceito':
              isFieldValid = value== true;
              fieldValidationErrors[fieldName] = isFieldValid ? '': ' É necessário aceitar os termos para continuar';
            break;
            case 'ouvidoria_demanda':
              isFieldValid = value.length >= 1;
              fieldValidationErrors[fieldName] = isFieldValid ? '': ' Campo obrigatório';

             case 'ouvidoria_telefone':
              isFieldValid = value.length >= 10;
              fieldValidationErrors[fieldName] = isFieldValid ? '': ' Preencha corretamente';
             
            
            break;
          default:
            isFieldValid = value.length >= 2;
            fieldValidationErrors[fieldName] = isFieldValid ? '': ' Campo obrigatório';
            break;
        }
        this.setState({formErrors: fieldValidationErrors
                        
                      });

                    
      }
    
      validateForm() {
        
        let errors = 0;
        for(var key in this.state.formErrors){
          
          if(this.state.formErrors[key].length > 0){
            errors++;
          }
         

        }
        console.log(this.state.formErrors);
        if(errors==0){
          this.setState({hasErrors:false})
          return true;
        }else{
          this.setState({hasErrors:true})
        }
        return false;
      }
      
      handleSubmit = async (e) => {
        e.preventDefault();

        if(!this.state.formData.captcha) {
          console.log('Você deve habilitar o CAPTCHA antes de utilizar o form.');
      }

        if(this.validateForm()){
          this.setState({showOverlay:true});
          let dataContent = {
            ouvidoria_nome: this.state.ouvidoria_nome,
            ouvidoria_rua: this.state.ouvidoria_rua,
            ouvidoria_complemento:this.state.ouvidoria_complemento ,
            ouvidoria_numero: this.state.ouvidoria_numero,
            ouvidoria_bairro: this.state.ouvidoria_bairro,
            ouvidoria_cidade: this.state.ouvidoria_cidade,
            ouvidoria_estado: this.state.ouvidoria_estado,
            ouvidoria_cep:this.state.ouvidoria_cep,
            ouvidoria_ddd:  this.state.ouvidoria_telefone.slice(0, 2),
            ouvidoria_telefone: this.state.ouvidoria_telefone.slice(2),
            ouvidoria_email: this.state.ouvidoria_email,
            ouvidoria_demanda: this.state.ouvidoria_demanda
          }
          var ev = await this.sendData(dataContent);
          console.log("EV",ev,ev[0].retorno);
          
          if(ev){
            var encEv = encodeURIComponent(CryptoAES.encrypt(ev[0].retorno, 'alergsSecretU2FsdGVkX18U7hLByAo9FEL5a3JGxRD0votBVxaatps'));
          console.log("cryp",encEv.toString());
            let dataEmail = {
              ouvidoria_email: this.state.ouvidoria_email,
              ouvidoria_token: encEv.toString()
            }

            console.log ("pronto para enviar");
            var emailEnviado = await this.sendEmail(dataEmail);
            if(emailEnviado){
              this.setState({overlayMessage:"Após o recebimento da sua demanda, será encaminhada uma mensagem automática para o endereço de e-mail informado, solicitando sua confirmação.<br><br>A confirmação será aguardada por quarenta e oito (48) horas e SOMENTE será ingressada no sistema caso ela seja confirmada.<br><br> Ao ter seu prazo expirado, a demanda será cancelada. "});
            }
          }

        }
        
        this.setState({returnErrors:this.state.formErrors});
        console.log("erros",this.state.returnErrors);
       
      }
    
      errorClass(error) {
        if(error){
          return(error.length === 0 ? '' : 'has-error');
        }
       return '';
      }


    componentWillMount(){
         let self= this;          
         axios.get(`${window.location.origin}/session/token`)
         .then(function (response){
           const csrf_token = response.data;
           self.setState({'csrfToken': csrf_token});
         })
         .catch(function (error){
           console.log(error);
         });
       }
    componentDidMount = async () => {
      //  await this.setContent();
    }
    


    render() {
     
        let showError;
        if(this.state.hasErrors){
          showError=<p className='has-error'>Campo obrigatório não preenchido</p>;
        }

        return (
                  <div className="ouvidoriaContent">
                    <div className="overlay" style={this.state.showOverlay ? {} : { display: 'none' }}><div className="overlay-content"><div dangerouslySetInnerHTML={{ __html: this.state.overlayMessage }} /></div></div>
                        <form id="ouvidoriaForm" onSubmit={this.handleSubmit}  style={this.state.showOverlay ? {opacity: .1} : {  }}>
                            <div className="row">
                               
                                <div className="col-sm-12 mb-2">
                                <input type="text" className={`form-control p-4 ${this.errorClass(this.state.returnErrors.ouvidoria_nome)} `} name="ouvidoria_nome" placeholder="Nome*"
                                value={this.state.ouvidoria_nome}
                                onChange={this.handleUserInput} 
                                
                                />
                                </div>


                                <div className="col-sm-6 mb-2">
                                <input type="text" className={`form-control p-4 ${this.errorClass(this.state.returnErrors.ouvidoria_rua)} `} name="ouvidoria_rua" placeholder="Rua*"
                                value={this.state.ouvidoria_rua}
                                onChange={this.handleUserInput} />
                                </div>
                                <div className="col-sm-6 mb-2">
                                <input type="text" className={`form-control p-4 ${this.errorClass(this.state.returnErrors.ouvidoria_numero)} `} name="ouvidoria_numero" placeholder="Número*"
                                 value={this.state.ouvidoria_numero}
                                 onChange={this.handleUserInput}
                                />
                                </div>
                               
                                <div className="col-sm-6 mb-2">
                                <input type="text" className="form-control p-4 " placeholder="Complemento" name="ouvidoria_complemento"
                                 value={this.state.ouvidoria_complemento}
                                 onChange={this.handleUserInput}/>
                                </div>
                                <div className="col-sm-6 mb-2">
                                <input type="text" className={`form-control p-4 ${this.errorClass(this.state.returnErrors.ouvidoria_bairro)} `} name="ouvidoria_bairro" placeholder="Bairro*"
                                 value={this.state.ouvidoria_bairro}
                                 onChange={this.handleUserInput}
                                />
                                </div>

                                <div className="col-sm-6 mb-2">
                                <select name="ouvidoria_estado" className={`form-control p-4 ${this.errorClass(this.state.returnErrors.ouvidoria_estado)} `} onChange={this.handleChange} value={this.state.ouvidoria_estado}>
                                    <option>Estado</option>
                                    {Object.keys(this.state.cidade.estados).map((estado,i) => (

                                    <option value={this.state.cidade.estados[estado].sigla}>{this.state.cidade.estados[estado].nome}</option>
                                    ))}

                                </select>
                                </div>

                                <div className="col-sm-6 mb-2"  >
                                {this.state.estadoCidade.length > 0 ?
                                <select name="ouvidoria_cidade" className={`form-control p-4 ${this.errorClass(this.state.returnErrors.ouvidoria_cidade)} `}  value={this.state.ouvidoria_cidade}
                                onChange={this.handleUserInput}>
                                    <option>Cidade</option>
                                   
                          { this.state.estadoCidade.map((cidade, i) => (
                                
                            <option value={cidade}>{cidade}</option>

                           
                        )
                        )}
                         </select>
                        :
                        <select name="ouvidoria_cidade" className={`form-control p-4 ${this.errorClass(this.state.returnErrors.ouvidoria_cidade)} `} disabled="disabled" ><option>Cidade</option></select>
                       
                               
                            }
                                </div>

                                <div className="col-sm-6 mb-2">
                                <InputMask mask="99999-999" type="text" className={`form-control p-4 ${this.errorClass(this.state.returnErrors.ouvidoria_cep)} `} name="ouvidoria_cep" placeholder="CEP*"
                                 value={this.state.ouvidoria_cep}
                                 onChange={this.handleUserInput}
                                />
                                </div>
                                <div className="col-sm-6 mb-2">
                                <InputMask type="text" mask={this.state.ouvidoria_telefone.length  <= 10 ? '(99) 9999-9999?' : '(99) 99999-9999'} formatChars={{ 9: '[0-9]', '?': '[0-9 ]' }} className={`form-control p-4 ${this.errorClass(this.state.returnErrors.ouvidoria_telefone)} `} name="ouvidoria_telefone" placeholder="Telefone*"
                                 value={this.state.ouvidoria_telefone}
                                 onChange={this.handleUserInput}
                                />
                                </div>

                                <div className="col-sm-6 mb-2">
                                <input type="email" className={`form-control p-4 ${this.errorClass(this.state.returnErrors.ouvidoria_email)} `} name="ouvidoria_email" placeholder="Email*"
                                 value={this.state.ouvidoria_email}
                                 onChange={this.handleUserInput}
                                />
                                </div>
                                <div className="col-sm-6 mb-2">
                                <input type="email2" className={`form-control p-4 ${this.errorClass(this.state.returnErrors.ouvidoria_email2)} `} name="ouvidoria_email2" placeholder="Confirmar Email*"
                                value={this.state.ouvidoria_email2}
                                 onChange={this.handleUserInput}/>
                                </div>

                                <div className="col-sm-12 mb-2">
                                <textarea className={`form-control p-4 ${this.errorClass(this.state.returnErrors.ouvidoria_demanda)} `} name="ouvidoria_demanda" placeholder="Demanda*"
                                value={this.state.ouvidoria_demanda}
                                onChange={this.handleUserInput}
                                ></textarea>
                                </div>
                                <div className="col-sm-8 mb-4"> {showError}
                                <input type="checkbox" name="ouvidoria_aceito" name="ouvidoria_aceito"  className={`checkbox ${this.errorClass(this.state.returnErrors.ouvidoria_aceito)} `} value={this.state.ouvidoria_aceito}
                                onChange={this.handleCheckbox}/> <span className="texto-aceito">Aceito os Termos de Uso e Política de Privacidade da Assembleia Legislativa do Rio Grande do Sul.</span> 
                                
                               
                                
                                </div>
                                <div className="col-sm-4 mb-4"></div> 
                                <div className="col-sm-12 mb-4">
                                    <button className="button enviar" name="ouvidoria-send">Enviar</button>

                                    {this.state.captcha.enable && (
                    <GoogleReCaptcha
                        onVerify={token => {
                            this.setState({ formData: {
                                ...this.state.formData,
                                captcha: token
                            } })
                        }}
                    />)}   
                                </div>
                            </div>
                            </form>
                            </div>
        );
    }
}