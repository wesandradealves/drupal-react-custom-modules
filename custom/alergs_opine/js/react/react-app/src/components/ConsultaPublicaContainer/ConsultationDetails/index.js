import "./style.scss";
import detailsBanner from "../../../assets/detailsBanner.jpg"
import activeIcon from "../../../assets/ativa-branca.png"
import calendarIcon from "../../../assets/calendario-branco.png"
import userIcon from "../../../assets/user-branco.png"
import busca from "../../../assets/busca.png"
import React from "react";
import ContributionSection from "./ContributionSection";
import ContributionList from "./ContributionList";
import AllContributionList from "./AllContributionList";
import SendContribution from "./SendContribution";
import StarSendContribution from "./StartSendContribution";
import LoginSection from "../../LoginSection";

export default class ConsutationDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sampleConsultaion: null,
            isLogged: drupalSettings.user_mail ? true : false,
            verTodas: false,
            startSend: false
        }
    }

    componentDidMount() {
        const { allConsultations, consultation } = this.props;
        if (this.props.allConsultations !== null) {
            var aux = [];

            allConsultations && allConsultations.forEach((item) => {
                if (item.idConsultaPublica !== consultation.idConsultaPublica && item.indSituacao === "Ativa") aux.push(item);
            })

            var url = new URL(window.location.href);
            var verTodas = url.searchParams.has("ver-todas");
            const sampleConsultaion = aux.length > 0 ? aux : null;
            this.setState({ sampleConsultaion: sampleConsultaion, verTodas: verTodas });
        }
    }

    handleOnStartContribution = () => {
        const { startSend } = this.state;
        this.setState({ startSend: !startSend });
    }

    renderContributionSection = () => {
        const { sampleConsultaion, verTodas } = this.state;
        const { consultation } = this.props;

        return (
            <>
                {consultation && consultation.indSituacao === "Ativa" && (<StarSendContribution onStartContribution={this.handleOnStartContribution} />)}
                <ContributionSection otherConsultations={sampleConsultaion} />
            </>
        )
    }

    renderBottomContainer = () => {
        const { startSend, isLogged } = this.state;

        if (isLogged) {
            if (startSend) return <SendContribution onCancel={this.handleOnStartContribution} />;
            else return this.renderContributionSection();
        } else {
            return this.renderContributionSection();
        }
    }

    render() {
        const { startSend, verTodas } = this.state;
        return (
            <div className="consultationDetails">
                <div className="consultationBannerSection">
                    <img className="consultationBannerImage" src={detailsBanner} />
                    <div className="consultationBannerText">
                        <h1 className="consultationBannerTitle">{this.props.consultation.tituloConsultaPublica}</h1>
                        <div className="consultationInfo">
                            <div className="consultationLabeledIcon">
                                <img src={userIcon} className="consultationIcon" alt="logo" />
                                <h1 className='consultationLabel'>
                                    {this.props.consultation.nomeProponente}
                                </h1>
                            </div>
                            <div className="consultationLabeledIcon">
                                <img src={calendarIcon} className="consultationIcon" alt="logo" />
                                <h1 className='consultationLabel'>
                                    {this.props.consultation.dataCriacao}
                                </h1>
                            </div>
                            <div className="consultationLabeledIcon">
                                <img src={activeIcon} className="consultationIcon" alt="logo" />
                                <h1 className='consultationLabel'>
                                    {this.props.consultation.indSituacao}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="consultationResume">
                    <h3 className="resumeTitle">Resumo</h3>
                    <p className="resumeDetails">{this.props.consultation.ementa}</p>
                </div>
                <div className="propositonSection">
                    <div className="proprositionContainer">
                        <div className="propositionTitles">
                            <h3 className="propositionHeader proposicaoHeader" style={{ textAlign: 'left' }}>Proposição</h3>
                            <h3 className="propositionHeader proponenteHeader">Proponente</h3>
                            <h3 className="propositionHeader textoHeader">Texto</h3>
                            <h3 className="propositionHeader justificativaHeader">Justificativa</h3>
                        </div>
                        <div className="propositionDetails">
                            <h3 className="proposicaoHeaderMobile">Proposição</h3>
                            <h3 className="proposition">{this.props.consultation.proposicaoFormatado}</h3>
                            <h3 className="proposicaoHeaderMobile">Proponente</h3>
                            <h3 className="name">{this.props.consultation.nomeProponente}</h3>
                            <h3 className="proposicaoHeaderMobile">Texto</h3>
                            <a className="documentButton" href={this.props.consultation.urlProDocumentoTexto} target="_blank" rel="noreferrer">
                                <h3 className="documento" >Visualizar Documento</h3>
                                <img src={busca} className="searchIcon" alt="" />
                            </a>
                            <h3 className="proposicaoHeaderMobile">Justificativa</h3>
                            <a className="justificationButton" href={this.props.consultation.urlProDocumentoJustificativa} target="_blank" rel="noreferrer">
                                <h3 className="justificativa">Visualizar Documento</h3>
                                <img src={busca} className="searchIcon" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                {!startSend && verTodas && <ContributionList />}
                {this.renderBottomContainer()}
                <LoginSection />
            </div>
        )
    }
}
