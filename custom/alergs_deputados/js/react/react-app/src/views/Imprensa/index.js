import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect, useRef } from 'react';
import {
    CardTitle,
    CardInfo,
    InfoCell,
    Thumbnail,
    Ico,
    Text,
    Card
} from '../../components/ContentGrid/styles';
import {
    Button,
    Columns, 
    Column,
    SmallText,
    SectionTitle,
    CarrouselItem,
    SectionHeader,
    SectionHeaderText,
    Agenda
} from '../DeputadosInterna/styles';
import CardBanner from "../../components/CardBanner";
import OwlCarousel from 'react-owl-carousel-autoheight';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    listarNoticiasDeputados,
    listarDestaqueDeputados,
    listarNoticias,
    listarArtigosDeputados,
    listarFotosdeDeputadosAL,
    listarDadosDeputadosTV,
    listarDadosRadioDeputados
} from '../../services/services'
import ContentGrid from "../../components/ContentGrid";
import { LightBox } from 'react-lightbox-pack'; 
import "react-lightbox-pack/dist/index.css";
import './style.scss';

const Imprensa = ({...props}) => {
    const [noticias, setNoticias] = useState(null);
    const [deputado, setDeputado] = useState(null);
    const [artigos, setArtigos] = useState(null);
    const [fotos, setFotos] = useState(null);
    const [modal, openModal] = useState(false);
    const [sIndex, setSIndex] =  useState(0);
    const [radio, setRadio] = useState(null);
    const [tv, setTv] = useState(null);

    const fetchNoticiasDeputado = async (id, top) => {
        const response = await listarNoticiasDeputados(id, top).then(data => {
            return JSON.parse(data).lista
        }).catch(err => console.log(err)); 

        return response;
	}         

    const fetchData = async () => {
      const response = await listarDestaqueDeputados().then(res => {
          return JSON.parse(res).lista;
      }).catch(err => console.log(err))

      return response;
    }    

	const fetchNoticias = async (nid) => {
        const response = await listarNoticias(nid).then(data => {
            return JSON.parse(data).lista
        }).catch(err => console.log(err)); 

        return response;
	}   
    
	const fetchFotos = async (id) => {
        const response = await listarFotosdeDeputadosAL(id).then(data => {
            return JSON.parse(data).lista
        }).catch(err => console.log(err)); 

        return response;
	}  
    
	const fetchDadosDeputadoTv = async (nomeDeputado) => {
        const response = await listarDadosDeputadosTV(nomeDeputado).then(data => {
            return JSON.parse(data).lista
        }).catch(err => console.log(err)); 

        return response;
	}    
    
    const fetchDadosRadioDeputados = async (id) => {
        const response = await listarDadosRadioDeputados(id).then(data => {
            return JSON.parse(data).listarDadosRadioDeputados
        }).catch(err => console.log(err)); 

        return response;
	}    

    const fetchArtigosDeputado = async (id) => {
        const response = await listarArtigosDeputados(id).then(data => {
            return JSON.parse(data).lista
        }).catch(err => console.log(err)); 

        return response;
	}      

    const invertDate = (str) => {
        return str.split('/').reverse().join('/');
	}      
    
    const createHtml = (str) => {
        return {__html: str};
	}        

    const thumbnailHandler = (str) => {
        let array = str.split('_P');
        array.splice(1, 0, '_G');

        return array.join('')
	}            

    const handleFotos = () => setFotos(fotos => fotos.map(
        foto => ({
            ...foto,
            id: foto.idFotografia,
            image: thumbnailHandler(foto.urlFotografia),
            description: foto.legenda,
            title: `${foto.origem} - ${foto.fotografo}`
        })
    ))    
    
	const  lightBoxHandler  = (state, sIndex) => {
		openModal(state);
		setSIndex(sIndex);
	};    

    useEffect(() => {
		fetchData().then(res => {
			setDeputado(res.find(item => item.idDeputado === parseInt(props.idDeputado)));
		}).catch(err => console.log(err));
    }, []); 
    
    useEffect(() => {
        var aids = [];  
        var nids = [];

        if(deputado) {
            let top = props.mostrarTudo ? null : 5;

            fetchNoticiasDeputado(deputado.idDeputado, top).then(response => {
                if(response) {
                    Object.values(response).map((item) => {
                        nids.push(item.idMateria);

                        if(Object.values(response).length === nids.length) {
                            fetchNoticias(JSON.stringify(nids)).then(data => {
                                console.log(data)
                                setNoticias(data)
                            })  
                        }                        
                    })
                }
            }).catch(err => console.log(err)),            
            fetchArtigosDeputado(deputado.idDeputado).then(response => {
                if(response) {
                    Object.values(response).map((item) => {
                        aids.push(item.idMateria);

                        if(Object.values(response).length === aids.length) {
                            fetchNoticias(JSON.stringify(aids)).then(data => {
                                setArtigos(data)
                            })  
                        }                        
                    })  
                }
            }), fetchFotos(deputado.idDeputado).then(response => {
                if(response) setFotos(response)             
            }), fetchDadosRadioDeputados(deputado.idDeputado).then(response => {
                if(response) setRadio(response)             
            }), fetchDadosDeputadoTv(deputado.nomeDeputado).then(response => {
                if(response) setTv(response)             
            })            
        }
    }, [deputado]);  
    
    useEffect(() => {
        if(fotos && !fotos[0].hasOwnProperty('image')) handleFotos()
    }, [fotos]);

    console.log("artigos aqui:")
    console.log(artigos)
    console.log("<<<artigos")

    return (
        <>
            {deputado && (<CardBanner data={deputado} />)}    

            {noticias && (<ContentGrid
                title="Notícias"
                subtitle="Acompanhe as principais novidades." 
                mostrarTudoUrl={`/imprensa/${deputado.idDeputado}/todas`}
                mostrarTudo={props.mostrarTudo}
                data={noticias} />)}

            {!props.mostrarTudo && (<>
                <section id="artigos" className="--blue --content">
                    <div className="container">
                        <Row>
                            {artigos == null && (<Col xs={12} md={6}>
                                <SectionTitle align="left">Artigos</SectionTitle>
                                    <Card style={{ color: '#fff' }}>
                                        <CardTitle fontSize="1.5rem">Nenhum artigo disponível.</CardTitle>
                                        {/* <Button className="btn --green --see-all" href={`/noticias/ver-todas-old?field_categoria_value=Artigos`}>Todos os artigos</Button> */}
                                    </Card>                             
                            </Col>)} 
                            {artigos && (<Col xs={12} md={6}>
                                <SectionTitle align="left">Artigos</SectionTitle>
                                <OwlCarousel autoHeight={true} className='owl-theme'  loop margin={10} items={1} dots={false} nav>
                                    {artigos && (artigos.map((item, i) => (<div class='item owl-height'>
                                        <Card>
                                            <CardInfo className="card-info">
                                                <InfoCell><Ico className="far fa-file"></Ico> {item.tipoMateria}</InfoCell>
                                                <InfoCell><Ico className="far fa-user"></Ico> {item.autoria}</InfoCell>
                                                <InfoCell><Ico className="far fa-calendar"></Ico> {item.paraEditor}</InfoCell>
                                            </CardInfo>
                                            <CardTitle fontSize="1.5rem">{item.tituloMateria}</CardTitle>
                                            <Button className="btn --green --see-all" href={`/noticias/ver-todas-old?field_categoria_value=Artigos&deputado=${deputado.idDeputado}`}>Todos os artigos</Button>
                                        </Card>
                                    </div>)))}                                
                                </OwlCarousel>   
                            </Col>)} 
                            {fotos == null && (<Col xs={12} md={6}>
                                <SectionTitle align="left">Fotos</SectionTitle>
                                    <Card style={{ color: '#fff' }}>
                                        <CardTitle fontSize="1.5rem">Nenhuma foto disponível.</CardTitle>
                                    </Card>                             
                            </Col>)} 
                            {fotos && (<Col xs={12} md={6}>
                                <SectionTitle align="left">Fotos</SectionTitle>
                                <OwlCarousel autoHeight={true} className='owl-theme'  loop margin={5} items={2} dots={false} nav>
                                    {fotos && (fotos.slice(0, 10).map((item, i) => (<div class='item owl-height'>
                                        <Card>
                                            <Thumbnail lightbox={true} onClick={() => { lightBoxHandler(true, i) }} urlFotografia={`${item.urlFotografia.replace('_P','_G')}`} />
                                            <CardInfo vertical className="card-info">
                                                <InfoCell><Ico className="far fa-calendar"></Ico> {item.dataFotografia.split(' ')[0]}</InfoCell>
                                                <InfoCell><Ico className="fas fa-camera"></Ico> {item.fotografo}</InfoCell>
                                            </CardInfo>
                                            <CardTitle fontSize="1.1rem">{item.legenda}</CardTitle>
                                        </Card>
                                    </div>)))}                               
                                </OwlCarousel>                                      
                            </Col>)}                      
                        </Row>                          
                    </div>
                </section>

                {(tv !== null || radio !== null) && (<section id="conteudos" className="--content">
                    <div className="container">
                        <Row>
                            {tv && (<Col sm={12} md={6}>
                                <SectionTitle align="left">Últimos conteúdos da TV</SectionTitle>
                                <Row>
                                    <Col xs={12}>
                                        {tv && (tv.slice(0, 3).map((item, i) => (<div class='item owl-height'>
                                            <Card className="card" onClick={e => document.location = `/tval/${item.idCadastroVideo}`}>
                                                <CardInfo className="card-info">
                                                    <InfoCell className="featured"><Ico className="far fa-calendar"></Ico> {invertDate(item.data.split(' ')[0].replaceAll('-','/'))}</InfoCell>
                                                </CardInfo>
                                                <CardTitle  fontSize="1rem">{item.manchete}</CardTitle>
                                            </Card> 
                                        </div>)))}                                          
                                    </Col>
                                </Row>                                
                            </Col>)}
                            {radio && (<Col sm={12} md={6}>
                                <SectionTitle align="left">Últimos conteúdos da Rádio</SectionTitle>
                                <Row>
                                    <Col xs={12}>
                                        {radio && (radio.slice(0, 2).map((item, i) => (<div class='item owl-height'>
                                            <Card className="card" onClick={e => document.location = `/radio/${item.idMateriaRadio}`}>
                                                <CardInfo className="card-info">
                                                    <InfoCell className="featured"><Ico className="far fa-file"></Ico> {item.descricaoClasseMateria}</InfoCell>
                                                    <InfoCell><Ico className="far fa-calendar"></Ico> {invertDate(item.dataHora.split(' ')[0].replaceAll('-','/'))}</InfoCell>
                                                </CardInfo>
                                                <CardTitle fontSize="1rem" dangerouslySetInnerHTML={createHtml(item.titulo)} />
                                                <CardInfo>
                                                    <InfoCell>Repórter {item.nome}</InfoCell>
                                                </CardInfo>           
                                                {/* {item.arquivo && (<audio>
                                                    <source src={item.arquivo} type="audio/mp3" />
                                                    Your browser does not support the audio tag.
                                                </audio>)}                                      */}
                                            </Card> 
                                        </div>)))}   
                                    </Col>
                                </Row>                                 
                            </Col>)}                           
                        </Row>
                    </div>
                </section> )}     
                            
                {(fotos && fotos[0].hasOwnProperty('image')) && (<LightBox
                    state={modal}
                    event={lightBoxHandler}
                    data={fotos}
                    imageWidth="60vw"
                    imageHeight="70vh"
                    thumbnailHeight={50}
                    thumbnailWidth={50}
                    setImageIndex={setSIndex}
                    imageIndex={sIndex}
                />)}
            </>)}
        </>
    );
};
 
export default Imprensa;