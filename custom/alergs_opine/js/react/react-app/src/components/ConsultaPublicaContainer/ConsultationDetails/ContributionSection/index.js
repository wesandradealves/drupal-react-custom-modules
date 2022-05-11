import React from "react";
import "./style.scss"
import CardConsulta from "../../../CardConsulta";
import Slider from "react-slick";
import "../../../Carousel/slick.scss";
import "../../../Carousel/slick-theme.scss";

export default class ContributionSection extends React.Component {
    constructor(props) {
        super(props);

        super(props);
        this.state = {
            currentUser: {
                name: drupalSettings.user_name || drupalSettings.user_entidade,
                document: drupalSettings.user_cpf || drupalSettings.user_cnpj,
                email: drupalSettings.user_mail,
            },
        }

    }


    render() {
        const { otherConsultations } = this.props;
        const margin = otherConsultations && otherConsultations.length > 1 ? "" : "mb-4";
        return (
            <>
            {this.props.otherConsultations !== null && (<div className="enviarContribuicao">
                <div className="centralizarBotoes">
                    <div>
                        <h1 className="centralizarTitulo"> Outras Consultas Públicas </h1>
                    </div>
                    <div className="otherConsultationsContainer">
                        <div className={`consultationCarousel ${margin}`}>
                            <Slider
                                dots={true}
                                arrows={false}
                                lazyLoad={true}
                                infinite={true}
                                speed={500}
                            >
                                {this.props.otherConsultations.map((consultation) => {
                                    return (
                                        <CardConsulta registro={consultation} key={consultation.idConsultaPublica} />
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                    {/* <div className="goHomeButton">
                        <a href="/consultapublica" className="botaoLinkExternoMenor"> VEJA MAIS </a>
                    </div> */}
                </div>
            </div>)             
            }
            </>

        );
    }
}
