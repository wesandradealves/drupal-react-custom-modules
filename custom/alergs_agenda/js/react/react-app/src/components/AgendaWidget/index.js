import React, { useState } from "react";
import { listarDadosAgendaEventos } from "../../services/services";
import { listarAgendaPresidencia } from "../../services/services";
import { listarAgendaReunioes } from "../../services/services";
import { listarAgendaHistoricoReunioes } from "../../services/services";
import "./style.scss";
import "../Agenda/slick.scss";
import Calendar from "react-calendar";
import "../Agenda/calendar.scss";
import CardWidget from "../CardWidget";

import moment from "moment";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick-theme.scss";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default class AgendaWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      page: 1,
      paged: null,
      presidencia: [],
      comissoes: [],
      eventos: [],
      currentDate: new Date(),
      allEvents: [],
      defaultMessage: 'Carregando...'
    };
  }

  fetchData = async (value) => {
    const response = await listarDadosAgendaEventos(value)
      .then((data) => {
        return JSON.parse(data).lista;
      })
      .catch((err) => console.log(err));

    this.setState({ eventos: response });
    return response;
  };

  fetchDataPres = async (value) => {
    const response = await listarAgendaPresidencia(value)
      .then((data) => {
        return JSON.parse(data).listarAgendaPresidencia;
      })
      .catch((err) => console.log(err));

    this.setState({ presidencia: response });
    return response;
  };

  fetchDataComiss = async (value) => {
    const response = await listarAgendaReunioes(value)
      .then((data) => {
        return JSON.parse(data).lista;
      })
      .catch((err) => console.log(err));

    this.setState({ comissoes: response });
    return response;
  };

  fetchDataComissHist = async (value) => {
    const response = await listarAgendaHistoricoReunioes(value)
      .then((data) => {
        return JSON.parse(data).lista;
      })
      .catch((err) => console.log(err));

    this.setState({ comissoes: response });
    return response;
  };

  fetchAllData = async (value, filtr) => {
    const _ = require('lodash');
    // let results = [];
    var results = await this.fetchData(moment(value).format("DD/MM/YYYY"));

    // if (filtr == "all" || filtr == "eventos") {
    //   var ev = await this.fetchData(moment(value).format("DD/MM/YYYY"));
    // }

    // if (filtr == "all" || filtr == "comissoes") {
    //   var today = new Date();

    //   if (moment(value).isBefore(today)) {
    //     var comis = await this.fetchDataComissHist(
    //       moment(value).format("DD/MM/YYYY")
    //     );
    //   } else {
    //     var comis = await this.fetchDataComiss(
    //       moment(value).format("DD/MM/YYYY")
    //     );
    //   }
    // }

    // if (filtr == "all" || filtr == "presidencia") {
    //   if (filtr == "presidencia") {
    //     var dataRange = [
    //       moment(value[0]).format("YYYY-MM-DD"),
    //       moment(value[1]).format("YYYY-MM-DD"),
    //     ];
    //     var pres = await this.fetchDataPres(dataRange);
    //   } else {
    //     var pres = await this.fetchDataPres(moment(value).format("YYYY-MM-DD"));
    //   }
    // }

    // if (ev) {
    //   for (let i = 0; i < ev.length; i++) {
    //     ev[i].dataInicio = moment(
    //       this.formatDate(ev[i].dataInicio, "/")
    //     ).format("DD/MM/YYYY");
    //     ev[i].eventType = "Agenda de Eventos";
    //     results.push(ev[i]);
    //   }
    // }

    // if (pres) {
    //   for (let i = 0; i < pres.length; i++) {
    //     pres[i].dataInicio = moment(pres[i].dataInicio).format("DD/MM/YYYY");
    //     pres[i].eventType = "Presidência";
    //     pres[i].nomeLocal = pres[i].localEvento;
    //     pres[i].horaInicio = pres[i].horaEvento;
    //     results.push(pres[i]);
    //   }
    // }

    // if (comis) {
    //   for (let i = 0; i < comis.length; i++) {
    //     comis[i].dataInicio = comis[i].dthInicioReuniao;
    //     comis[i].eventType = "Comissões Parlamentares";
    //     comis[i].nomeLocal = comis[i].nomeLocal;
    //     comis[i].nomeEvento = comis[i].nomeComissao;
    //     comis[i].horaInicio = comis[i].horaInicioReuniao;
    //     comis[i].textoAgenda = "";
    //     results.push(comis[i]);
    //   }
    // }

    // this.setState({ allEvents: [] });

    console.log(results)

    if(results && results.length) {
      this.setState({ paged: _.chunk(results.map(
        item => ({
            ...item,
            order: parseInt(item.horaInicio.replace(':', ''))
        })
      ).sort((a, b) => a.order > b.order ? 1 : -1 ), 2) });  
    } else {
      this.setState({
        defaultMessage: 'Nenhum resultado encontrado.'
      })
    } 
  };

  handlePagination = (e) => {
    if(parseInt(e.target.textContent)) {
      this.setState({
        page: parseInt(e.target.textContent)
      })
    } else {
      this.setState({
        page: e.target.attributes[3].value.indexOf('next page') !== -1 ? this.state.page + 1 : this.state.page - 1
      })      
    }
  };  

  formatDate(datePT, sep) {
    var date = datePT.slice(0, 11);
    var d = date.split(sep)[0];
    var m = date.split(sep)[1];
    var y = date.split(sep)[2];

    return y.trim() + "-" + ("0" + m).slice(-2) + "-" + ("0" + d).slice(-2);
  }

  componentDidMount = async () => {
    this.fetchAllData(this.state.currentDate, "all");
  };

  createGroups(arr, chunkSize) {
    if (chunkSize <= 0) throw "Invalid chunk size";
    var R = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  }

  render() {
    moment.locale("pt-br");
    let groupedData;
    if (this.state.allEvents) {
      groupedData = this.createGroups(this.state.allEvents, 3);
    }

    var sliderSettings = {
      dots: true,
      arrows: false,
      lazyLoad: true,
      infinite: false,
      speed: 500,
      //rows:1,
      // adaptiveHeight: true,
      //vertical: true
    };
    const { value } = this.state;
    let selectedDate = moment(this.state.value).format("DD/MM/YYYY");
    const currentDate = new Date();
    let noEvents = "Nenhum evento encontrado para data selecionada.";

    if (
      moment(currentDate)
        .startOf("day")
        .isSame(moment(this.state.value).startOf("day"))
    ) {
      noEvents = "Nenhum evento encontrado para hoje.";
    }

    return (
      <div id="agendaSection" className="agendaSection">
        <div className="agendaRowLight w-100">
          <div className="container">
            <div className="row">
              <div className="col-sm text-center pt-5 pb-3">
                <h3 className=" text-center">Agenda</h3>
                <p className="bannerSubtitle">
                  Consulte os próximos eventos da ALRS.
                </p>
              </div>
            </div>
            <div className="row pt-4 pb-5">
              <div className="col-sm-6">
                <div className="calendar-wrapper w-auto p-3 bg-white rounded rounded-block d-flex flex-column justify-content-center ">
                  <Calendar
                    locale="pt-BR"
                    onChange={(e) => {
                      document.getElementById("agendaSection").scrollIntoView(),
                      this.setState({
                        paged: [],
                        defaultMessage: 'Carregando...',
                        currentDate: e
                      }),
                      this.fetchAllData(e, "all");
                    }}
                    value={this.state.currentDate}
                  />
                </div>
              </div>
              <div className="col-sm">
                <div className="w-auto p-4 agendaRowDark  rounded rounded-block d-flex flex-column justify-content-center ">
                  <div className="blocoSlider eventosWidget">
                    { this.state.paged && this.state.paged.length ? <><div className="list">
                          {this.state.paged[this.state.page - 1].map((item, i) => (
                            <div>
                              <div className="list-header">
                                <i className="icon">&#128197;</i> {item.dataInicio.split(' ')[0]} 
                              </div>
                              <h2>{item.nomeEvento.replace('- ','')}</h2>
                              <h3><i className="icon">&#128359;</i> {`${item.horaInicio} às ${item.horaFim}`}</h3>
                            </div>
                          ))} 
                        </div>

                        <Stack spacing={2}>
                          <Pagination 
                            // defaultPage={1} 
                            page={this.state.page} 
                            onChange={this.handlePagination} 
                            boundaryCount={2}
                            count={this.state.paged.length} variant="outlined" shape="rounded" />
                        </Stack></> : <p className="calendar-msg">{this.state.defaultMessage}</p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
