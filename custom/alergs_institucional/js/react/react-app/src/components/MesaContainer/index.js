import React from "react";

import "./style.scss";
import Card from "../Card";
import { Grid } from './styles.ts';
import Slider from "react-slick";
/* import "slick-carousel/slick/slick-theme.scss"; */
import OwlCarousel from 'react-owl-carousel-autoheight';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { ObterMesaDiretora, ObterPlenario } from '../../services/services'
import Select from 'react-select';
import WidgetDeputados from '../WidgetDeputados';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Title, Subtitle, CardItem, TitleCard, TextCard, Thumbnail } from '../WidgetDeputados/styles.ts';
/* import OwlCarousel from 'react-owl-carousel'; */
import {
	Button,
	/*     Navigation, 
		NavItem, 
		Icon, 
		Caption, 
		Columns, 
		Column,
		SectionTitle, */
	CarrouselItem,
	/*     SectionHeader,
		SectionHeaderText,
		Agenda */
} from './styles.ts';

export default class MesaContainer extends React.Component {

	constructor(props) {

		super(props);
		this.fileRef = React.createRef();
		this.options = { onInitialized: function () { this.carousel = this; } }

		this.state = {
			mesas: [],
			data: [],
			showDiv: false,
			nomeBancadas: [],
			ApenasMesa: this.props.onlyTable
		}



	}
	componentDidUpdate(prevProps, prevState) {

		if (this.state.mesas.length == 0 && this.props.data.length) {
			this.setState({ mesas: this.props.data });
		}

	}

	handleValueChange = event => {

		console.log({ value: event.label, id: event.value, sigla: event.sigla, email: event.email, foto: event.foto, cargo: event.cargo, telefone: event.telefone, nome: event.nome })

		this.setState({ value: event.label, id: event.value, sigla: event.sigla, email: event.email, foto: event.foto, cargo: event.cargo, telefone: event.telefone, nome: event.nome })
		this.fetchData()

	}


	handleValueOnhover = mesa => {


		this.setState({ showDiv: 'block' });
		this.setState({ value: mesa.label, id: mesa.value, sigla: mesa.sigla, email: mesa.email, foto: mesa.foto, cargo: mesa.cargo, telefone: mesa.telefone, nome: mesa.nome })
		this.fetchData()

	}

	handleValueOnclick = mesa => {

		this.setState({ showDiv: 'block' });
		this.setState({ value: mesa.label, id: mesa.value, sigla: mesa.sigla, email: mesa.email, foto: mesa.foto, cargo: mesa.cargo, nome: mesa.nome })
		this.fetchData()

	}



	createGroups(arr, numGroups) {
		const perGroup = Math.ceil(arr.length / numGroups);
		return new Array(numGroups)
			.fill('')
			.map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
	}

	getBancadas(arr, nomeBancadas) {

		this.state.nomeBancadas.map((bancada, i) => {

		})
	}



	fetchData = async () => {
		const response = await ObterMesaDiretora().then(data => {
			console.log(data);
			return JSON.parse(data).lista
		}).catch(err => console.log(err));

		this.setState({ data: response })

	}

	componentDidMount = async () => {
		this.fetchData();

	}

	render() {
		return (
			<WidgetDeputados
				redirectBaseUrl="/deputados/"
				title="Mesa Diretora"
				subtitle="Conheça os Deputados que fazem parte da Mesa Diretora da ALRS"
				optionLabel="nome"
				optionValue="nome"
				data={this.state.data} />
		);
	}

	// render() {
	// 	const showDiv =  this.state.showDiv;
	// 	const teste = 'psol';
	// 	const groupedData = this.createGroups(this.state.mesas,3);
	// 	//const loadBancadas = this.getBancadas(this.state.mesas,3);
	// 	//console.log(groupedData);
	// 	const { selectedOption } = this.state;
	// 	var settings = {
	// 		dots: true,
	// 		infinite: true,
	// 		speed: 500,
	// 		slidesToShow: 1,
	// 		slidesToScroll: 1,
	// 		className: 'sample'
	// 	  };
	// 	const customStyles = {
	// 		option: (provided, state) => ({
	// 		  ...provided,
	// 		  /* borderBottom: '1px dotted #293341',*/
	// 		  color: state.isSelected ? 'red' : 'blue',
	// 		  padding: 15,
	// 		}),
	// 		placeholder: (defaultStyles) => {
	// 			return {
	// 				...defaultStyles,
	// 				color: '#ffffff',


