import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import { render } from 'react-dom';
import Deputados from './views/Deputados';
import Comissoes from './views/Comissoes';
import Proposicoes from './views/Proposicoes';
import Pronunciamentos from './views/Pronunciamentos';
import DeputadosInterna from './views/DeputadosInterna';
import Contato from './views/Contato';
import Imprensa from './views/Imprensa';
import "./style.scss";
import 'lightbox-react/style.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Root = () => {
    let $path = window.location.pathname.split('/').filter(function(el) { return el; });
    let $el = document.getElementById('deputados-component').dataset;

    switch($path[0]) {
        case 'deputados': 
            if($path[1]) {
                return <DeputadosInterna idDeputado={$path[1]} />;
            }
            return <Deputados />;
            break;              
        case 'pronunciamentos':
            return <Pronunciamentos
                id={$path[2]}
                idDeputado={$path[1]} />;
            break;   
        case 'proposicoes':           
            return <Proposicoes
                id={$path[2]}
                idDeputado={$path[1]} />;
            break;           
        case 'comissoes': 
            return <Comissoes
                idDeputado={$path[1]} />;
            break; 
        case 'contato': 
            return <Contato
                idDeputado={$path[1]}
                personalData={$el.personaldata}
                response={$el.response} />;
            break;  
        case 'imprensa': 
            return <Imprensa
                idDeputado={$path[1]} mostrarTudo={$path[2] ? true : false} />;
            break;                                    
        default:
            console.log($path);
    }
}

render(<Root />, document.querySelector('#deputados-component'));
