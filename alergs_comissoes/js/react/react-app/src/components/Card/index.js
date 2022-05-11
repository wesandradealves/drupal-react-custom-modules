import docsIcon from '../../assets/docs-cinza.png';
import activeIcon from '../../assets/ativa-cinza.png';
import calendarIcon from '../../assets/calendar-cinza.png';
import userIcon from '../../assets/user-cinza.png';
import "./style.scss"
import React from "react";

export default class CardComponent extends React.Component {

    render() {
        return (
            <div className="consultationCard">
                <div className="description">
                    <a className="" href={`${window.location.origin}/comissoes-parlamentares?id=${this.props.registro.idComissao}`}>
                        <p>
                            {this.props.registro.nomeComissao}
                        </p>
                    </a>
                </div>
            </div>
        );
    }
}