	// 				textTransform: 'uppercase',
	// 			}
	// 		}
	// 	};
	// 	var responsive ={

	// 			// breakpoint from 0 up
	// 			0:{
	// 				items:1
	// 			},
	// 			600:{
	// 				items:1
	// 			},
	// 			1000:{
	// 				items:1
	// 			}

	// 	}

	// 	const options = this.state.mesas.sort((a, b) => a.ordem > b.ordem ? 1:-1).map((mesa, i) => {
	// 		return {
	// 		   label: mesa.nome,
	// 		   value: mesa.idDeputado,
	// 		   sigla: mesa.sigla,
	// 		   email: mesa.email,
	// 		   foto: mesa.foto,
	// 		   cargo: mesa.cargo,
	// 		   nome: mesa.nome,
	// 		}
	//    	})

	// 	//console.log(this.createGroups(this.state.mesas,4));
	// 	if(this.state.ApenasMesa) {

	// 		return(
	// 			<WidgetDeputados 
	// 			redirectBaseUrl="/deputados/"
	// 			title="Conheça os Parlamentares" 
	// 			subtitle="Selecione um(a) deputado(a)" 
	// 			optionLabel="nomeDeputado"
	// 			optionValue="nomeDeputado"
	// 			data={this.state.data} />
	// 		);
	// 	}



	// 	return(
	// 		<>
	// 		<section className="deputadosContainer">
	// 			<div className="container">
	// 				<div class="row column-mobile">
	// 					<div class="col right p-5">
	// 						<h2 className="nomeMesa">Mesa Diretora</h2>
	// 						<h3 className="title">{this.props.title}</h3>
	// 						<div class="space-select">
	// 							<Select
	// 								className='select-md'
	// 								classNamePrefix='filter'
	// 								label="Single select"
	// 								placeholder={'Selecione um(a) deputado(a)'}
	// 								value={selectedOption}
	// 								onChange={(event) => this.handleValueChange(event)}
	// 								options={options} />
	// 						</div>


	// 						<div id="showCard" class="spaceCard" style={{ display: showDiv ? 'block' : 'none' }}>
	// 							<div class="row pt-4 pb-4">
	// 								<div class="col-md-3">
	// 									<img class="img-responsive" src={this.state.foto} />
	// 								</div>
	// 								<div class="col-xs-3 col-md-9">
	// 									<div class="first">
	// 										<h2 className="nomeDeputado">Dep. {this.state.nome}</h2>
	// 										<div class="deputadoCargo">{this.state.cargo}</div>
	// 										<div className="item-infos-dep">
	// 										<p>Partido: {this.state.sigla}</p>
	// 										<p>Email: {this.state.email}</p>
	// 										<p>Telefone: {this.state.telefone}</p>
	// 										</div>
	// 									</div>
	// 								</div>
	// 							</div>
	// 						</div>


	// 					</div>
	// 					<div class="col right slider">

	// 						<OwlCarousel autoHeight={false} className='owl-theme'
	// 							responsive={responsive} 
	// 							loop={true} stagePadding={0}
	// 							margin={4}
	// 							checkVisibility={true}
	// 							navElement='div'
	// 							item margin={0} dots={false} nav={true}>


	// 							{groupedData.map((group, i) => {
	// 								return (
	// 								group.reduce(
	// 									function(accumulator, currentValue, currentIndex, array) {
	// 										if (currentIndex % 4 === 0)
	// 											accumulator.push(array.slice(currentIndex, currentIndex + 4));
	// 										return accumulator;
	// 									}, []
	// 								).map(mesa => {
	// 									return(
	// 										<div className="container-images">
	// 											{mesa[0] &&
	// 												<img onMouseOver={() => { this.handleValueOnhover(mesa[0]); } } src={mesa[0].foto} />
	// 											}
	// 											{mesa[1] &&
	// 												<img onMouseOver={() => { this.handleValueOnhover(mesa[1]); } } src={mesa[1].foto} />
	// 											}
	// 											{mesa[2] &&
	// 												<img onMouseOver={() => { this.handleValueOnhover(mesa[2]); } } src={mesa[2].foto} />
	// 											}
	// 											{mesa[3] &&
	// 												<img onMouseOver={() => { this.handleValueOnhover(mesa[3]); } } src={mesa[3].foto} />
	// 											}
	// 										</div>
	// 									)
	// 								})
	// 							)})}
	// 						</OwlCarousel>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</section>
	// 		<section>
	// 			<div className="container">
	// 				<h2 className="titlePlenario">Conheça o Plenário</h2>
	// 				<h3 className="descPlenario">Clique e conheça a composição das Bancadas partidárias da ALRS.</h3>
	// 			</div>
	// 			<div class="container divPlenario">
	// 				<div class="row seven-cols">
	// 					<div class="col-md-1">
	// 						<div>

