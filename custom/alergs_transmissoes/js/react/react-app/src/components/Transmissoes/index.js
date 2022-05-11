// import React from "react";

// import "./style.scss";

// import noticias from "../../assets/noticias.png";
// import deputados from "../../assets/deputados.png";
// import tval from "../../assets/tval.png";
// import artigos from "../../assets/artigos.png";
// import atualizar from "../../assets/atualizar.png";

// import TransmissoesContainer from "../TransmissoesContainer";

// export default class Transmissoes extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             transmissoes: [],
//             aovivo: [],
//             encerradas: [],
//             programadas: [],
//         }
//     }

//     componentDidMount = async () => {
//         await this.setContent();
//     }

//     async setContent() {
//         this.setState({ aovivo: [], programadas: [], encerradas: [] });

//         var aovivo = await this.getTrasmissoes("aovivo");
//         var programada = await this.getTrasmissoes("programada");
//         var encerrada = await this.getTrasmissoes("encerrada");

//         this.setState({ aovivo: aovivo, programadas: programada, encerradas: encerrada });
//     }

//     async getTrasmissoes(filtro) {
//         var requestData = {
//             statusTransmissao: filtro
//         }

//         var response = await fetch(
//             `${window.location.origin}:5000/getTrasmissoes`,
//             {
//                 method: 'POST',
//                 body: JSON.stringify(requestData),
//                 headers: { 'Content-Type': 'application/json' },
//             }
//         );

//         var data = await response.json();

//         return data.lista;
//     }


//     render() {
//         return (
//             <div className="transmissoesSection">
                // <div className="transmissoesMenu">
                //     <a
                //         className="filterButton"
                //         href="/tval#sintonise-block"
                //     >
                //         <img src={noticias} className="filterIcon" alt="logo" />
                //         <h1 className="filterLabel">
                //             Sintonize a TVAL
                //         </h1>
                //     </a>
                //     <a
                //         className="filterButton"
                //         href="/tval/programas"
                //     >
                //         <img src={deputados} className="filterIcon" alt="logo" />
                //         <h1 className="filterLabel">
                //             Programas
                //         </h1>
                //     </a>
                //     <a
                //         className="filterButton selectedFilter"
                //         href="/tval/transmissoes"
                //     >
                //         <img src={tval} className="filterIcon" alt="logo" />
                //         <h1 className="filterLabel">
                //             Trasmissões
                //         </h1>
                //     </a>
                //     <a
                //         className="filterButton"
                //         href="/tval#equipe-block"
                //     >
                //         <img src={artigos} className="filterIcon" alt="logo" />
                //         <h1 className="filterLabel">
                //             Equipe
                //         </h1>
                //     </a>
                // </div>
                // <div className="transmissoesHeader">
                //     <h1 className="title">Transmissões</h1>
                //     <h3 className="subtitle">Assista às transmissões ao vivo da TV AL</h3>
                // </div>

//                 <div className="refresh" onClick={() => this.setContent()}>
//                     <img src={atualizar} alt="calendario" className="icon" />
//                     <span>Atualizar </span>
//                 </div>

//                 <TransmissoesContainer title="Transmissões do dia" transmissoes={this.state.aovivo} />
//                 <TransmissoesContainer title="Transmissões programadas" transmissoes={this.state.programadas} />
//                 <TransmissoesContainer title="Transmissões encerradas" transmissoes={this.state.encerradas} />
//             </div>
//         );
//     }
// }

import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import './style.scss';
import { 
	listarTransmissoesTV
} from '../../services/services';
import moment from "moment";
import pin from "../../assets/pin.png";
import hora from "../../assets/hora.png";
import noticias from "../../assets/noticias.png";
import deputados from "../../assets/deputados.png";
import tval from "../../assets/tval.png";
import artigos from "../../assets/artigos.png";
import atualizar from "../../assets/atualizar.png";
import SearchBar from '../SearchBar';

