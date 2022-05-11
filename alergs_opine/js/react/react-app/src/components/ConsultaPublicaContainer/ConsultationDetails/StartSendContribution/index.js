import React from "react";

import "./style.scss";

export default class StartSendContribution extends React.Component {

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
        const isLogged = this.state.currentUser.email;
        const buttons = `startSendContButton ${isLogged ? "sscThemeButtons" : ""}`;
        return (
            <div className={`startSendContributionSection ${isLogged ? "sscThemeContainer" : ""}`}>
                <h3 className={`startSendContTitle ${isLogged ? "sscThemeTitle" : ""}`}>{!isLogged ? "Entre para enviar uma contribuição" : "Envie sua contribuição"}</h3>
                <div className={`startSendContRow ${isLogged ? "sscThemeRow" : ""}`}>
                    {!isLogged ?
                        <>
                            <a href="/user/register" target="_self" className="text-decoration-none">
                                <button type="submit" className={buttons}>
                                    <p>
                                        CADASTRAR
                                    </p>
                                </button>
                            </a>
                            <a href="/user/login" target="_self" className="text-decoration-none">
                                <button type="button" className={buttons}>
                                    <p>
                                        LOGIN
                                    </p>
                                </button>
                            </a>
                        </> :
                        <button type="button" className={buttons} onClick={this.props.onStartContribution}>
                            <p>
                                CONTRIBUIR
                            </p>
                        </button>
                    }
                </div>
            </div>
        );
    }
}