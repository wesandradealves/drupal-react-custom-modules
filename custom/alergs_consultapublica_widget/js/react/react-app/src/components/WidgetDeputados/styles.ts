import styled, { css } from 'styled-components';

interface ITypes {
    src?:string;
}

export const Title = styled.h3`
    color: white;
`;

export const Subtitle = styled.p`
    margin: 5px 0 35px;
`;

export const Select = styled.div`
    margin-bottom: 35px;
    overflow: hidden;
    border-radius: 15px;
    padding: 0 10px 0 20px;
    border: 1px white solid;    
    cursor: pointer;
    position: relative;
    select {
        background: none;
        border: 0;
        width: calc(100% + 30px);     
        color: white;   
        font-size: .8rem;
        cursor: inherit;
        padding-top: 10px;
        padding-bottom: 10px;
        position: relative;
        option {
            color: black;
        }
        z-index: 2;
    }
    &::after {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        display: block;
        z-index: 1;
        width: 45px;
        height: 100%;
        background: url(/modules/custom/alergs_deputados_widget/img/favpng_arrow-drop-down-list-symbol.png) center center / 20px no-repeat white;
    }
`;

export const Icon = styled.i`

`;

export const CardItem = styled.div`
    color: black;
    background-color: white;
    border-radius: 20px;
    position: relative;
    display: none;
    &::after {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 30px 0 30px 30px;
        border-color: transparent transparent transparent white;
        content: '';
        position: absolute;
        right: -30px;
        top: calc(50% - 30px);     
    }
    .row {
        align-items: stretch;
    }
`;

export const TextCard = styled.p`

`;

export const TitleCard = styled.h3`
    font-size: 1.5rem;
`;

export const Thumbnail = styled.div<ITypes>`
    width: 100%;
    height: 0;
    padding: 0 0 100%;
    display: block;
    ${({ src }) => src && css`
        background: url(${src}) center center / cover no-repeat transparent;
    `}     
`;