const Transmissoes = () => {
    const _ = require('lodash');
    const [data, setData] = useState(null);
    const [customHtml, setCustomHtml] = useState(null);

    const buildHtml = (o) => {
        let html = '', counter;

        if(o) {
            for (let [key, object] of Object.entries(o)) {
                html += `<div id="lista-transmissoes" class="container"> <h3>${key}</h3> <ul>`;
                
                for (let [key, item] of Object.entries(object)) {
                    counter++;

                    html += `
                        <div data-id="${item.id}" class="cardTrasmissao">
                            <div class="tipoTrasmissao">
                                <h3>${item.tipo}</h3>
                            </div>
                            <h2 class="titulo">${item.subTipo}</h2>
                            <div class="infoRow">
                                <div class="labeledIcon">
                                    <img src=${hora} alt="calendario" class="icon"/>
                                    <span class="label">${moment(item.data).format('DD/MM/YYYY HH:mm')}</span>
                                </div>
                                <div class="labeledIcon">
                                    <img src=${pin} alt="icon" class="icon"/>
                                    <span class="label">${item.local}</span>
                                </div>
                            </div>
                            <a class="trasmissaoURL" href="/tval/transmissoes/${item.id}">${item.titulo}</a>
                        </div> 
                    `;
                }

                if(counter == o.length) counter = 0; html += '</ul></div>';
            }
        }

        return html;
    }         

    const createHtml = (str) => {
        return {__html: str};
    }         

    const onRequest = (req) => {
        if(req) setCustomHtml(buildHtml(req));
    }      

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
                    if(counter == categories.length) {
                        const fn = _.spread(_.union);

                        let obj = _.groupBy(fn(arr).map(
                            item => ({
                                ...item,
                                categoria: translateCat(item.estado)
                            })
                        ), 'categoria');
                        
                        setData(obj);
                    }
                }                
            } catch(e){
              console.log(e);
            }
        })(); 
    }, []); 

    useEffect(() => {
        if(data) setCustomHtml(buildHtml(data));
    }, [data]);     

    return (<>
        <section className="transmissoesSection" id="transmissoes-container">
            <div class="container">
                <div className="transmissoesMenu">
                    <a
                        className="filterButton"
                        href="/tval"
                    >
                        <img src={noticias} className="filterIcon" alt="logo" />
                        <h1 className="filterLabel">
                            Início
                        </h1>
                    </a>                    
                    <a
                        className="filterButton"
                        href="/tval#sintonise-block"
                    >
                        <img src={noticias} className="filterIcon" alt="logo" />
                        <h1 className="filterLabel">
                            Sintonize a TVAL
                        </h1>
                    </a>
                    <a
                        className="filterButton"
                        href="/tval/programas"
                    >
                        <img src={deputados} className="filterIcon" alt="logo" />
                        <h1 className="filterLabel">
                            Programas
                        </h1>
                    </a>
                    <a
                        className="filterButton selectedFilter"
                        href="/tval/transmissoes"
                    >
                        <img src={tval} className="filterIcon" alt="logo" />
                        <h1 className="filterLabel">
                            Trasmissões
                        </h1>
                    </a>
                    <a
                        className="filterButton"
                        href="/tval#equipe-block"
                    >
                        <img src={artigos} className="filterIcon" alt="logo" />
                        <h1 className="filterLabel">
                            Equipe
                        </h1>
                    </a>
                </div>

                {/* <div className="transmissoesHeader">
                    <h1 className="title">Transmissões</h1>
                    <h3 className="subtitle">Assista às transmissões ao vivo da TV AL</h3>
                </div> */}
            </div>

            {<SearchBar onRequest={onRequest} />}

            {data && customHtml && (
                <div id="transmissoes" dangerouslySetInnerHTML={createHtml(customHtml)} />
            )}            
        </section>
    </>);
};
 
export default Transmissoes;