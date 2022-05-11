import React from "react";

import "./style.scss";
import pin from "../../assets/pin.png"
import hora from "../../assets/hora.png"
import moment from "moment";

export default class CardTransmissao extends React.Component {
	render() {
		console.log(this.props.transmissao);
		return(
			<div className="cardTrasmissao">
				<div className="tipoTrasmissao">
					<h3>{this.props.transmissao.tipo}</h3>
				</div>
				<h2 className="titulo">{this.props.transmissao.idTipo == 2 ? this.props.transmissao.subTipo : this.props.transmissao.titulo}</h2>
				<div className="infoRow">
					<div className="labeledIcon">
						<img src={hora} alt="calendario" className="icon"/>
						<span className="label">{moment(this.props.transmissao.data).format('DD/MM/YYYY HH:mm')}</span>
					</div>
					<div className="labeledIcon">
						<img src={pin} alt="icon" className="icon"/>
						<span className="label">{this.props.transmissao.local}</span>
					</div>
				</div>
				<a className="trasmissaoURL" href={this.props.transmissao.url} target="_blank">{this.props.transmissao.titulo}</a>
			</div>
		);
	}
}
