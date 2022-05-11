import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import CardBanner from "../../components/CardBanner";
import Form from "../../components/Form";
import ContentGrid from "../../components/ContentGrid";
import banner from '../../assets/plenario.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ContactForm, 
    FormTitle,
    SocialNetworks,
    SocialHeader,
    SocialItem,
    Icon
} from './styles.ts';
import "./style.scss";
import {listarNoticias, listarDestaqueDeputados} from '../../services/services';

const Contato = ({...props}) => {
    const [deputado, setDeputado] = useState(null);
    const [noticias, setNoticias] = useState(null);

	const onSubmit = (e) => {
        console.log(e);
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

    useEffect(() => {
        var $noticias = JSON.parse(props.response);
        var $nids = [];

		fetchData().then(data => {
            if(data) setDeputado(data.find(item => item.idDeputado === parseInt(props.idDeputado)));
		}).catch(err => console.log(err))           

        Object.values($noticias).map((item) => {
            $nids.push(item.idMateria);

            if($nids.length == $noticias.length) {
                (async () => {
                    try{
                        let response = await fetchNoticias(JSON.stringify($nids));
                        if(response) setNoticias(response)
                    } catch(e){
                      console.log(e);
                    }
                })(); 
            }
        })       
    }, []);

    return (
        <>
            {deputado && (<CardBanner data={deputado} />)}
            <ContactForm>
                <div class="container">
                    <Row>
                        <Col xs={12} md={5}>
                            <FormTitle>Entre em contato com o deputado</FormTitle>
                            <SocialNetworks>
                                <SocialHeader>Redes Sociais</SocialHeader>
                                <SocialItem href="https://www.facebook.com/assembleiars?fref=ts">
                                    <Icon className="fab fa-facebook-f" />
                                </SocialItem>
                                <SocialItem href="https://www.instagram.com/assembleiars/">
                                    <Icon className="fab fa-instagram" />
                                </SocialItem>
                                <SocialItem href="http://172.30.3.225/themes/custom/alergs_custom/image/twitter.png">
                                    <Icon className="fab fa-twitter" />
                                </SocialItem>
                                <SocialItem href="https://www.youtube.com/user/tvalrs">
                                    <Icon className="fab fa-youtube" />
                                </SocialItem>
                                {/* <SocialItem href="#">
                                    <Icon className="fab fa-whatsapp" />
                                </SocialItem>                                                                                                                                 */}
                            </SocialNetworks>
                        </Col>
                        <Col xs={12} md={7}>
                            <Form 
                                formId="contato"
                                onSubmit={onSubmit}
                                sendRow={
                                    {
                                        label: "Enviar",
                                        width: 3
                                    }
                                } 
                                captcha={
                                    {
                                        enable: true,
                                        width: 9
                                    }
                                }
                                formData={[
                                {
                                    width: 6,
                                    id: 'nome',
                                    placeholder: 'Nome *',
                                    type: 'text',
                                    required: true
                                },{
                                    width: 6,
                                    id: 'email',
                                    placeholder: 'E-mail *',
                                    type: 'email',
                                    required: true
                                },{
                                    width: 6,
                                    id: 'telefone',
                                    placeholder: 'Telefone *',
                                    type: 'tel',
                                    mask: 'phone',
                                    required: true
                                },{
                                    width: 6,
                                    id: 'assunto',
                                    placeholder: 'Assunto *',
                                    type: 'text',
                                    required: true
                                },{
                                    width: 12,
                                    id: 'mensagem',
                                    placeholder: 'Mensagem *',
                                    type: 'textarea',
                                    required: true
                                },{
                                    width: 12,
                                    placeholder: 'Aceito os <a href="#">Termos</a> e <a href="#">Política de Privacidade</a> da Assembleia Legislativa do<br/>Rio Grande do Sul',
                                    id: 'accept',
                                    type: 'checkbox',
                                    required: true
                                }
                            ]} />
                        </Col>                        
                    </Row>
                </div>
            </ContactForm>            
            {noticias && (<ContentGrid
            title="Notícias"
            subtitle="Acompanhe as principais novidades" 
            data={noticias} />  )}          
        </>
    );
};
 
export default Contato;