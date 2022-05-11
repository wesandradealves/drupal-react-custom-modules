import "./style.scss"
import React from "react";
import calendarIcon from '../../assets/calendar-cinza.png';
import userIcon from '../../assets/user-cinza.png';
import attachmentIcon from '../../assets/docs-cinza.png';
import moment from "moment";

export default class CardContribution extends React.Component {

    render() {
        const { contribution, index, selectContribution } = this.props;
        const newIndex = index + 1;
        const isThird = newIndex % 3 === 0;
        return (
            <div className={["contributionCard", `${isThird ? "thirdCard" : ""}`].join(" ")}>
                <div className="contributionContent">
                    <div className="infoRow">
                        <div className="labeledIcon">
                            <img src={userIcon} className="icon" alt="user" />
                            <h1 className='label'>
                                {contribution.autorNome}
                            </h1>
                        </div>
                        <div className="labeledIcon">
                            <img src={calendarIcon} className="icon" alt="calendar" />
                            <h1 className='label'>
                                {moment(contribution.dataCadastro).format("DD/MM/YYYY")}
                            </h1>
                        </div>
                        {contribution.anexos && (
                            <div className="labeledIcon">
                                <img src={attachmentIcon} className="icon" alt="attachment" />
                                <h1 className='label'>
                                    ANEXO
                                </h1>
                            </div>
                        )}
                    </div>
                    <p className="contributionCardText">{contribution.texto.length > 500 ? contribution.texto.substr(0, 500) + "..." : contribution.texto}</p>
                </div>
                <button className="cardButton" onClick={selectContribution}>
                    <p>VISUALIZAR</p>
                </button>
            </div>
        );
    }
} { }