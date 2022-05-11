import "./style.scss";

import React from "react";
import Modal from "react-modal";
import calendarIcon from '../../assets/calendar-cinza.png';
import userIcon from '../../assets/user-cinza.png';
import fecharX from '../../assets/fechar-x.png';
import anexo from '../../assets/visualizar-anexo.png';
import moment from "moment";

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(51, 51, 51, 0.6)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		borderRadius: '20px',
		width: '60%',
		height: '80%',
		transform: 'translate(-50%, -50%)'
	}
};

export default class ContributionModal extends React.Component {
	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				style={customStyles}
			>
				<div className="contributionModal">
					{this.props.contribution &&
						<>
							<div className="contributionContent">
								<div className="modalHeader">
									<div className="infoRow">
										<div className="labeledIcon">
											<img src={userIcon} className="icon" alt="logo" />
											<h1 className='label'>
												{this.props.contribution.autorNome}

											</h1>
										</div>
										<div className="labeledIcon">
											<img src={calendarIcon} className="icon" alt="logo" />
											<h1 className='label'>
												{moment(this.props.contribution.dataCadastro).format("DD/MM/YYYY")}
											</h1>
										</div>
									</div>
									<button onClick={this.props.closeModal} className="closeButton"><img src={fecharX} alt="fechar"/></button>
								</div>
								<p className="contributionText">
									{this.props.contribution.texto}
								</p>
							</div>
							<div className="buttonsRow">

								<button
									onClick={this.props.closeModal}
									className="modalButton"
								>
									<p>FECHAR</p>
								</button>
								{this.props.contribution.anexos && this.props.contribution.anexos[0] &&
									< a
										href={this.props.contribution.anexos[0].url}
										className="modalLink"
										target="_blank"
									>
										<img src={anexo} alt="Anexo"/>
									</a>
								}
							</div>
						</>
					}
				</div>
			</Modal >
		);
	}

}