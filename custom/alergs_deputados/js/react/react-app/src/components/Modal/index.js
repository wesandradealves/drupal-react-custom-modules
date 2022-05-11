// import React from "react";
// import { MdClose } from "react-icons/md";
// import { Container, ModalInner, ModalContent, Close, Title } from './styles.ts';
// import './styles.scss';
// export default class Modal extends React.Component {
//     constructor(props) {
//         super(props);
//     }

// 	closeModal = () => {
//         this.props.onClose(true);
// 	}

//     createHtml = (str) => {
//         return {__html: str};
// 	}
  
//     render() {
//         return (
//             <Container isOpened={this.props.isOpened}>
//                 <ModalInner id="modalInner">
//                     <ModalContent dangerouslySetInnerHTML={this.createHtml(this.props.content)} />
//                     <Close onClick={() => this.closeModal()}>Voltar</Close>
//                 </ModalInner>
//             </Container>
//         );
//     }
// }

import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { Container, ModalInner, ModalContent, Close, Title } from './styles.ts';
import './styles.scss';

const Modal = ({
    ...props
}) => {
	const closeModal = () => {
        props.onClose(true);
	}

    const createHtml = (str) => {
        return {__html: str};
	}    

    useEffect(() => {
        document.getElementById('modalInner').scrollIntoView();
    }, []); 

    return (
        <Container isOpened={props.isOpened}>
            <ModalInner id="modalInner">
                <ModalContent dangerouslySetInnerHTML={createHtml(props.content)} />
                <Close onClick={() => closeModal()}>Voltar</Close>
            </ModalInner>
        </Container>
    );
};
 
export default Modal;