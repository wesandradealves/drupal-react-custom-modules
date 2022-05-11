import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import "./style.scss";
import { render } from 'react-dom';
import ConsultaPublicaContainer from './components/ConsultaPublicaContainer';

const Root = () => {
    return (
        <div className="home">
            <ConsultaPublicaContainer />
        </div>
    )
}

render(<Root />, document.querySelector('#my-app-target'));
