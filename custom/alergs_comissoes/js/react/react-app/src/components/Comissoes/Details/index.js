import React from "react";
import "./style.scss";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // change banner value
    // bannerTitle
    // bannerSubtitle
    // bannerImage
  }

  render() {
    return (
      <div className="detailsSection">
        <p className="detailsTitle">
          {this.props.comissao.nomeComissao}
        </p>
        <div className="detailsApresentacao" dangerouslySetInnerHTML={{ __html: this.props.comissao.apresentacaoComissao }} />
        <div className="detailsHistorico" dangerouslySetInnerHTML={{ __html: this.props.comissao.historicoComissao }} />
      </div>
    );
  }
}
