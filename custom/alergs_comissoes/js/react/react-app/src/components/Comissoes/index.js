//import "./style.scss";

import React from "react";

import Card from './Card';
import Details from './Details';
import "./style.scss";

export default class Comissoes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: "1",
      selectedPage: 0,
      pagesArray: [],
      selectedComissoes: [],
      selectedComissao: null,
      allComissoes: [],
      //comissaoId: null,
      comissaoId: drupalSettings.idComissao ? drupalSettings.idComissao : null,
      idTipoComissao: null,
      sampleComissoes: [],

      // Custom data
      listComissoes: [
        {
          title: 'Comissões Permanentes',
          value: '1'
        }
      ]
    }
  }

  componentDidMount = async () => {
    var url = new URL(window.location.href);

    //var id = url.searchParams.get("id");
    var id = this.state.comissaoId;

    var idTipoComissao = url.searchParams.get("idTipoComissao");

    if (idTipoComissao === null) {
      idTipoComissao = this.state.filter
    }

    this.setState({ filter: idTipoComissao });

    var comissoes = await fetch(`${window.location.origin}:5000/getComissoesParlamentares?idTipoComissao=${idTipoComissao}`).then((res) => res.json()).catch((res) => console.log(res));

    this.setState({ allComissoes: comissoes.lista });

    if (id) {
      this.setComissaoId(id);
    } else {
      this.setContent(comissoes);
    }
  }

  filterComissoes = async (idTipoComissao) => {
    var comissoes = await fetch(`${window.location.origin}:5000/getComissoesParlamentares?idTipoComissao=${idTipoComissao}`).then((res) => res.json()).catch((res) => console.log(res));

    this.setState({ filter: idTipoComissao });
    this.setContent(comissoes);
  }

  setComissaoId = async (id) => {
    var comissao = await fetch(`${window.location.origin}:5000/getComissoesParlamentares?idComissao=${id}`).then((res) => res.json()).catch((res) => console.log(res));

    this.setState({ comissaoId: id, selectedComissao: comissao.comissao[0] });
  }

  changePage(page) {
    this.setState({ selectedPage: page, selectedComissoes: [] });

    var comissoes = [];
    var positon = page * 5;
    var i = 0;

    while (i < 5) {
      if (positon < this.state.allComissoes.length) {
        var consultation = this.state.allComissoes[positon];
        comissoes.push(consultation);
        positon++;
      }
      i++;
    }

    this.setState({ selectedComissoes: comissoes });
  }

  setContent(comissoes) {
    if (!comissoes.lista) {
      this.setState({
        allComissoes: [],
        selectedComissoes: [],
        pagesArray: [],
        selectedPage: 0,
      });
    } else {
      var numberOfPages = Math.ceil(comissoes.lista.length / 5);
      var i = 0;
      var pages = [];
      while (i < numberOfPages) {
        pages.push(i);
        i++
      }
      var selectedComissoes = [];

      if (comissoes.lista.length > 4) {
        selectedComissoes = [
          comissoes.lista[0],
          comissoes.lista[1],
          comissoes.lista[2],
          comissoes.lista[3],
          comissoes.lista[4],
        ];
      } else {
        var consultationsLength = comissoes.lista.length;

        while (consultationsLength > 0) {
          var consultation = comissoes.lista[--consultationsLength];
          selectedComissoes.push(consultation);
        }
      }

      this.setState(
        {
          pagesArray: pages,
          selectedComissoes: selectedComissoes,
          allComissoes: comissoes.lista,
          selectedPage: 0,

        });
    }
  }

  getComissaoTitle(idTipoComissao) {
    console.log(idTipoComissao)

    var text = '';

    switch (idTipoComissao) {
      case '1':
        text = 'Comissões Permanentes';
        break;

      case '3,5,7':
        text = 'Comissões Temporárias';
        break;

      case '6':
        text = 'Comissão de Ética';
        break;

      case '4':
        text = 'Subcomissões';
        break;

      case '':
        text = 'Comissões e Subcomissões Encerradas';
        break;

      default:
        text = 'Comissões Permanentes';
        break;
    }

    return text;
  }

  render() {
    // Just to get the query string
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const idTipoComissao = params.get('idTipoComissao');

    // Set title hard coded
    const comissaoTitle = this.getComissaoTitle(idTipoComissao);

    return (
      <div>
        <div className="cardsContainer">
          <h1>{comissaoTitle}</h1>

          <div
            className={this.state.selectedComissoes.length > 0 ? "cardsContainer__white" : ""}
          >
            {
              this.state.selectedComissoes.length > 0 ? this.state.selectedComissoes.map((registro, i) => {
                return (
                  <Card registro={registro} onClick={this.setcomissaoId} key={`cardConsulta-${i}`} />
                )
              }) :
                <div className="consultationNotFound">
                  Nenhum resultado encontrado
                </div>
            }
          </div>

          <div className="pageOffset">
            {
              this.state.pagesArray.map((page) => {
                return (
                  <p
                    className={this.state.selectedPage === page ? "pageNumber selected" : "pageNumber"}
                    onClick={() => this.changePage(page)}
                    key={page}
                  >
                    {page + 1}
                  </p>
                )
              })
            }
          </div>

        </div>

      </div>
    );
  }
}
