import React, { Component } from 'react';

import { incluirVotacaoProposicao } from '../services/Opine';

export default class Votar extends Component {

  constructor(props) {
    super();

    // FIXME: Variable to create the request!
    const cpfCnpj = drupalSettings.cpfCnpjParticipante;
    const siglaTipoProposicao = drupalSettings.siglaTipoProposicao;
    const nroProposicao = drupalSettings.nroProposicao;
    const anoProposicao = drupalSettings.anoProposicao;

    // Get only the user voto
    const voto = drupalSettings.voto;

    this.state = {
      cpfCnpj: cpfCnpj,
      siglaTipoProposicao: siglaTipoProposicao,
      nroProposicao: nroProposicao,
      anoProposicao: anoProposicao,

      voto: voto,
    };
  }

  render() {
    const votar = (e) => {
      const { cpfCnpj, siglaTipoProposicao, nroProposicao, anoProposicao } = this.state;

      // incluirVotacaoProposicao(cpfCnpj, e.target.value, siglaTipoProposicao, nroProposicao, anoProposicao);

      this.setState({ voto: e.target.value });

      console.log(e.target.value)
      console.log(this.state.voto)

      // TODO: Create send to update google chart!

    }

    return (
      <>
        <div className="container-votar">
          <button onClick={votar} value="CONC" disabled={this.state.voto}>
            Concordo
          </button>
          <button onClick={votar} value="DISC" disabled={this.state.voto}>
            Discordo
          </button>
        </div>
      </>
    );
  }
};
