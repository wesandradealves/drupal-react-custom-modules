import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Container, Title, Form, FormGroup, Label, Input, Button, DateField } from './styles.ts';
import { 
	listarTransmissoesTV,
    pesquisarTransmissoesTVAL
} from '../../services/services';
import InputMask from "react-input-mask";
const SearchBar = ({
    onRequest
}) => {
    const _ = require('lodash');
    const [data, setData] = useState(null);

    const translateCat = (estado) => {
        switch (estado) {
            case 1:
                return 'Transmissões Programadas';
                break;
            case 2:
                return 'Transmissões Encerradas';
                break;
            default:
                return false;
                break;
        }
    }     

    const fetchPesquisarTransmissoesTVAL = async (assunto, dataInicial, dataFinal) => {
        const response = await pesquisarTransmissoesTVAL(assunto, dataInicial, dataFinal).then(res => {
            return JSON.parse(res).lista;
        }).catch(err => console.log(err))
  
        return response;
    }     
    
    const formatDate = (date) => {
        return `${date.split('-')[2]}/${date.split('-')[1]}/${date.split('-')[0]}`;
    }    

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try{
            var obj = {};
            var formData = new FormData(e.target);
            for (var key of formData.keys()) {
                obj[key] = formData.get(key);
            }
            let response = await fetchPesquisarTransmissoesTVAL(obj.assunto, obj.dataInicial, obj.dataFinal);
            if(response) {
                let obj = _.groupBy(response.map(
                    item => ({
                        ...item,
                        categoria: translateCat(item.estado)
                    })
                ), 'categoria');   
                
                setData(obj)
            }
        } catch(e){
            console.log(e);
        }
    }       

    useEffect(() => {
        if(data) onRequest(data);
    }, [data]);      

    useEffect(() => {
        const el = document.getElementsByClassName('date');

        for (let index = 0; index < el.length; index++) {
            const element = el[index];
            element.addEventListener('input', function (e) {
                var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
                e.target.value = !x[2] ? x[1] : '' + x[1] + '/' + x[2] + (x[3] ? '/' + x[3] : '');
            });  
        }
    }, []);          

    return (<>
        <Container>
            <Title>Pesquisa de Transmissões</Title>
            <Form name="busca-transmissao" id="busca-transmissao" onSubmit={(e) => { onSubmit(e); }}>
                <FormGroup flex="180px">
                    <Label>Data Inicial</Label>
                    <DateField for="dataInicial" className="date-field">
                        <Input placeholder="-" name="dataInicial" type="text" className="date" />
                    </DateField>                    
                </FormGroup>
                <FormGroup flex="180px">
                    <Label>Data Final</Label>
                    <DateField for="dataFinal" className="date-field">
                        <Input placeholder="-" name="dataFinal" type="text" className="date" />
                    </DateField>
                </FormGroup>     
                <FormGroup>
                    <Label>Assunto</Label>
                    <Input placeholder="-" name="assunto" type="text" />
                </FormGroup>   
                <FormGroup flex="150px">
                    <Button name="pesquisar">Pesquisar</Button>
                </FormGroup>                                                       
            </Form>
        </Container>
    </>);
};
 
export default SearchBar;