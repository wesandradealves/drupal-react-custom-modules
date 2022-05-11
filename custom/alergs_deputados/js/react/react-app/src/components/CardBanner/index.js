import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import { 
    Banner,
    Navigation, 
    NavItem, 
    Icon, 
    Caption,     
    Info, 
    Thumbnail,
    SubmenuTitle,
    SubmenuText
} from './styles.ts';
import comissoes from '../../assets/btn-comissoes.png';
import contato from '../../assets/btn-contato.png';
import imprensa from '../../assets/btn-imprensa.png';
import proposicoes_legislativas from '../../assets/btn-proposicoes-legislativas.png';
import transparencia from '../../assets/btn-transparencia.png';
import pronunciamentos from '../../assets/btn-pronunciamentos.png';
import diarias from '../../assets/btn-diarias.png';
import gastos from '../../assets/btn-gastos.png';
import presencas from '../../assets/btn-presencas.png';
import votos from '../../assets/btn-votos.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CardBanner = ({
    data,
    background
}) => {
    const [submenu, setSubmenu] = useState(null);
    const [urls, setUrls] = useState({
        contatoUrl: null,
        transparenciaUrl: null,
        diariasUrl: null,
        gastosUrl: null,
        presencasUrl: null,
        votosUrl: null,                
    });

    const nav = {
        main: [{
            icon: imprensa,
            submenu: '',
            caption: 'Imprensa',
            url: `/imprensa/${data.idDeputado}`
        },{
            icon: comissoes,
            submenu: '',
            caption: 'Comissões',
            url: `/comissoes/${data.idDeputado}`
        },{
            icon: pronunciamentos,
            submenu: '',
            caption: 'Pronunciamentos',
            url: `/pronunciamentos/${data.idDeputado}`
        },{
            icon: proposicoes_legislativas,
            submenu: '',
            caption: 'Proposições<br/>Legislativas',
            url: `/proposicoes/${data.idDeputado}`
        },{
            icon: transparencia,
            submenu: {
                id: 'transparencia',
                title: 'Transparência',
                text: 'Confira o histórico de gastos e participações do deputado na Assembleia Legislativa'
            },
            caption: 'Transparência',
            url: urls.transparenciaUrl
        },{
            icon: contato,
            action: null,
            new_tab: false,
            caption: 'Contato',
            url: urls.contatoUrl ? urls.contatoUrl : `/contato/${data.idDeputado}`
        }], 
        transparencia: [{
            icon: diarias,
            new_tab: true,
            action: null,
            caption: 'Diárias',
            url: urls.diariasUrl
        },{
            icon: gastos,
            new_tab: true,
            action: null,
            caption: 'Gastos',
            url: urls.gastosUrl
        },{
            icon: presencas,
            new_tab: true,
            action: null,
            caption: 'Presenças',
            url: urls.presencasUrl
        },{
            icon: votos,
            new_tab: true,
            action: null,
            caption: 'Votos',
            url: urls.votosUrl
        }]
    };    

    const isActive = (item) => {
        if(item.url && window.location.pathname.indexOf(item.url) >= 0) return true  
        return false;
	}    

    const createHtml = (str) => {
        return {__html: str};
	}   
    
    const openSubmenu = (o) => {
        setSubmenu(o);
    }

    const redirect = (o) => {
        if(o.new_tab)
            window.open(
                o.url,
                '_blank' 
            );        
        else
            document.location = o.url
    }    

    const setShortcuts = () => {
        const urlsDeputado = require('./deputadosUrls.json');     
        const o = urlsDeputado.lista.filter( (item) => {
            return parseInt(item.idDeputado) == data.idDeputado
        })[0];

        if(o) setUrls({
            contatoUrl: o.contatoUrl,
            transparenciaUrl: o.transparenciaUrl,
            diariasUrl: o.diariasUrl,
            gastosUrl: o.gastosUrl,
            presencasUrl: o.presencasUrl,
            votosUrl: o.votosUrl                        
        }) 
	}      

    const hasNull = (o) => {
        for (var member in o) {
            if (o[member] == null)
                return true;
        }
        return false;
    }

    useEffect(() => {
        if(data) setShortcuts()
    }, []);      

    return (
        <>
            <section>
                <Banner background={background || '/modules/custom/alergs_deputados/img/banner.png'}>
                    <div class="container">
                        <Thumbnail onClick={e => document.location = `/deputados/${data.idDeputado}`}>
                            <img src={data.fotoGrandeDeputado} />
                        </Thumbnail>
                        <Info>
                            <h2>Dep. {data.nomeDeputado}</h2>
                            <p><strong>Partido: </strong>{data.siglaPartido}</p>
                            <ul>
                                <li><strong>E-mail: </strong>{data.emailDeputado}</li>
                                <li><strong>Telefone: </strong>{data.telefoneDeputado}</li>
                            </ul>
                        </Info>
                    </div>
                </Banner>
                <Navigation>
                    <div class="container">
                        {nav && (<Row className="row menu-interno">
                            {nav.main.map((item, i) => (
                                <Col className="menu-item">
                                    <NavItem 
                                    className={`menu-item-inner ${isActive(item) && ('isActive')}`} 
                                    onClick={e => item.submenu ? openSubmenu(item.submenu)  : redirect(item)} 
                                    key={i}>
                                        <Icon className="menu-icon" src={item.icon} />
                                        <Caption className="menu-caption" dangerouslySetInnerHTML={createHtml(item.caption)} />
                                    </NavItem>
                                </Col>
                            ))}   
                        </Row> )} 

                        {submenu && (<Row className="row menu-interno">
                            <Col className="menu-interno--header" xs={12}>
                                <SubmenuTitle>{submenu.title}</SubmenuTitle>
                                <SubmenuText>{submenu.text}</SubmenuText>
                            </Col>
                            {nav[submenu.id].map((item, i) => (
                                <Col className="menu-item">
                                    <NavItem 
                                    className={`menu-item-inner ${isActive(item) && ('isActive')}`} 
                                    onClick={e => item.submenu ? openSubmenu(item.submenu)  : redirect(item)} 
                                    key={i}>
                                        <Icon className="menu-icon" src={item.icon} />
                                        <Caption className="menu-caption" dangerouslySetInnerHTML={createHtml(item.caption)} />
                                    </NavItem>
                                </Col>
                            ))}   
                        </Row> )}
                    </div>
                </Navigation>                       
            </section>
        </>
    );
};
 
export default CardBanner;