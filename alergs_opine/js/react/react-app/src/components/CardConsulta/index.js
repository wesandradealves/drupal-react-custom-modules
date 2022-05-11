import docsIcon from '../../assets/docs-cinza.png';
import activeIcon from '../../assets/ativa-cinza.png';
import calendarIcon from '../../assets/calendar-cinza.png';
import userIcon from '../../assets/user-cinza.png';
import "./style.scss"
import React from "react";

export default class CardComponent extends React.Component {

    render() {
        const { isWidget, registro } = this.props;
        const buttonText = isWidget ? "PARTICIPE" : registro.indSituacao === "Ativa" ? "CONTRIBUIR" : "VISUALIZAR";
        return (
            <div className="consultationCard">
                <div className="consultationInfo">
                    <div className="labeledIcon">
                        <img src={docsIcon} className="icon" alt="logo" />
                        <h1 className='label'>
                            {this.props.registro.proposicaoFormatado}
                        </h1>
                    </div>
                    <div className="labeledIcon">
                        <img src={userIcon} className="icon" alt="logo" />
                        <h1 className='label'>
                            {this.props.registro.nomeProponente}
                        </h1>
                    </div>
                    <div className="labeledIcon">
                        <img src={calendarIcon} className="icon" alt="logo" />
                        <h1 className='label'>
                            {this.props.registro.dataInicialAtiva}
                        </h1>
                    </div>
                    <div className="labeledIcon">
                        <img src={activeIcon} className="icon" alt="logo" />
                        <h1 className='label'>
                            {this.props.registro.indSituacao}
                        </h1>
                    </div>
                </div>
                <div className="description">
                    <a href={`${window.location.origin}/consultapublica?id=${this.props.registro.idConsultaPublica}`} className="text-decoration-none">
                        <h1 className="title">
                            {this.props.registro.tituloConsultaPublica}
                        </h1>
                    </a>
                    <h1 className="subject">
                        {this.props.registro.ementa}
                    </h1>
                </div>
                <div className="buttonsRow">
                    <a className="cardButton" href={`${window.location.origin}/consultapublica?id=${this.props.registro.idConsultaPublica}`}>
                        <p>
                            {buttonText}
                        </p>
                    </a>
                    {!isWidget && (
                        <a className="cardButton" href={`${window.location.origin}/consultapublica?id=${this.props.registro.idConsultaPublica}&ver-todas`}>
                            <p>
                                CONTRIBUIÇÕES
                            </p>
                        </a>
                    )}
                </div>
            </div>
        );
    }
}