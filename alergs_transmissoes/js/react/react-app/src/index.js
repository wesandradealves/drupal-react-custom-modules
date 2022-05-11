import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import { render } from 'react-dom';
import Transmissoes from './components/Transmissoes';
import TransmissoesInterna from './views/TransmissoesInterna';

const Root = () => {
    let $path = window.location.pathname.split('/').filter(function(el) { return el; });
    let $el = (document.getElementById('transmissoes-component')) ? document.getElementById('transmissoes-component').dataset : null;
    
    if(!$el.id) {
        return (
            <div className="transmissoes">
                <Transmissoes/>
            </div>
        )        
    }

    return (<TransmissoesInterna id={$el.id} />);
}

render(<Root />, document.querySelector('#transmissoes-component'));
