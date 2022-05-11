import React from "react";

import singUp from '../../assets/cadastre-se.png';
import singIn from '../../assets/login.png';
import logout from '../../assets/btn-sair.png';
import "./style.scss";

export default class AcessoRapido extends React.Component {

    render() {
        return (
            <div className="loginSection">
                {/* <h1 className="loginTitle">{!this.state.currentUser.email ? "Entre para participar" : "Deslogue sua conta"}</h1> */}
                <div className="loginRow">
                    <a href="/user/register" className="loginButton">
                        <img src={singUp} className="icon" alt="logo" />
                        <h1 className='loginLabel'>Cadastre-se</h1>
                    </a>
                    <a href="/user/login" className="loginButton">
                        <img src={singIn} className="icon" alt="logo" />
                        <h1 className='loginLabel'>Login</h1>
                    </a>
                    <a href="/user/logout" className="loginButton">
                        <img src={logout} className="icon" alt="logo" />
                        <h1 className='loginLabel'>Sair</h1>
                    </a>
                </div>
            </div>
        );
    }
}