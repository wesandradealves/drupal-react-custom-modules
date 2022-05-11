import React, { Component } from 'react';
import Slider from "react-slick";

import CardConsulta from "../../CardConsulta";

import finalizedConsultations from '../../../assets/consultas-finalizadas.png';
import allConsultationsImg from '../../../assets/todas-consultas-publicas.png';

import "./style.scss"
import "../../Carousel/slick.scss";
import "../../Carousel/slick-theme.scss";

export default class ConsultaWidget extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            activeConsultations: []
        }
    }

    componentDidMount() {
        this.getActiveConsultations();
    }

    getActiveConsultations = async () => {
        var consultations = await fetch(`${window.location.origin}:5000/getList?indSituacao=ATI`).then((res) => res.json()).catch((res) => console.log(res));

        this.setState({ activeConsultations: consultations.lista || [] });
    }

    render() {
        const { activeConsultations } = this.state;
        const settings = {
            arrows: false,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
        };
        const removeMargin = activeConsultations && activeConsultations.length === 0;
        const margin = removeMargin ? "" : "mt-3";

        return (
            <div id="consultaPublicaWidget">
                <div class="col-sm text-center pt-3 pb-3">
                    <h3 class="text-center font-weight-bold text-white">Consultas Públicas</h3>
                    <p class="bannerSubtitle text-white">Confira as Consultas Públicas em andamento na Assembleia Legislativa do Rio Grande do Sul e participe com sua opinião.</p>
                </div> 
                {activeConsultations && (<div className='consultaPublicaCarousel'>
                    <div className="container">
                        <Slider {...settings}>
                            {activeConsultations.map((consultation, index) => {
                                return (
                                    <CardConsulta registro={consultation} key={consultation.idConsultaPublica} isWidget />
                                );
                            })}   
                        </Slider>                        
                    </div>
                </div>)}
                <div className={`widgetCarouselMenuSection ${margin}`}>
                    <div class="menu-interno">
                        <div>
                            <a href={`${window.location.origin}/consultapublica?status=finalizadas`} target="_self" class="menu-item">
                                <button class="buttonSection buttonItemContainer" type='submit'>
                                    <img class="menu-icon" src={finalizedConsultations} alt="user-icon" />
                                    <h2 class="menu-caption">Consultas Públicas Finalizadas</h2>
                                </button>
                            </a>
                        </div>
                        <div>
                            <a href={`${window.location.origin}/consultapublica?status=todas`} target="_self" class="menu-item">
                                <button class="buttonSection buttonItemContainer" type='submit'>
                                    <img class="menu-icon" src={allConsultationsImg} alt="user-icon" />
                                    <h2 class="menu-caption">Todas Consultas Públicas</h2>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}