import React from "react";
import singUp from '../../assets/cadastre-se.png';
import singIn from '../../assets/login.png';
import logout from '../../assets/btn-sair.png';

import "./style.scss";

export default class LoginSection extends React.Component {

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
        return (
            <div className="loginSection">
                <h4 className="loginTitle">{!this.state.currentUser.email ? "Entre para participar" : "Deslogue sua conta"}</h4>
                <div className="loginRow">
                    {!this.state.currentUser.email ?
                        <>
                            <a href="/user/register" className="loginButton">
                                <img src={singUp} className="loginIcon" alt="logo" />
                                <h1 className='loginLabel'>Cadastre-se</h1>
                            </a>
                            <a href="/user/login" className="loginButton">
                                <img src={singIn} className="loginIcon" alt="logo" />
                                <h1 className='loginLabel'>Login</h1>
                            </a>
                        </> :
                        <a href="/user/logout" className="loginButton">
                            <img src={logout} className="loginIcon" alt="logo" />
                            <h1 className='loginLabel'>Sair</h1>
                        </a>
                    }
                </div>
            </div>
        );
    }
}