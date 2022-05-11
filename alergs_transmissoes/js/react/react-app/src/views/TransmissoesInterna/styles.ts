import styled, { css } from 'styled-components';

interface ITypes {

}

export const Banner = styled.div`
    overflow: hidden;
    padding-top: 56.25%;
    position: relative;
`;

export const Iframe = styled.iframe`
    border: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
`;

export const PostHeader = styled.div`

`;

export const Tipo = styled.small`
    background-color: #293341;
    color: white;
    padding: 6px 6px;
    font-size: .8rem;
    font-weight: bold;
    display: block;
    margin-right: auto;
    margin-bottom: 10px;
    text-transform: uppercase;
`;

export const Subtipo = styled.small`
    font-size: 70%;
    font-weight: bold;
    margin: 5px 0 0;
`;

export const Titulo = styled.h2`
    display: flex;
    flex-flow: column;
    font-size: 1.5rem;
    font-weight: bold;    
`;

export const Descricao = styled.p`
    display: block;
    margin: 20px 0;
    color: gray;
    font-size: 1rem;
    line-height: initial;
`;

export const PostFooter = styled.div`
    display: flex;
    align-items: flex-end;
`;

export const Column = styled.p`
    color: gray;
    font-size: .8rem;
    &:not(:first-child) {
        margin-left: 15px;
    }
`;

export const Content = styled.div`
    background-color: #F3F7FC;
    .container {
        padding-top: 300px;
        margin-top: -280px;
        padding-bottom: 30px;    
        @media only screen and (min-width: 1336px) {
            padding-left: 110px;
            padding-right: 110px; 
        }          
    }
`;

export const DescricaoPrefix = styled.strong`
    font-weight: bold;
    display: block;
    color: black;
    margin-bottom: 15px;
`;

export const PostFooterPrefix = styled.strong`
    font-weight: bold;
    display: block;
    color: black;
    margin-bottom: 5px;
    font-size: 1rem;
`;