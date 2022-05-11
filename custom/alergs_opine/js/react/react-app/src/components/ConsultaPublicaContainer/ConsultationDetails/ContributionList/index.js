import React from "react";
import ReactPaginate from 'react-paginate';

import CardContribution from "../../../CardContribution";
import ContributionModal from "../../../ContributionModal";
import { scrollIntoView } from '../../../../helpers/Scroll';

import "./style.scss";

export default class ContributionList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contributionList: [],
			formatedContributions: [],
			selectedContribution: null,
			modalIsOpen: false,
			currentPage: 0,
			offset: 0,
			perPage: 4,
		}
	}

	async componentDidMount() {
		var url = new URL(window.location.href);
		var id = url.searchParams.get("id");

		var requestData = {
			idConsultaPublica: id,
			autorCpfCnpjInformado: null, //drupalSettings.user_cpf || drupalSettings.user_cnpj,
		}

		var response = await fetch(`${window.location.origin}:5000/getContribuionsList`,
			{
				method: 'POST',
				body: JSON.stringify(requestData),
				headers: { 'Content-Type': 'application/json' },
			},
		);

		var data = await response.json();
		console.log("data->", data)
		this.setState({ contributionList: data });
		this.formatContributions(data);
	}

	formatContributions(contributionList) {
		var formatedContributionsByPairs = contributionList.reduce(function (result, value, index, array) {
			if (index % 15 === 0)
				result.push(array.slice(index, index + 15));
			return result;
		}, []);

		this.setState({ formatedContributions: formatedContributionsByPairs });
	}

	selectContribution = (contribution) => {
		this.setState({ selectedContribution: contribution, modalIsOpen: true });
	}

	unselectContribution = () => {
		this.setState({ selectedContribution: null, modalIsOpen: false })
	}

	handlePageClick = (e) => {
		const selectedPage = e.selected;

		this.setState({
			currentPage: selectedPage,
		}, () => {
			scrollIntoView('my-contributions');
		});
	}

	render() {
		const { contributionList, formatedContributions, currentPage } = this.state;
		return (
			<>
				<ContributionModal
					closeModal={() => this.unselectContribution()}
					isOpen={this.state.modalIsOpen}
					contribution={this.state.selectedContribution}
				/>
				{contributionList.length > 0 ?
					<div className="myContributions" id="my-contributions">
						<h2 className="title">Contribuições</h2>
						<div className="consultationCarousel">
							{formatedContributions.length > 1 ?
								<div className="cardsWrapper">
									{formatedContributions && formatedContributions[currentPage] && formatedContributions[currentPage].map((item, i) => (
										<CardContribution
											selectContribution={() => this.selectContribution(item)}
											contribution={item}
											index={i}
										/>
									))}
								</div> : this.state.formatedContributions.map((contributions) => {
									return (
										<div className="cardsWrapper">
											{contributions.map((item, i) => (
												<CardContribution
													selectContribution={() => this.selectContribution(item)}
													contribution={item}
													index={i}
												/>
											))}
										</div>
									);
								})
							}
							<ReactPaginate
								previousLabel={"Anterior"}
								nextLabel={"Próximo"}
								breakLabel={"..."}
								breakClassName={"break-me"}
								pageCount={formatedContributions.length}
								marginPagesDisplayed={2}
								pageRangeDisplayed={5}
								onPageChange={this.handlePageClick}
								containerClassName={"pagination"}
								subContainerClassName={"pages pagination"}
								activeClassName={"active"}
							/>
						</div>
					</div> : <></>
				}
			</>
		);
	}
}

