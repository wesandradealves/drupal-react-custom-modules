import "./style.scss";
import React from "react";
import calendarIcon from '../../../../assets/calendar-cinza.png';
import userIcon from '../../../../assets/user-cinza.png';
import Slider from "react-slick";
import "../../../Carousel/slick.scss";
import "../../../Carousel/slick-theme.scss";
import CardContribution from "../../../CardContribution";
import ContributionModal from "../../../ContributionModal";

export default class AllContributionList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contributionList: [],
			formatedContributions: [],
			selectedContribution: null,
			modalIsOpen: false,
		}
	}

	async componentDidMount() {
		var url = new URL(window.location.href);
		var id = url.searchParams.get("id");

		var requestData = {
			idConsultaPublica: id
		}

		var response = await fetch(`${window.location.origin}:5000/getAllContribuions`,
			{
				method: 'POST',
				body: JSON.stringify(requestData),
				headers: { 'Content-Type': 'application/json' },
			},
		);

		var data = await response.json();
		this.setState({ contributionList: data });

		console.log(data);
		this.formatContributions(data);
	}

	formatContributions(contributionList) {
		var formatedContributionsByPairs = contributionList.reduce(function (result, value, index, array) {
			if (index % 2 === 0)
				result.push(array.slice(index, index + 2));
			return result;
		}, []);

		console.log(formatedContributionsByPairs);

		this.setState({ formatedContributions: formatedContributionsByPairs });
		console.log(this.state.formatedContributions);
	}

	selectContribution = (contribution) => {
		this.setState({ selectedContribution: contribution, modalIsOpen: true });
	}

	unselectContribution = () => {
		this.setState({ selectedContribution: null, modalIsOpen: false })
	}

	render() {
		return (
			<>
				<ContributionModal
					closeModal={() => this.unselectContribution()}
					isOpen={this.state.modalIsOpen}
					contribution={this.state.selectedContribution}
				/>
				{this.state.contributionList.length > 0 ?
					<div className="allMyContributions">
						<h2 className="title">Contribuições</h2>
						<div className="consultationCarousel">
							{this.state.formatedContributions.length > 1 ?
								<Slider
									dots={true}
									arrows={false}
									lazyLoad={true}
									infinite={true}
									speed={500}
								>
									{this.state.formatedContributions.map((contributions) => {
										return (
											<>
												<div className="cardsWrapper">
													<CardContribution
														selectContribution={() => this.selectContribution(contributions[0])}
														contribution={contributions[0]}
													/>
													{contributions[1] &&
														<CardContribution
															selectContribution={() => this.selectContribution(contributions[1])}
															contribution={contributions[1]}
														/>
													}
												</div>
											</>
										);
									})}

								</Slider> : this.state.formatedContributions.map((contributions) => {
									return (
										<div className="cardsWrapper">
											<CardContribution
												selectContribution={() => this.selectContribution(contributions[0])}
												contribution={contributions[0]}
											/>
											{contributions[1] &&
												<CardContribution
													selectContribution={() => this.selectContribution(contributions[1])}
													contribution={contributions[1]}
												/>
											}
										</div>
									);
								})
							}
						</div>
					</div> : <></>
				}
			</>
		);
	}
}

