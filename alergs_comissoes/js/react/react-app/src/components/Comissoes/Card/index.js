import "./style.scss";

import React from "react";

export default class CardComponent extends React.Component {
  render() {
    return (
      <div className="consultationCard">
        <div className="description">
          <a className="" target="_blank" href={`http://www.al.rs.gov.br/legislativo/Comissoes.aspx?IdComissao=${this.props.registro.idComissao}`}>
            <p>
              {this.props.registro.nomeComissao}
            </p>
          </a>
        </div>
      </div>
    );
  }
}
