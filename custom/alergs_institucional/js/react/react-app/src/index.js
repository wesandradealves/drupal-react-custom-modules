import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import { render } from 'react-dom';
//import ObterMesaDiretora from './services/services.js';
import Mesadiretora from './components/Mesadiretora';
import "./style.scss";

const Root = () => {
    return (
        <div className="mesaDiretoraContainer">
           <Mesadiretora/>
        </div>
    )
}

render(<Root />, document.querySelector('#institucional-component'));
