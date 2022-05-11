import styled, { css } from 'styled-components';

interface ITypes {
    fontSize?: string,
    vertical?: boolean,
    background?: string,
    urlFotografia?: string,
    lightbox?: boolean
}

export const Container = styled.section<ITypes>`
    .container {
        padding-top: 60px;
        padding-bottom: 60px;
    }
    background-color: white;
    margin: 0 -35px;
`;

export const GridHeader = styled.div<ITypes>`
    text-align: center;
    margin-bottom: 60px;
`;

export const Title = styled.h2<ITypes>`
    font-size: 2.2rem;
    font-weight: bold;
`;

export const SubTitle = styled.h3<ITypes>`
    font-size: .95rem;
    font-family: "Noto Serif";
`;

export const Card = styled.div<ITypes>`
    ${({ background }) => background && css`
        background: ${background}
    `}    
    overflow: hidden;
    @media only screen and (min-width: 1024px) {
        height: 100%;
    }
    border-radius: 0 0 40px 40px;
    color: #293341;
    padding: 15px;
    display: flex;
    flex-flow: column;
    .btn {
        margin-right: auto;
    }
    &[onClick] {
        cursor: pointer
    }
`;

export const CardTitle = styled.h3<ITypes>`
    font-size: .9rem;
    ${({ fontSize }) => fontSize && css`
        font-size: ${fontSize};
    `}      
    font-weight: bold;
    margin-bottom: 25px;
    &:last-child {
        margin-bottom: 0
    }
`;

export const Text = styled.p<ITypes>`
    margin-bottom: 20px;
`;

export const CardInfo = styled.div<ITypes>`
    display: flex;
    flex-flow: row wrap;    
    align-items: center;
    margin: 35px 0px 15px;
    ${({ vertical }) => vertical && css`
        flex-flow: column wrap;
        align-items: flex-start;
        margin: 25px 0px 15px;
    `}       
    text-transform: uppercase;
    font-size: .7rem;
    &:last-child,
    &:first-child {
        margin-top: 0;
    }
    &:last-child {
        margin-bottom: 0;
    }
    > * { 
        &.categoria {
            padding: 4px 8px;
            background-color: white;
        }
        &:not(:last-child) {
            margin-right: 10px;
        }
    }
`;

export const InfoCell = styled.p<ITypes>`
      
`;

export const Ico = styled.i<ITypes>`
    display: inline-block;
    margin-right: 5px;
    color: #d7dbe0;
    fill: #d7dbe0;
    font-size: 15px;
`;

export const Button = styled.a<ITypes>`
    background: #293341;
    color: white !important;
    line-height: 3;
    display: inline-block;
    padding: 0 30px;
    font-size: .8rem;
    border-radius: 999px;
    text-transform: uppercase;
    &:hover {
        background-color: #15894f;
    }
    &.see-all {
        background-color: white;
        border-radius: 0;
        color: #293341 !important;
        &:hover {
            background-color: inherit;
        }
        border: 2px #f3f7fc solid;
        margin: 60px auto 0;
        width: 155px;
        line-height: 4.5;
        display: block;
    }
`;

export const Thumbnail = styled.div<ITypes>`
    background-color: lightgray;
    padding: 0 0 50%;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: ${({ urlFotografia }) => `url(${urlFotografia})`};
    margin: -15px -15px 0;
    cursor: ${({ lightbox }) => lightbox ? 'pointer' : 'initial'};
`;

export const Grid = styled.div<ITypes>`
    display: grid; 
    gap: 30px 30px;
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    grid-template-areas: 
        "Featured Featured Featured Featured"
        "A1 A1 A1 A1"
        "A2 A2 A2 A2"
        "A3 A3 A3 A3"
        "A4 A4 A4 A4"; 
    @media only screen and (min-width: 1024px) {
        grid-template-areas: 
        "Featured Featured Featured Featured"
        "A1 A1 A2 A2"
        "A3 A3 A4 A4";  
        @media only screen and (min-width: 1280px) {
            grid-template-areas: 
            "Featured Featured A1 A2"
            "Featured Featured A3 A4";  
        } 
    }
`;

export const GridItem = styled.div<ITypes>`
    &.Featured { grid-area: Featured; }
    &.A1 { grid-area: A1; }
    &.A2 { grid-area: A2; }
    &.A3 { grid-area: A3; }
    &.A4 { grid-area: A4; }
    &:not(:first-child) {
        .card-info {
            margin: 25px 0px 15px;
        }       
    }
    &:first-child {
        .btn {
            margin-top: auto;
            display: inline-block;
        }         
    }
`;

export const GridList = styled.div<ITypes>`
    display: flex;
    flex-flow: column wrap;
`;

export const GridListItem = styled.div<ITypes>`
    background-color: #f3f7fc;
    cursor: pointer;
    &:not(:last-child) {
        margin-bottom: 15px;
    }
    > * > * {
        margin-bottom: 0;
    }
    h3 {
        margin: 5px 0 10px;
        font-size: 1.3rem;        
    }
`;
