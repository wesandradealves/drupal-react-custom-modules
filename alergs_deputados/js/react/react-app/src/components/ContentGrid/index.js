import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect, useRef } from 'react';
import { Container, 
    GridHeader, 
    Title, 
    SubTitle, 
    Grid,
    GridListItem,
    GridList,
    GridItem,
    CardTitle,
    CardInfo,
    InfoCell,
    Thumbnail,
    Button,
    Ico,
    Text,
    Card } from './styles.ts';
import './styles.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ContentGrid = ({...props}) => {
    var areas = ['Featured','A1','A2','A3','A4'];
    const _ = require('lodash');
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);

    const createHtml = (str) => {
        return {__html: str};
	}  

    const handleChange = (e) => { 
        if(parseInt(e.target.textContent)) {
            setPage( parseInt(e.target.textContent) )
        } else if(e.target.attributes[3].textContent.indexOf('next page') !== -1) {
            setPage( page + 1 )
        } else if(e.target.attributes[3].textContent.indexOf('previous page') !== -1) {
            setPage( page - 1 )
        }

        document.getElementById('gridList').scrollIntoView();
    }        

    useEffect(() => {
        setData( props.mostrarTudo ? _.chunk(props.data, 10) : props.data)

        console.log(props)
    }, []);   

    useEffect(() => {
        if(data && page) console.log(data[page - 1], props)
    }, [data, page]);   


    return (
        <Container className="container-grid">
            <div className="container">
                <GridHeader>
                    <Title>{props.title}</Title>
                    <SubTitle>{props.subtitle}</SubTitle>
                </GridHeader>

                {!props.mostrarTudo ? <Grid className="grid-area">
                    {data && data.length && (data.slice(0, 5).map((item, i) => (
                        <GridItem className={areas[i]}>
                            <Card>
                                <Thumbnail urlFotografia={item.urlFotografia} />
                                <CardInfo className="card-info">
                                    <InfoCell className="categoria">{item.areaMateria}</InfoCell>
                                    <InfoCell><Ico className="far fa-calendar"></Ico> {item.paraEditor}</InfoCell>
                                </CardInfo>
                                <CardTitle>{item.tituloMateria}</CardTitle>
                                {i == 0 && (
                                    <Text dangerouslySetInnerHTML={createHtml(item.lead)} />
                                )}
                                <Button className="btn" href={`/noticia/${item.idMateria}`}>Leia mais</Button>
                            </Card>
                        </GridItem>
                    )))}                    
                </Grid> : <GridList id="gridList">
                    {data && data.length && page && (data[page - 1].map((item, i) => (
                        <GridListItem>
                            <Card onClick={e => document.location = `/noticia/${item.idMateria}`}>
                                <CardInfo className="card-info">
                                    <InfoCell><Ico className="far fa-calendar"></Ico> {item.paraEditor}</InfoCell>
                                </CardInfo>
                                <CardTitle>{item.tituloMateria}</CardTitle>
                                {i == 0 && (
                                    <Text className="text" dangerouslySetInnerHTML={createHtml(item.lead)} />
                                )}
                            </Card>
                        </GridListItem>
                    )))}                    
                </GridList>}

                {!props.mostrarTudo ? <Button className="btn see-all" href={`${props.mostrarTudoUrl}`}>Ver tudo</Button> : data && data.length && (
                    <Stack spacing={2}>
                        <Pagination 
                        defaultPage={1} 
                        page={page} 
                        onChange={handleChange} 
                        boundaryCount={2}
                        count={data.length - 1} variant="outlined" shape="rounded" />
                    </Stack>                          
                )}       
            </div>
         
        </Container>    
    );
};
 
export default ContentGrid;