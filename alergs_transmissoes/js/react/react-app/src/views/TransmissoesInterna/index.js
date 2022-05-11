import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import './styles.scss';
import { 
	listarTransmissoesTV
} from '../../services/services';
import {
    PostFooterPrefix,
    DescricaoPrefix,
    Subtipo,
    Content,
    PostFooter,
    Column,
    PostHeader,
    Titulo,
    Tipo,
    Descricao,
    Iframe,
    Banner
} from './styles.ts';

const TransmissoesInterna = (props) => {
    const _ = require('lodash');
    const [data, setData] = useState(null);

    const fetchData = async (statusTransmissao) => {
        const response = await listarTransmissoesTV(statusTransmissao).then(res => {
            return JSON.parse(res).lista;
        }).catch(err => console.log(err))
  
        return response;
    }        

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
    
    const replaceUrl = (url) => {
        return url.replace('youtu.be', 'youtube.com/embed');
    }          
    
    const formatDate = (date) => {
        return date.split('-').reverse().join('/');
    }       


    useEffect(() => {
        let categories = [
            'aovivo',
            'programada',
            'encerrada'
        ];
        let arr = [];
        let counter = 0;

        (async () => {
            try{
                for (const category of categories) {
                    counter++;
                    let response = await fetchData(category);

                    if(response) arr.push(response);
                    if(counter == categories.length && props.id) {
                        const fn = _.spread(_.union);

                        setData(fn(arr).map(
                            item => ({
                                ...item,
                                categoria: translateCat(item.estado)
                            })
                        ).find(item => item.id === parseInt(props.id)))
                    }
                }                
            } catch(e){
              console.log(e);
            }
        })(); 
    }, []); 
  
    useEffect(() => {
        if(data) console.log(data)
    }, [data]); 

    return (
        <>
            {data && (
                <Content className={`single-post post-${props.id}`}>
                    <div class="container">
                        <PostHeader>
                            <Titulo>
                                <Tipo>{data.tipo}</Tipo>
                                {data.titulo}
                                <Subtipo>{data.subTipo}</Subtipo>
                            </Titulo>
                        </PostHeader>

                        {data.url && (<Banner>
                            <Iframe allowfullscreen muted autoplay controls={false} src={replaceUrl(data.url)} />
                        </Banner>)}

                        <Descricao>
                            <DescricaoPrefix>Descrição:</DescricaoPrefix>
                            {data.descricao}
                        </Descricao>

                        <PostFooter>
                            <Column>
                                <PostFooterPrefix>Postado em:</PostFooterPrefix>
                                <i class="fa fa-calendar" aria-hidden="true"></i> {`${formatDate(data.data.split(' ')[0])} ${data.data.split(' ')[1]}`}
                            </Column>
                            {data.local && (<Column>
                                <i class="fas fa-map-marker-alt"></i> {data.local}
                            </Column> )}                           
                        </PostFooter>                        
                    </div>
                </Content>
            )}
        </>
    );
};
 
export default TransmissoesInterna;