	// 								<div class="row pt-5">
	// 									<div class="circleNone"></div>
	// 									<div class="circle psol" onChange={(event) => this.handleValueChange(event)} onclick={() => { this.handleValueOnclick(teste); } }>PSOL</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="circleNone"></div>
	// 									<div class="circle pros">PROS</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="circleNone"></div>
	// 									<div class="circle solid">SOLID</div>
	// 								</div>

	// 						</div>
	// 					</div>
	// 					<div class="col-md-1">
	// 						<div class="rows">

	// 								<div class="row pt-5">
	// 									<div class="circle pdt">PDT</div>
	// 									<div class="circle pdt">PDT</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="circle pdt">PDT</div>
	// 									<div class="circle pdt">PDT</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="circle repub">REPUB</div>
	// 									<div class="circle repub">REPUB</div>
	// 								</div>
	// 								<div class="row pt-5">
	// 									<div class="circleNone"></div>
	// 									<div class="circleNone"></div>
	// 								</div>
	// 								<div class="row pt-5">
	// 									<div class="circleNone"></div>
	// 									<div class="circleNone"></div>
	// 								</div>

	// 						</div>
	// 					</div>
	// 					<div class="col-md-1">
	// 						<div class="rows">

	// 								<div class="row pt-5">
	// 									<div class="circle pt">PT</div>
	// 									<div class="circle pt">PT</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="  circle pt">PT</div>
	// 									<div class="  circle pt">PT</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="  circle pt">PT</div>
	// 									<div class="  circle pt">PT</div>
	// 								</div>
	// 								<div class="row pt-5">
	// 									<div class="  circle pt">PT</div>
	// 									<div class="  circle pt">PT</div>
	// 								</div>
	// 								<div class="row pt-5">
	// 									<div class="  circleNone"></div>
	// 									<div class="  circleNone"></div>
	// 								</div>

	// 						</div>
	// 					</div>
	// 					<div class="col-md-1">
	// 						<div class="rows">

	// 								<div class="row pt-5">
	// 									<div class="  circle ptb">PTB</div>
	// 									<div class="  circle ptb">PTB</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="  circle ptb">PTB</div>
	// 									<div class="  circle ptb">PTB</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="  circle psd">PSD</div>
	// 									<div class="  circle ptb">PTB</div>
	// 								</div>
	// 								<div class="row pt-5">
	// 									<div class="  circle pl">PL</div>
	// 									<div class="  circle pl">PL</div>
	// 								</div>

	// 						</div>
	// 					</div>
	// 					<div class="col-md-1">
	// 						<div class="rows">

	// 								<div class="row pt-5">
	// 									<div class="  circle pp">PP</div>
	// 									<div class="  circle pp">PP</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="  circle pp">PP</div>
	// 									<div class="  circle pp">PP</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="  circle pp">PP</div>
	// 									<div class="  circle pp">PP</div>
	// 								</div>
	// 								<div class="row pt-5">
	// 									<div class="  circle psl">PSL</div>
	// 									<div class="  circle psl">PSL</div>
	// 								</div>
	// 								<div class="row pt-5">
	// 									<div class="  circle psl">PSL</div>
	// 									<div class="  circle psl">PSL</div>
	// 								</div>

	// 						</div>
	// 					</div>
	// 					<div class="col-md-1">
	// 						<div class="rows">

	// 								<div class="row pt-5">
	// 									<div class="circle mdb">MDB</div>
	// 									<div class="circle mdb">MDB</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="circle mdb">MDB</div>
	// 									<div class="circle mdb">MDB</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="circle mdb">MDB</div>
	// 									<div class="circle mdb">MDB</div>
	// 								</div>
	// 								<div class="row pt-5">
	// 									<div class="circle mdb">MDB</div>
	// 									<div class="circle mdb">MDB</div>
	// 								</div>
	// 								<div class="row pt-5">
	// 									<div class="circle dem">DEM</div>
	// 									<div class="circle dem">DEM</div>
	// 								</div>

