import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import { SectionTitle } from './styles.ts';
import Card from "../../components/Card";
import './styles.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { 
	listarDestaqueDeputados
  } from '../../services/services';

const Deputados = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
      const response = await listarDestaqueDeputados().then(res => {
          return JSON.parse(res).lista;
      }).catch(err => console.log(err))

      return response;
    }    

    useEffect(() => {
		fetchData().then(res => {
			setData(res)
		}).catch(err => console.log(err));
    }, []); 

    return (
		<section className="deputadosContainer">
			<div className="container">
				<SectionTitle className="title">Deputados da 55ª Legislatura</SectionTitle>
				{data && (<Row className="grid">
					{data.sort((a, b) => a.nomeDeputado > b.nomeDeputado ? 1:-1).map((deputado, i) => (
						<Col xs={12} sm={6} md={3}>
							<Card data={deputado} />
						</Col>
					))}
				</Row>)}
			</div>
		</section>    
    );
};
 
export default Deputados;