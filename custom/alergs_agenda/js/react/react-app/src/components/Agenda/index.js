import React, { useState,useEffect } from "react";
import { listarDadosAgendaEventos } from '../../services/services'
import { listarAgendaPresidencia } from '../../services/services'
import { listarAgendaReunioes } from '../../services/services'
import { listarAgendaHistoricoReunioes } from '../../services/services'


import "./style.scss";
import "./slick.scss";
import Calendar from 'react-calendar';
import './calendar.scss';

import CardDate from "../CardDate";
import EventsList from "../EventsList";

import moment from 'moment';
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick-theme.scss";

import BannerImg from '../../assets/cpBanner.jpg';

export default class Agenda extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            eventos: [],
            eventosWidget: [],
            comisWidget: [],
            presidencia: [],
            comissoes: [],
            allEvents: [],
            value: new Date(),
            today:new Date(),
            eventAttempts:0,
            selectedFilter: {'ftype':'all','fname':'Todos os Eventos'},
            eventosLoaded:false,
            filters : [
                        {'ftype':'all','fname':'Todos os Eventos'},
                        {'ftype':'presidencia','fname':'Presidência'},
                        {'ftype':'comissoes','fname':'Comissões Parlamentares'},
                        {'ftype':'eventos','fname':'Eventos da AL'}
                    ]
            
        }
        

    }

    fetchData = async (value) => {
        const response = await listarDadosAgendaEventos(value).then(data => {
            return JSON.parse(data).lista;
        }).catch(err => console.log(err));

        this.setState({ eventos: response });
        
        return response;
    }
    
    fetchDataEventoWidget = async (value) => {
        const response = await listarDadosAgendaEventos(moment(value).format('DD/MM/YYYY')).then(data => {
            return JSON.parse(data).lista;
        }).catch(err => console.log(err));
        
        this.setState({ eventosWidget: response });
        this.setState({ eventosLoaded: true });
        console.log(response,'WIDGET');
       console.log(this.state.eventosWidget,'evloades',this.state.eventAttempts,this.state.today);
       if(!response && this.state.eventAttempts < 3){
        this.setState({ eventAttempts: (this.state.eventAttempts+1) });
        this.setState({ today: moment(value).add(1, 'days') });
        this.fetchDataEventoWidget(moment(value).add(1, 'days'));
        }
    }

    fetchDataPres = async (value) => {
        const response = await listarAgendaPresidencia(value).then(data => {
            return JSON.parse(data).listarAgendaPresidencia;
        }).catch(err => console.log(err));

        this.setState({ presidencia: response });
        return response;
    }

    fetchDataComiss = async (value) => {
        const response = await listarAgendaReunioes(value).then(data => {
            return JSON.parse(data).lista;
        }).catch(err => console.log(err));
       
        this.setState({ comissoes: response });
        return response;
    }

    fetchDataComissWidget = async (value) => {
        let response = await listarAgendaReunioes(value).then(data => {
            return JSON.parse(data).lista;
        }).catch(err => console.log(err));
        if (response) {
            for (let i = 0; i < response.length; i++) {
                
                response[i].dataInicio = (response[i].dthInicioReuniao);
                response[i].eventType = "Comissões Parlamentares";
                response[i].nomeLocal = response[i].nomeLocal;
                response[i].nomeEvento = response[i].nomeComissao;
                response[i].horaInicio = response[i].horaInicioReuniao;
                
            }
        }
        this.setState({ comisWidget: response });
       
    }

    fetchDataComissHist = async (value) => {
        const response = await listarAgendaHistoricoReunioes(value).then(data => {
            return JSON.parse(data).lista;
        }).catch(err => console.log(err));
        
        this.setState({ comissoes: response });
        return response;
    }


    fetchAllData = async (value,filtr) => {
        let results = [];
        if(filtr=="all" || filtr == "eventos"){
            var ev = await this.fetchData(moment(value).format('DD/MM/YYYY'));
        }
       

        if(filtr=="all" || filtr == "comissoes"){
            var today = new Date();

            if(moment(value).isAfter(today)){
                var comis = await this.fetchDataComiss(moment(value).format('DD/MM/YYYY'));
            }else{
                var comis = await this.fetchDataComissHist(moment(value).format('DD/MM/YYYY'));
            }
           
        }
       

        if(filtr=="all" || filtr == "presidencia"){
            if(filtr =="presidencia"){
                var dataRange =[moment(value[0]).format('YYYY-MM-DD'),moment(value[1]).format('YYYY-MM-DD')];
                var pres = await this.fetchDataPres(dataRange); 
            }else{
                var pres = await this.fetchDataPres(moment(value).format('YYYY-MM-DD'));
            }

            
        }

        if (ev) {

            for (let i = 0; i < ev.length; i++) {
                
                ev[i].dataInicio = moment(this.formatDate(ev[i].dataInicio,"/")).format('DD/MM/YYYY');
                ev[i].eventType = "Agenda de Eventos";
                results.push(ev[i]);
            }
        }

        if (pres) {
            for (let i = 0; i < pres.length; i++) {
                
                pres[i].dataInicio = moment(pres[i].dataInicio).format('DD/MM/YYYY');
                pres[i].eventType = "Presidência";
                pres[i].nomeLocal = pres[i].localEvento;
                pres[i].horaInicio = pres[i].horaEvento;
                results.push(pres[i]);
            }
        }

        if (comis) {
            for (let i = 0; i < comis.length; i++) {
                
                comis[i].dataInicio = (comis[i].dthInicioReuniao);
                comis[i].eventType = "Comissões Parlamentares";
                comis[i].nomeLocal = comis[i].nomeLocal;
                comis[i].nomeEvento = comis[i].nomeComissao;
                comis[i].horaInicio = comis[i].horaInicioReuniao;
                results.push(comis[i]);
            }
        }

        


        var groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };
        this.setState({ allEvents: [] });
        if(results.length>0){
            results.sort((a, b) => a.dataInicio > b.dataInicio ? 1:-1);
            results =  groupBy(results, 'dataInicio');
           
            this.setState({ allEvents:results });
        }
        
       
        
    }
    formatDate(datePT,sep){
        var date = datePT.slice(0,11);
        var d  = date.split(sep)[0];
        var m  = date.split(sep)[1];
        var y  = date.split(sep)[2];
       
        return y.trim() + '-' + ("0"+m).slice(-2) + '-' + ("0"+d).slice(-2);
    }

    onClick = value => {
        console.log('DATA',value)
        this.setState({ value });
        
        this.fetchAllData(value,this.state.selectedFilter.ftype);

        if(document.getElementById('widget')) {
            document.getElementById('widget').scrollIntoView();
        }
    }

    changeFilter(filterName,filterType){
        let currentValue = this.state.value;
        if(this.state.selectedFilter.ftype=="presidencia" && filterType != "presidencia" && Array.isArray(this.state.value)){
            this.setState({value:this.state.value[0]})
            currentValue = this.state.value[0];
        }
        
        this.setState({selectedFilter:{'ftype':filterType,'fname':filterName}});
        
        this.fetchAllData(currentValue,filterType);
    }

    componentDidMount = async () => {
        this.changeFilter(this.state.selectedFilter.fname,this.state.selectedFilter.ftype);
       
        if(this.state.eventosLoaded === false){
            this.fetchDataEventoWidget(this.state.today);
        }
        this.fetchDataComissWidget(null);
         
    }
    createGroups(  arr , chunkSize) {
		if (chunkSize <= 0) throw "Invalid chunk size";
  var R = [];
  for (var i=0,len=arr.length; i<len; i+=chunkSize)
    R.push(arr.slice(i,i+chunkSize));
  return R;
	  }

    
    render() {
        let useRange = false;
        if(this.state.selectedFilter.ftype=='presidencia'){
            useRange = true;
        }

        moment.locale('pt-br');
        let groupedData;
        let comisData;
        if(this.state.eventosWidget){
            groupedData = this.createGroups(this.state.eventosWidget,4);
        }
        if(this.state.comisWidget){
            comisData = this.createGroups(this.state.comisWidget,4);
        }
        let selectedDate = moment(this.state.value).format('DD/MM/YYYY');
        const currentDate = new Date();
        let noEvents = "Nenhum evento encontrado para data selecionada.";
        
        if(moment(currentDate).startOf('day').isSame(moment(this.state.value).startOf('day'))){
            
            noEvents = "Nenhum evento encontrado para hoje.";
        }
        var sliderSettings = {
            dots: true,
            arrows: false,
            lazyLoad:true,
            infinite: false,
            speed: 500,
          };
        const { value } = this.state;
        return (
            <div className="agendaSection">
         
                <div className="agendaRowLight w-100 mb-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm text-center pt-5 pb-3">
                                    <h3 className=" text-center">Agenda</h3>
                                    <p className="bannerSubtitle">Consulte os próximos eventos da ALRS.</p>
                            </div>
                        </div>                     
                        <div className="row pb-5 pt-4 h-100">
                            <div className="col-sm-6 pb-5">
                                <h3 className="p-2">Pesquise por data</h3>
                                <div className="w-auto p-3 bg-white rounded rounded-block d-flex flex-column justify-content-center  h-100">
                                    <Calendar calendarType="US" locale='pt-BR' 
                                            formatMonthYear = {(locale, date) => moment(date).format('MMMM / YYYY')}
                                            selectRange={useRange}
                                            
                                            onChange={this.onClick}
                                            value={value}
                                        />
        
                                </div>
                            </div>
                            <div className="col-sm">
                            <h3 className="p-2 blocoPesquiseAssuntoTitulo">Pesquise por assunto</h3>
                            <div className="w-auto p-3 bg-white rounded rounded-block d-flex flex-column justify-content-center blocoPesquiseAssunto">
                                <ul className="agendaAssunto">
                                       
                                        {
                                this.state.filters.map((filter) => {
                                    return (
                                        <li >
                                            <a className={this.state.selectedFilter.ftype === filter.ftype ? "active" : ""} 
                                            onClick={() => this.changeFilter(filter.fname,filter.ftype)}>{filter.fname}</a>
                                            
                                            </li>
                                    )
                                })}
                                     
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                
                </div> 
                    <div id="widget" className="row agendaEventos p-5 w-100 mb-5">
                        <div className="col-sm pb-5">
                            <div className="container">
                                <h3 className="text-white text-center p-4">{this.state.selectedFilter.fname}</h3>
                                <div className="row pb-5 h-100" >
                                    
                                {this.state.allEvents && Object.keys(this.state.allEvents).length > 0 ?
                            Object.keys(this.state.allEvents).map((key, index) => (
                                
                            <EventsList 
								
								dataInicio={key}
								contents={this.state.allEvents[key]}
								
							/>

                           
                        )
                        )
                        :
                            <div className="col-sm text-center"><p className="text-center">Nenhum evento encontrado para a data {moment(value).format('DD/MM/YYYY')}.</p></div>
                        }
                                </div>

                            </div>
                            
                        </div>
                    </div>
                    <div className="container">
                    <div className="row">
                        <div className="col-sm">
                           <h3>Reuniões de Comissões</h3>
                           <div className="w-auto p-4 agendaRowDark  rounded rounded-block d-flex flex-column justify-content-center">
                            <div className="blocoSlider otherEvents">
                            <Slider {...sliderSettings}>
                            {this.state.comisWidget ?
                            comisData.map((group, i) => (
								<div>
									{
								group.sort((a, b) => a.horaInicio > b.horaInicio ? 1:-1).map((eventos, i) => (
                                    
                                <CardDate 
                                    key={i}
                                    dataInicio={eventos.dataInicio}
                                    nomeEvento={eventos.nomeEvento}
                                    horaInicio={eventos.horaInicio}
                                   
                                    nomeLocal={eventos.nomeLocal}
                                   
                                />
   
                               
                            
                            
								
							))}
									
									</div>
								
							)):
                            <p className="text-center">{noEvents}</p>
                        }
                            
                        
                         </Slider></div>
                            </div>
                        </div>
                        <div className="col-sm blocoSliderMargin">
                           <h3>Agenda de Eventos</h3>
                           <div className="w-auto p-4 agendaRowDark  rounded rounded-block d-flex flex-column justify-content-center">
                            <div className="blocoSlider otherEvents">
                            <Slider {...sliderSettings}>
                            {this.state.eventosWidget ?
                            groupedData.map((group, i) => (
								<div>
									{
								group.sort((a, b) => a.horaInicio > b.horaInicio ? 1:-1).map((eventos, i) => (
                                    
                                <CardDate 
                                    key={i}
                                    dataInicio={eventos.dataInicio}
                                    nomeEvento={eventos.nomeEvento}
                                    horaInicio={eventos.horaInicio}
                                    horaFim={eventos.horaFim}
                                    nomeLocal={eventos.nomeLocal}
                                    nomeAndar={eventos.nomeAndar}
                                />
   
                               
                            
                            
								
							))}
									
									</div>
								
							)):
                            <p className="text-center">Não foram encontrados eventos agendados para os próximos dias.</p>
                        }
                            
                        
                         </Slider></div>
                            </div>
                        </div>

                    </div>
                    </div>
                    
                   
                

                

               
            </div>
        );
    }
}