import React from "react";

import "./style.scss";
import CardTransmissao from "../CardTransmissao";

export default class TransmissoesContainer extends React.Component {
	render() {
		return(
			<div className="transmissoesContainer">
				<h2 className="title">
					{this.props.title}
				</h2>
				{this.props.transmissoes && this.props.transmissoes.length > 0 ?
				this.props.transmissoes.map((transmissao) => {
					return (
						<CardTransmissao transmissao={transmissao}/>
					);
				}):
				<div className="empty">
					Nenhum Evento
				</div>
				}
			</div>
		);
	}
}