import styled, { css } from 'styled-components';

interface ITypes {
    isOpened?: boolean;
}

export const Container = styled.div<ITypes>`
    display: none;
    ${({ isOpened }) => isOpened && css`
        display: flex;
    `}    
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 15;
    background-color: rgba(0,0,0,.7);
    padding: 30px;
    height: 100%;
    width: 100%;    
`;

export const ModalInner = styled.div`
    background-color: white;
    padding: 90px 60px 30px;
    border-radius: 20px;
    position: relative;
    h2 {
        font-weight: bold;
        font-size: 1.6rem;
        @media only screen and (min-width: 1024px) {
            font-size: 2.3rem;
        }
        text-align: center;
        display: block;
        margin-bottom: 30px;        
    }
`;

export const ModalContent = styled.div`
    font-size: .9rem;
    text-align: justify;
    line-height: 1.3;
`;

export const Close = styled.a`
    padding: 13px 50px;
    font-size: 0.9rem;
    text-align: center;
    border-radius: 20px;
    margin: 300px 0px 0px;
    display: inline-block;
    border: 2px blue solid;
    border-color: lightseagreen;
    text-transform: uppercase;  
    cursor: pointer;
`;