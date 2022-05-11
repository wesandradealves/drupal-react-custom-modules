import "./style.scss"
import React from "react";
import cpBanner from '../../assets/cpBanner.jpg';
import activeConsultationsImg from '../../assets/consultas-publicas-ativas.png';
import finalizedConsultations from '../../assets/consultas-finalizadas.png';
import allConsultationsImg from '../../assets/todas-consultas-publicas.png';
import CardConsulta from "../CardConsulta";
import ConsultationDetails from "./ConsultationDetails";
import LoginSection from "../LoginSection";
import Recaptcha from "react-google-recaptcha";
import ConsultaWidget from "./ConsultaWidget";

export default class ConsultaPublicaContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 0,
            pagesArray: [],
            selectedConsultations: [],
            allConsultations: [],
            activeConsultations: [],
            filter: "ATI",
            palavrachave: "",
            consultationId: null,
            selectedConsultation: null,
            sampleConsultaitons: [],
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
        var status = url.searchParams.get("status");
        const param = this.convertStatusParam(status);

        var consultations = await fetch(`${window.location.origin}:5000/getList?indSituacao=${param}`).then((res) => res.json()).catch((res) => console.log(res));
        this.setState({ allConsultations: consultations.lista, filter: param });
        this.getActiveConsultations();
        if (id) {
            this.setConsultationId(id, consultations.lista);
        } else {
            this.setContent(consultations);
        } 
    }

    convertStatusParam = (status) => {
        if (!status) return "ATI";

        if (status === "ativas") return "ATI";
        else if (status === "finalizadas") return "FIN";

        return "";
    }

    getActiveConsultations = async () => {
        var consultations = await fetch(`${window.location.origin}:5000/getList?indSituacao=ATI`).then((res) => res.json()).catch((res) => console.log(res));

        this.setState({ activeConsultations: consultations.lista || [] });
    }


    filterConsultations = async (indSituacao) => {
        var consultations = await fetch(`${window.location.origin}:5000/getList?indSituacao=${indSituacao}`).then((res) => res.json()).catch((res) => console.log(res));

        this.setState({ filter: indSituacao });
        this.setContent(consultations);
    }

    searchConsultation = async () => {
        var consultations = await fetch(`${window.location.origin}:5000/getList?indSituacao=${this.state.filter}&palavraChave=${this.state.palavrachave}`).then((res) => res.json()).catch((res) => console.log(res));

        this.setState({ palavrachave: '' });
        this.setContent(consultations);
    }

    setContent(consultations) {
        if (!consultations.lista) {
            this.setState({
                allConsultations: [],
                selectedConsultations: [],
                pagesArray: [],
                selectedPage: 0,
            });
        } else {
            var numberOfPages = Math.ceil(consultations.lista.length / 5);
            var i = 0;
            var pages = [];
            while (i < numberOfPages) {
                pages.push(i);
                i++
            }
            var selectedConsultations = [];

            if (consultations.lista.length > 4) {
                selectedConsultations = [
                    consultations.lista[0],
                    consultations.lista[1],
                    consultations.lista[2],
                    consultations.lista[3],
                    consultations.lista[4],
                ];
            } else {
                var consultationsLength = consultations.lista.length;

                while (consultationsLength > 0) {
                    var consultation = consultations.lista[--consultationsLength];
                    selectedConsultations.push(consultation);
                }
            }
            const newList = selectedConsultations.sort(this.sortList);

            this.setState(
                {
                    pagesArray: pages,
                    selectedConsultations: newList,
                    allConsultations: consultations.lista,
                    selectedPage: 0,
                });
        }
    }

    sortList = (a, b) => {
        const dateA = a.dataInicialAtiva.split("/");
        const dateB = b.dataInicialAtiva.split("/");
        if (new Date(`${dateA[2]}-${dateA[1]}-${dateA[0]}`) > new Date(`${dateB[2]}-${dateB[1]}-${dateB[0]}`)) return -1;
        if (new Date(`${dateA[2]}-${dateA[1]}-${dateA[0]}`) < new Date(`${dateB[2]}-${dateB[1]}-${dateB[0]}`)) return 1;
        return 0;
    }

    changePage(page) {
        this.setState({ selectedPage: page, selectedConsultations: [] });

        var positon = page * 5;
        var i = 0;

        var consultations = [];
        while (i < 5) {
            if (positon < this.state.allConsultations.length) {
                var consultation = this.state.allConsultations[positon];
                consultations.push(consultation);
                positon++;
            }
            i++;
        }
        this.setState({ selectedConsultations: consultations });
    }

    handleChange(event) {
        this.setState({ palavrachave: event.target.value });
    }

    setConsultationId = async (id) => {
        var consultations = await fetch(`${window.location.origin}:5000/getList?idConsultaPublica=${id}`).then((res) => res.json()).catch((res) => console.log(res));

        this.setState({ consultationId: id, selectedConsultation: consultations.lista[0] });
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.searchConsultation();
        }
    }

    render() {
        const { selectedConsultation, allConsultations, palavrachave, selectedConsultations, pagesArray, filter } = this.state;
        const newClassActive = filter === "ATI" ? "buttonSectionActive" : "buttonSection";
        const newClassFin = filter === "FIN" ? "buttonSectionActive" : "buttonSection";
        const newClassAll = filter === "" ? "buttonSectionActive" : "buttonSection";
        return (
            !selectedConsultation ? window.location.pathname !== '/' ? <>
                <div className="bannerSection">
                    <img className="bannerImage" src={cpBanner} />
                    <div className="bannerText">
                        <h1 className="bannerTitle topTextSection">Consultas Públicas</h1>
                        <h2 className="bannerSubtitle topTextSection">Confira todas as Consultas Públicas realizadas pela Assembleia Legislativa do Rio Grande do Sul e participe com sua opinião</h2>
                    </div>
                </div>

                <div className="menuSection">
                    <div class="menu-interno">
                        <a href={`${window.location.origin}/consultapublica?status=ativas`} onClick={() => this.filterConsultations("ATI")} class="menu-item text-decoration-none">
                            <button class={newClassActive}>
                                <img class="menu-icon" src={activeConsultationsImg} alt="user-icon" />
                                <h2 class="menu-caption">Consultas Públicas Ativas</h2>
                            </button>
                        </a>
                        <a href={`${window.location.origin}/consultapublica?status=finalizadas`} onClick={() => this.filterConsultations("FIN")} class="menu-item text-decoration-none">
                            <button class={newClassFin}>
                                <img class="menu-icon" src={finalizedConsultations} alt="user-icon" />
                                <h2 class="menu-caption">Consultas Públicas Finalizadas</h2>
                            </button>
                        </a>
                        <a href={`${window.location.origin}/consultapublica?status=todas`} onClick={() => this.filterConsultations("")} class="menu-item text-decoration-none">
                            <button class={newClassAll}>
                                <img class="menu-icon" src={allConsultationsImg} alt="user-icon" />
                                <h2 class="menu-caption">Todas Consultas Públicas</h2>
                            </button>
                        </a>
                    </div>
                </div> 
                
                <div className="searchResponse">
                    <div className="searchRow">
                        <input
                            className="searchInput"
                            onChange={(e) => this.handleChange(e)}
                            value={palavrachave}
                            onKeyDown={(e) => this.handleKeyDown(e)}
                            placeholder="Digite o que procura"
                        />
                        <button className="searchButton" onClick={this.searchConsultation}>PESQUISAR</button>
                    </div>
                    <div className="cardsContainer">
                        {selectedConsultations.length > 0 ? selectedConsultations.map((registro, i) => {
                            return (
                                <CardConsulta registro={registro} onClick={this.setConsultationId} key={`cardConsulta-${i}`} />
                            )
                        }) : <div className="consultationNotFound">
                            Nenhum resultado encontrado
                        </div>}
                        <div className="pageOffset">
                            {
                                pagesArray.map((page) => {
                                    return (
                                        <p
                                            className={this.state.selectedPage === page ? "pageNumber selected" : "pageNumber"}
                                            onClick={() => this.changePage(page)}
                                            key={page}
                                        >
                                            {page + 1}
                                        </p>
                                    )
                                })}
                        </div>
                    </div>
                </div>

                <LoginSection />
            </> : <ConsultaWidget /> : <ConsultationDetails consultation={selectedConsultation} allConsultations={allConsultations} />
        );
    }
}
