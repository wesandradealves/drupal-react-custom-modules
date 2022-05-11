import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Title, Subtitle, CardItem, TitleCard, TextCard } from './styles.ts';
import CustomSelect from "./CustomSelect";
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ReactHtmlParser from 'react-html-parser';
import "antd/dist/antd.css";
import "./styles.scss";

const WidgetDeputados = ({
    redirectBaseUrl,
    optionValue,
    optionLabel,
    title,
    subtitle,
    data
}) => {
    const [selectedOption, setOption] = useState({});
    const [tpl, setTpl] = useState(null);
    const [carousel, setCarousel] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const updateWindowDimensions = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", updateWindowDimensions);

        return () => window.removeEventListener("resize", updateWindowDimensions);
    }, []);

    const onChange = (e) => {
        var prop = Object.getOwnPropertyNames(data[0]).filter((prop) => {
            return prop.indexOf('codProponente') == 0;
        })[0];

        var o = data.find(item => item[optionValue] === e.target.value);
        var id = o[prop];

        if (redirectBaseUrl && id)
            window.open(
                redirectBaseUrl + id,
                '_self'
            );
    }

    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const renderHtml = () => {
        var html = '';

        if (data) {
            console.log("data->", data)
            shuffle(data).map((item, index) => {
                if (((index + 1) % 4) === 1) html += `<div class="item-inner"><div 
                data-id="${item.codProponente}" class="item-inner--card csCardImage"
                data-${optionValue}="${item[optionValue]}"
                ><img data-id="${item.codProponente}" src="${item.urlParcialFoto}" /></div>`
                else if (((index + 1) % 4) === 2) html += `<div 
                data-id="${item.codProponente}" class="item-inner--card csCardImage"
                data-${optionValue}="${item[optionValue]}"
                ><img data-id="${item.codProponente}" src="${item.urlParcialFoto}" /></div>`
                else if (((index + 1) % 4) === 3) html += `<div 
                data-id="${item.codProponente}" class="item-inner--card csCardImage"
                data-${optionValue}="${item[optionValue]}"
                ><img data-id="${item.codProponente}" src="${item.urlParcialFoto}" /></div>`
                else if (((index + 1) % 4) === 0) html += `<div 
                data-id="${item.codProponente}" class="item-inner--card csCardImage"
                data-${optionValue}="${item[optionValue]}"
                ><img data-id="${item.codProponente}" src="${item.urlParcialFoto}" /></div></div>`

                if (index == (data.length - 1)) setTpl(html);
            })
        }
    }

    useEffect(() => {
        if (data) renderHtml();
    }, [data]);


    useEffect(() => {
        if (tpl) {
            var cards = document.getElementsByClassName("item-inner--card");
            var card = document.getElementsByClassName("card-item");

            if (cards) {

                for (const cardItem of cards) {
                    cardItem.addEventListener("mouseover", function (e) {
                        if (card[0]) card[0].style.display = 'block';

                        if (data.find(item => item[optionValue] === this.dataset[optionValue.toLowerCase()])) {
                            setOption(data.find(item => item[optionValue] === this.dataset[optionValue.toLowerCase()]));
                        }
                    }, false);

                    cardItem.addEventListener("mouseleave", function (e) {
                        if (card[0]) {
                            card[0].style.display = 'none';
                            setOption({});
                        }
                    }, false);

                    cardItem.addEventListener("click", function (e) {
                        window.open(`/deputados/${e.target.dataset.id}`, '_self');
                    }, false);
                }
            }
        }
    }, [tpl, selectedOption]);

    return (
        <Row className={`widget-deputados ${selectedOption && Object.keys(selectedOption).length !== 0 ? '--selected' : ''}`}>
            <Col className="pt-5 pr-3 pl-3 pb-4" xs={12} md={6}>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
                <CustomSelect
                    onChange={onChange}
                    data={data}
                    optionLabel={optionLabel}
                    optionValue={optionValue}
                    label={"Selecione um(a) deputado(a)".toUpperCase()} />
                {(selectedOption && Object.keys(selectedOption).length !== 0) && (<CardItem className="p-3 card-item">
                    <Row>
                        <Col xs={5} className="pr-1">
                            <img src={selectedOption.urlParcialFoto} />
                        </Col>
                        <Col xs={7} className="pl-1">
                            <TitleCard className="mb-3">Dep. {selectedOption.nome}</TitleCard>
                            <TextCard>
                                <strong>Partido:</strong> {selectedOption.sigla}<br />
                                <strong>E-mail:</strong> <span className="textEmailCard">{selectedOption.email}</span> <br />
                                <strong>Telefone:</strong> {selectedOption.telefone}
                            </TextCard>
                        </Col>
                    </Row>

                </CardItem>)}
            </Col>
            <Col className="p-5 carouselWrapper" xs={12} md={6}>
                {tpl && (<Carousel afterChange={(e) => { setCarousel(e) }} dots={false} arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}>
                    {ReactHtmlParser(tpl)}
                </Carousel>)}
            </Col>
        </Row>
    );
};

export default WidgetDeputados;