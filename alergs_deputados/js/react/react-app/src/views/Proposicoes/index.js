import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import { 
    listaProposicaoCompleto,
    obtemProposicaoCompleto,
    listaSituacaoProposicao,
	listarDestaqueDeputados
} from '../../services/services';
import CardBanner from "../../components/CardBanner";
import FilteredList from "../../components/FilteredList";
import { EmptyMessage } from '../common.ts';

const Proposicoes = ({
    idDeputado, 
    id
}) => {
    const [deputado, setDeputado] = useState(null);
    const [proposicoes, setProposicoes] = useState(null);
    const [emptyMsg, setEmptyMsg] = useState('Nenhum resultado encontrado');

    const fetchObtemProposicaoCompleto = async (siglaTipoProposicao, nroProposicao, anoProposicao) => {
        const response = await obtemProposicaoCompleto(siglaTipoProposicao, nroProposicao, anoProposicao).then(data => {
            return JSON.parse(data).lista[0]
        }).catch(err => console.log(err));   

        return response;
    }

    const fetchListaSituacaoProposicao = async (siglaTipoProposicao, nroProposicao, anoProposicao) => {
        const response = await listaSituacaoProposicao(siglaTipoProposicao, nroProposicao, anoProposicao).then(data => {
            return JSON.parse(data).lista          
        }).catch(err => console.log(err)); 

        return response;
    }    

    const fetchListaProposicaoCompleto = async (nomeProponente) => {
        const response = await listaProposicaoCompleto(nomeProponente).then(data => {
            return JSON.parse(data).lista
        }).catch(err => console.log(err)); 

        return response;
    }      
    
    const renderProponenteWithNumbers = (proponente, deps) => {
        if(deps) return proponente.replace(deps[0], `+ ${deps[0]} Dep(s)`)
        return proponente;
    }       

    const fetchData = async () => {
        const response = await listarDestaqueDeputados().then(res => {
            return JSON.parse(res).lista;
        }).catch(err => console.log(err))

        return response;
    }         

    useEffect(() => {
		fetchData().then(data => {
            if(data) setDeputado(data.find(item => item.idDeputado === parseInt(idDeputado)));
		}).catch(err => console.log(err))          
    }, []); 

    useEffect(() => {
      if(deputado) {
        let proposicoes = [];
        
        fetchListaProposicaoCompleto(deputado.nomeDeputado).then(data => {
            if(data) {
                setEmptyMsg('Carregando...');

                let dataLength = data.length;
            
                data.forEach(async function(prop) {
                    fetchObtemProposicaoCompleto(prop.siglaTipoProposicao, prop.nroProposicao, prop.anoProposicao).then(data => {
                        fetchListaSituacaoProposicao(prop.siglaTipoProposicao, prop.nroProposicao, prop.anoProposicao).then(s => {
                            proposicoes.push({
                                ...prop, 
                                ...data, 
                                proponente: renderProponenteWithNumbers(data.proponente, data.proponente.match(/(\d+)/)),
                                situacao: `${s[s.length - 1].siglaSituacao} em ${s[s.length - 1].dtSituacao}`
                            });

                            if(proposicoes.length === dataLength) setProposicoes(proposicoes.sort((a, b) => a.anoProposicao > b.anoProposicao ? -1 : 1 ))
                        }).catch(err => console.log(err));                     
                    }).catch(err => console.log(err)); 
                });                 
            } else {
                setEmptyMsg('Nenhum resultado encontrado.')
            }
        })    
      }
    }, [deputado]);     

    return (
        <>
            {/* Banner */}
            {deputado && (<CardBanner data={deputado} />)}
            {/* Proposições */}
            {proposicoes ? <FilteredList 
                title="Proposições"
                data={proposicoes}
                listConfig={[
                    {
                        label: 'Proposição',
                        contentId: 'proposicao',
                        alignText: 'center',
                        redirectBaseUrl: 'http://www.al.rs.gov.br/legislativo/ExibeProposicao.aspx?SiglaTipo=&NroProposicao=&AnoProposicao=&Origem=',
                        classes: '',
                        responsive: {
                            xs: '',
                            md: 3
                        }
                    },{
                        label: 'Proponente',
                        contentId: 'proponente',
                        alignText: 'center',
                        redirectBaseUrl: 'http://www.al.rs.gov.br/legislativo/ExibeProposicao.aspx?SiglaTipo=&NroProposicao=&AnoProposicao=&Origem=',
                        classes: '',
                        responsive: {
                            xs: '',
                            md: 3
                        }
                    },{
                        label: 'Situação',
                        contentId: 'descricao',
                        alignText: 'center',
                        redirectBaseUrl: 'http://www.al.rs.gov.br/legislativo/ExibeProposicao.aspx?SiglaTipo=&NroProposicao=&AnoProposicao=&Origem=',
                        classes: '',
                        responsive: {
                            xs: '',
                            md: 3
                        }
                    },{
                        label: 'Tramitação',
                        contentId: 'siglaLocal',
                        alignText: 'center',
                        redirectBaseUrl: 'http://www.al.rs.gov.br/legislativo/ExibeProposicao.aspx?SiglaTipo=&NroProposicao=&AnoProposicao=&Origem=',
                        classes: '',
                        responsive: {
                            xs: '',
                            md: 3
                        }
                    }
                ]}   
            /> : <EmptyMessage>{emptyMsg}</EmptyMessage>}                               
        </>
    );
};
 
export default Proposicoes;