	// 						</div>
	// 					</div>
	// 					<div class="col-md-1">
	// 						<div class="rows">

	// 								<div class="row pt-5">
	// 									<div class="circle psb">PSB</div>
	// 									<div class="circle psb">PSB</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="circle cidad">CIDAD</div>
	// 									<div class="circle psb">PSB</div>
	// 								</div>

	// 								<div class="row pt-5">
	// 									<div class="circle psdb">PSDB</div>
	// 									<div class="circle psdb">PSDB</div>
	// 								</div>
	// 								<div class="row pt-5">
	// 									<div class="circle psdb">PSDB</div>
	// 									<div class="circle psdb">PSDB</div>
	// 								</div>
	// 								<div class="row pt-5">
	// 									<div class="circle novo">NOVO</div>
	// 									<div class="circle novo">NOVO</div>
	// 								</div>

	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>	
	// 		</section>


	// 		<section className="deputadosContainer">
	// 			<div className="container">
	// 				<div class="row column-mobile">
	// 					<div class="col left slider">
	// 						<OwlCarousel autoHeight={false} className='owl-theme'
	// 							responsive={responsive} 
	// 							loop={true} stagePadding={0}
	// 							margin={4}
	// 							checkVisibility={true}
	// 							navElement='div'
	// 							item margin={0} dots={false} nav={true}>


	// 							{groupedData.map((group, i) => {
	// 								return (
	// 								group.reduce(
	// 									function(accumulator, currentValue, currentIndex, array) {
	// 										if (currentIndex % 4 === 0)
	// 											accumulator.push(array.slice(currentIndex, currentIndex + 4));
	// 										return accumulator;
	// 									}, []
	// 								).map(mesa => {
	// 									return(
	// 										<div className="container-images">
	// 											{mesa[0] &&
	// 												<img onMouseOver={() => { this.handleValueOnhover(mesa[0]); } } src={mesa[0].foto} />
	// 											}
	// 											{mesa[1] &&
	// 												<img onMouseOver={() => { this.handleValueOnhover(mesa[1]); } } src={mesa[1].foto} />
	// 											}
	// 											{mesa[2] &&
	// 												<img onMouseOver={() => { this.handleValueOnhover(mesa[2]); } } src={mesa[2].foto} />
	// 											}
	// 											{mesa[3] &&
	// 												<img onMouseOver={() => { this.handleValueOnhover(mesa[3]); } } src={mesa[3].foto} />
	// 											}
	// 										</div>
	// 									)
	// 								})
	// 							)})}
	// 						</OwlCarousel>
	// 					</div>
	// 					<div class="col right p-5">
	// 						<div class="pull-right">
	// 							<h2 className="nome-bancada">Bancada Selecionada</h2>
	// 						</div>
	// 						<div class="pull-right">	
	// 							<h3 className="title-bancada">Conheça os Deputados.</h3>
	// 						</div>
	// 						<div class="space-select-right">
	// 						<Select
	// 								className='select-md'
	// 								classNamePrefix='filter'
	// 								label="Single select"
	// 								placeholder={'Selecione um(a) deputado(a)'}
	// 								value={selectedOption}
	// 								onChange={(event) => this.handleValueChange(event)}
	// 								options={options} />
	// 						</div>


	// 						<div id="showCard" class="spaceCard-right pull-right" style={{ display: showDiv ? 'block' : 'none' }}>
	// 							<div class="row p-4">
	// 								<div class="">
	// 									<img class="img-responsive" src={this.state.foto} />
	// 								</div>
	// 								<div class="col-xs-3 col-md-6">
	// 									<div class="first">
	// 										<h2 className="nomeDeputado">Dep.{this.state.value}</h2>
	// 										<div class="deputadoCargo">{this.state.cargo}</div>
	// 										<p>Partido: {this.state.sigla}</p>
	// 										<p>Email: {this.state.email}</p>
	// 										<p>Telefone: {this.state.telefone}</p>
	// 									</div>
	// 								</div>
	// 							</div>
	// 						</div>


	// 					</div>

	// 				</div>
	// 			</div>
	// 		</section>
	// 	</>		
	// 	);
	// }
}