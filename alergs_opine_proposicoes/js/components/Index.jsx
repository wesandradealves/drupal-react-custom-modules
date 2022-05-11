import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import { scrollIntoView } from '../helpers/Scroll';

import '../../scss/index.scss';

export default class Index extends Component {
  constructor(props) {
    super(props);

    const data = JSON.parse(drupalSettings.proposicoes);

    this.state = {
      data: data,
      currentPage: 0,
      offset: 0,
      perPage: 4,
    };

    this.handlePageClick = this
      .handlePageClick
      .bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
      scrollIntoView('container-opine-proposicoes');
    });
  }

  receivedData = () => {
    const data = this.state.data;

    if (data) {
      const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

      const postData = slice.map((pd) => {
        return (
          <>
            <div className="container-item">
              <div className="info">
                <div className="item">
                  <img src="/modules/custom/alergs_opine_proposicoes/img/file.png" alt="" />
                  <p>{`${pd.siglaTipoProposicao.trim()} ${pd.nroProposicao} ${pd.anoProposicao}`}</p>
                </div>

                <div className="item">
                  <img src="/modules/custom/alergs_opine_proposicoes/img/calendar.png" alt="" />
                  <p>{pd.dthOrdemDiaSessao}</p>

                </div>

                <div className="item">
                  <img src="/modules/custom/alergs_opine_proposicoes/img/user.png" alt="" />
                  <p>{pd.nome}</p>
                </div>
              </div>

              <div className="conteudo">
                <p>{pd.ementa}</p>
              </div>

              <div className="cta">
                <a href={`/opine/${pd.siglaTipoProposicao.trim()}/${pd.nroProposicao}/${pd.anoProposicao}`}>Opinar</a>
              </div>

            </div>
          </>
        )
      });

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        postData
      })
    }
  }

  componentDidMount() {
    this.receivedData()
  }

  render() {
    return (
      <div>
        {!this.state.data &&
          <p className="text-center">Nenhum registro encontrado.</p>
        }

        {this.state.data &&
          <>
            <div className="container-index">
              {this.state.postData}
            </div>

            <ReactPaginate
              previousLabel={"Anterior"}
              nextLabel={"Próximo"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"} />
          </>
        }
      </div>
    )
  }
}
