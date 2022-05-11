import React from "react";

import banner from '../../assets/banner.jpg';
import "./style.scss";

export default class Banner extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bannerTitle: 'Comissões Parlamentares',
      bannerSubtitle: 'Conheça os órgãos técnicos da Assembleia destinados a elaborar estudos e emitir pareceres especializados.',
    }
  }

  render() {
    return (
      <div className="bannerSection">
        <img className="bannerImage" src={banner} />
        <div className="bannerText">
          <h1 className="bannerTitle">{this.state.bannerTitle}</h1>
          <h2 className="bannerSubtitle">{this.state.bannerSubtitle}</h2>
        </div>
      </div>
    );
  }
}
