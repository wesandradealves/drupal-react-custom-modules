import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import Form from "../Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { 
    Title,
    Newsletter 
} from './styles.ts';
import { 
    incluirCadastroNewsletter,
    consultarEmailNewsletter,
    excluirCadastroNewsletter 
} from '../../services/services';

const NewsletterComponent = ({...props}) => {
    const [isLoading, setLoading] = useState(false);
    const [msg, setMessage] = useState(null);

    const ExcluirCadastroNewsletter = async (email) => {
        const response = await excluirCadastroNewsletter(email).then(data => {
            return JSON.parse(data)
        }).catch(err => console.log(err)); 

        return response;
    }    

    const IncluirCadastroNewsletter = async (email) => {
        const response = await incluirCadastroNewsletter(email).then(data => {
            return JSON.parse(data)
        }).catch(err => console.log(err)); 

        return response;
    }    
    
    const ConsultarCadastroNewsletter = async (email) => {
        const response = await consultarEmailNewsletter(email).then(data => {
            return JSON.parse(data).lista
        }).catch(err => console.log(err)); 

        return response;
    }        

    const onSubmit = async (obj) => {
        try{
            let response = await ConsultarCadastroNewsletter(obj.email);
            setLoading(true)

            if(response) {
                if(obj.accept == 'Descadastrar') {
                    let response = await ExcluirCadastroNewsletter(obj.email);
                    if(response && response.situacaoExclusao) {
                        setMessage(response.situacaoExclusao)
                    }
                }
            } else {
                setMessage('E-mail não existe na nossa base de dados ou ocorreu algum erro.')
            }   
        } catch(e){
            console.log(e);
        } finally {
            setLoading(false)
        }        
	} 

    return (
        <Newsletter>
            <div class="container">
                <Row>
                    <Col xs={12} md={4}>
                        <Title>Receba nossa Newsletter</Title>
                    </Col>
                    <Col xs={12} md={8}>
                        <Form 
                            isLoading={isLoading}
                            onSubmit={onSubmit}
                            msg={msg}
                            sendRow={
                                {
                                    label: "Enviar",
                                    width: 4
                                }
                            } 
                            formData={[
                            {
                                width: 5,
                                id: 'email',
                                placeholder: 'E-mail *',
                                type: 'email',
                                required: true
                            }
                            // ,{
                            //     width: 2,
                            //     placeholder: 'Cadastrar',
                            //     value: 'Cadastrar',
                            //     id: 'accept',
                            //     type: 'radio',
                            //     required: true
                            // }
                            ,{
                                width: 3,
                                placeholder: 'Descadastrar',
                                value: 'Descadastrar',
                                id: 'accept',
                                type: 'radio',
                                required: true
                            }
                        ]} />
                    </Col>                        
                </Row>
            </div>
        </Newsletter>
    );
};
 
export default NewsletterComponent;