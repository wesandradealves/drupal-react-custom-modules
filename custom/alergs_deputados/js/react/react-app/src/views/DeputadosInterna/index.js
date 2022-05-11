import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import CardBanner from "../../components/CardBanner";
import OwlCarousel from 'react-owl-carousel-autoheight';
import Calendar from 'react-calendar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    Button,
    SectionTitle,
    CarrouselItem,
    SectionHeader,
    SectionHeaderText,
    Agenda
} from './styles.ts';
import './styles.scss';
import { 
    listaSituacaoProposicao,
    listarDestaqueDeputados, 
    listarComissoesDeputado,
    listarPronunciamentosDeputado,
    listarDadosAgendaEventos,
    listaProposicaoCompleto,
    obtemProposicaoCompleto
} from '../../services/services';

const DeputadosInterna = ({
    idDeputado
}) => {
    const [deputado, setDeputado] = useState(null);
    const [proposicoes, setProposicoes] = useState(null);
    const [comissoes, setComissoes] = useState(null);
    const [pronunciamentos, setPronunciamentos] = useState(null);
    const [proposicoesCustomHtml, setProposicoesCustomHtml] = useState(null);
    const [agenda, setAgenda] = useState(null);
    const [date, setDate] = useState({
        raw: new Date(),
        formatted: ((new Date().getDate() )) + "/" + ((new Date().getMonth() + 1)) + "/" + new Date().getFullYear()
    })

    const fetchListaSituacaoProposicao = async (siglaTipoProposicao, nroProposicao, anoProposicao) => {
        const response = await listaSituacaoProposicao(siglaTipoProposicao, nroProposicao, anoProposicao).then(data => {
            return JSON.parse(data).lista          
        }).catch(err => console.log(err)); 

        return response;
    }        

	const fetchComissoes = async (idProponente, idDeputado) => {
        const response = await listarComissoesDeputado(idProponente, idDeputado).then(data => {
            return JSON.parse(data).lista;
        }).catch(err => console.log(err)); 

        return response;
	}        

	const fetchPronunciamentos = async (Ano, idDeputado) => {
        const response = await listarPronunciamentosDeputado(Ano, idDeputado).then(data => {
            return JSON.parse(data).lista
        }).catch(err => console.log(err)); 

        return response;
	} 

    const fetchObtemProposicaoCompleto = async (siglaTipoProposicao, nroProposicao, anoProposicao) => {
        const response = await obtemProposicaoCompleto(siglaTipoProposicao, nroProposicao, anoProposicao).then(data => {
            return JSON.parse(data).lista[0]
        }).catch(err => console.log(err)); 

        return response;
    }

	const fetchListaProposicaoCompleto = async (nomeProponente) => {
        const response = await listaProposicaoCompleto(nomeProponente).then(data => {
            return JSON.parse(data).lista
        }).catch(err => console.log(err)); 

        return response;
	}      
    
    const fetchAgendaEventos = async (dataAgenda) => {
        const response = await listarDadosAgendaEventos(dataAgenda).then(data => {
            return JSON.parse(data).lista
        }).catch(err => console.log(err)); 

        return response;
	}   

    const fetchData = async () => {
      const response = await listarDestaqueDeputados().then(res => {
          return JSON.parse(res).lista;
      }).catch(err => console.log(err))

      return response;
    }    

    const proposicaoItemRender = () => {
        var html = '';

        if(proposicoes) {
            proposicoes.sort((a, b) => a.anoProposicao > b.anoProposicao ? -1 : 1 ).map((item, index) => {
                if (((index + 1) % 3) === 1) html+=`<div class="item">
                <div 
                    class="proposicoes-single--item"
                    data-siglaTipoProposicao="${item.siglaTipoProposicao}"
                    data-nroProposicao="${item.nroProposicao}"
                    data-anoProposicao="${item.anoProposicao}">
                        <div class="row"><div class="col-xs-12 col-md-4">${item.siglaTipoProposicao} ${item.nroProposicao} ${item.anoProposicao}</div><div class="col-xs-12 col-md-8">${item.descricao}</div></div>
                    </div>`
                
                else if (((index + 1) % 3) === 2) html+=`<div 
                    class="proposicoes-single--item"
                    data-siglaTipoProposicao="${item.siglaTipoProposicao}"
                    data-nroProposicao="${item.nroProposicao}"
                    data-anoProposicao="${item.anoProposicao}">
                        <div class="row"><div class="col-xs-12 col-md-4">${item.siglaTipoProposicao} ${item.nroProposicao} ${item.anoProposicao}</div><div class="col-xs-12 col-md-8">${item.descricao}</div></div>
                    </div>`

                else if (((index + 1) % 3) === 0) html+=`<div 
                    class="proposicoes-single--item"
                    data-siglaTipoProposicao="${item.siglaTipoProposicao}"
                    data-nroProposicao="${item.nroProposicao}"
                    data-anoProposicao="${item.anoProposicao}">
                        <div class="row"><div class="col-xs-12 col-md-4">${item.siglaTipoProposicao} ${item.nroProposicao} ${item.anoProposicao}</div><div class="col-xs-12 col-md-8">${item.descricao}</div></div>
                    </div>
                </div>`

                if(index == (proposicoes.length - 1)) setProposicoesCustomHtml(html)
            })               
        }     
    }        

    const createHtml = (str) => {
        return {__html: str};
    }      

    useEffect(() => {
		fetchData().then(data => {
            if(data) setDeputado(data.find(item => item.idDeputado === parseInt(idDeputado)));
		}).catch(err => console.log(err))          
    }, []); 

    useEffect(() => {
        if(deputado) {
            fetchListaProposicaoCompleto(deputado.nomeDeputado).then(data => {
                let proposicoes = [];
                
                data.forEach(async function(prop, i) {
                    if(i<=11) {
                        fetchObtemProposicaoCompleto(prop.siglaTipoProposicao, prop.nroProposicao, prop.anoProposicao).then(data => {
                                proposicoes.push({
                                    ...prop, 
                                    ...data
                                });

                                if(proposicoes.length === 12) setProposicoes(proposicoes.sort((a, b) => a.anoProposicao > b.anoProposicao ? -1 : 1 ))             
                        }).catch(err => console.log(err));                         
                    }
                });       
            }), 
            fetchComissoes(deputado.idDeputado, null).then(response => {
                setComissoes(response)
            }).catch(err => console.log(err)), 
            fetchPronunciamentos(null, deputado.idDeputado).then(response => {
                setPronunciamentos(response)
            }).catch(err => console.log(err))            
        }
    }, [deputado]);     

    useEffect(() => {
        if(proposicoes) proposicaoItemRender()
    }, [proposicoes]);    

    useEffect(() => {
        if(proposicoesCustomHtml) {
            if(document.getElementsByClassName("proposicoes-single--item") && document.getElementsByClassName("proposicoes-single--item").length) {
                Array.from(document.getElementsByClassName("proposicoes-single--item")).forEach((element) => {
                    element.addEventListener("click", function(){
                        window.open(
                            `http://www.al.rs.gov.br/legislativo/ExibeProposicao.aspx?SiglaTipo=${this.dataset.siglatipoproposicao}&NroProposicao=${this.dataset.nroproposicao}&AnoProposicao=${this.dataset.anoproposicao}&Origem=`,
                            '_blank' 
                        );  
                    }, false);
                });  
            }
        }
    }, [proposicoesCustomHtml]);    

    useEffect(() => {
        fetchAgendaEventos(date.formatted).then(response => {
            setAgenda(response) 
        }).catch(err => console.log(err));       
    }, [date]);     

    useEffect(() => {
        const onClick = (e) => {
          if(Array.from(e.target.classList).includes('react-calendar__month-view__days__day') || e.target.tagName == 'ABBR') document.getElementById('agenda').scrollIntoView();
        };

        document.body.addEventListener("click", onClick);
    
        return () => {
          document.body.removeEventListener("click", onClick);
        };
    }, []);

    return (
        <>
            {/* Banner */}
            {deputado && (<CardBanner data={deputado} />)}

            {/* Comissões e Proposições */}
            {(comissoes || proposicoes) && (<section id="proposicoes" className="--blue --content">
                <div className="container">
                    <Row className="proposicoes-column-wrapper">
                        {(proposicoes && proposicoesCustomHtml) && (<Col className="proposicoes-column" xs={12} md={6}>
                            <SectionTitle>Proposições 
                                <Button className="--green --see-all" href={`/proposicoes/${deputado.idDeputado}`}>Lista completa</Button>                         
                            </SectionTitle>
                            {proposicoesCustomHtml && (
                                <OwlCarousel 
                                autoHeight={false} 
                                className='owl-theme'  
                                dangerouslySetInnerHTML={createHtml(proposicoesCustomHtml)}
                                margin={0} items={1} dots={false} nav></OwlCarousel>
                            )}
                        </Col>)}
                        {comissoes && (<Col className="comissoes-column" xs={12} md={6}>
                            <SectionTitle className="--flex">Comissões 
                                <Button className="--green --see-all" href={`/comissoes/${deputado.idDeputado}`}>Lista Completa</Button>                          
                            </SectionTitle>
                            <OwlCarousel autoHeight={true} className='owl-theme'  loop margin={10} items={1} dots={false} nav>
                                {comissoes.map((item, i) => (
                                    <CarrouselItem className='item owl-height'>
                                        <h4>
                                            <small><i class="fas fa-file-alt"></i> {item.tipoComissao}</small>
                                            {item.nomeComissao}
                                        </h4>
                                        <Button className="--blue" href={`//www.al.rs.gov.br/legislativo/Comissoes.aspx?IdComissao=${item.idComissao}`}>Saiba Mais</Button>
                                    </CarrouselItem>
                                ))}                                  
                            </OwlCarousel>                                 
                        </Col> )}                               
                    </Row>                  
                </div>
            </section>)}      

            {/* Pronunciamentos */}
            {pronunciamentos && (<section id="pronunciamentos" className="--content">
                <div className="container">
                    <SectionHeader>
                        <SectionTitle>Pronunciamentos</SectionTitle>
                        <SectionHeaderText>Acompanhe os últimos pronunciamentos</SectionHeaderText>
                    </SectionHeader>
                    <OwlCarousel responsive = {{
                        0:{
                            items:1
                        },
                        800:{
                            items:2
                        },
                        1000:{
                            items:3
                        }
                    }} autoHeight={true} className='owl-theme --same-height'  loop margin={10} items={3} dots={false} nav={true}>
                        {pronunciamentos.map((pronunciamento, i) => (
                            <CarrouselItem stretch={true} compact={true} className='item owl-height'>
                                <h4>
                                    <small><i class="fas fa-file-alt"></i> {pronunciamento.dataPronunciamento.replaceAll('-', '/')}</small>
                                    <span dangerouslySetInnerHTML={createHtml(`${ pronunciamento.resumo.length >= 120 ? `${pronunciamento.resumo.substr(0, 120)}...` : pronunciamento.resumo }`)}></span>
                                </h4>
                                <Button className="--blue --see-all" href={`/pronunciamentos/${deputado.idDeputado}/${pronunciamento.idPronunciamento}`}>Leia Mais</Button>
                            </CarrouselItem>
                        ))}                                  
                    </OwlCarousel>                          
                </div>
            </section>)}        

            <section id="agenda" className="--content">
                <div className="container">
                    <SectionHeader>
                        <SectionTitle>Agenda</SectionTitle>
                        <SectionHeaderText>Confira a agenda das comissões que o(a) Parlamentar participa</SectionHeaderText>
                    </SectionHeader>
                    <Row>
                        <Col xs={12} md={6}>
                            <Calendar
                                locale='pt-BR'
                                onChange={(e) => {
                                    setDate({
                                        raw: e,
                                        formatted: ((e.getDate() )) + "/" + ((e.getMonth() + 1)) + "/" + e.getFullYear()
                                    })
                                }}
                                value={date.raw}
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <Agenda>
                                {agenda ? agenda.map((agenda, i) => (<CarrouselItem compact={true} className='item'>
                                    <h4>
                                        <small><i class="fas fa-file-alt"></i> {agenda.dataInicio.split(' ')[0]}</small>
                                        {agenda.nomeEvento}
                                        <small><i class="far fa-clock"></i> {agenda.horaInicio} às {agenda.horaFim}</small>
                                    </h4>
                                </CarrouselItem> )) : <CarrouselItem compact={true} className='item'>Não há agenda disponível.</CarrouselItem>}
                            </Agenda>
                        </Col>                      
                    </Row>                          
                </div>
            </section>               
        </>
    );
};
 
export default DeputadosInterna;