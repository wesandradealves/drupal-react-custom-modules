import styled, { css } from 'styled-components';

interface ITypes {
    src?: string;
    align?: string;
    compact?: boolean;
    stretch?: boolean;
    color?: string;
    displaySettings?: string;
}

export const Columns = styled.section`
    .container {
        display: flex;
        align-items: stretch;
        flex-flow: row wrap;
        width: 100%;
        &.--center {
            > div {
                display: flex;
                flex-flow: column;
                align-items: center;
            }
        }
    }
`;

export const Column = styled.div`
    flex: 0 0 auto;
    width: 100%;
    @media only screen and (min-width: 1024px) {
        width: 50%;
        &:not(:last-child) {
            margin-bottom: 0
        }
    }    
    &:not(:last-child) {
        margin-bottom: 30px;
    }
    &:only-child {
        width: 100%;
    }
    padding: 0 30px;
`;

export const SectionTitle = styled.h2<ITypes>`
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 40px;
    width: 100%;
    text-align: left;
    display: block;
    &.--flex {
        display: flex
    }
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    a {
        &.--see-all {
            padding: 0 40px;
            flex: 0 0 auto;
            margin: 0;
        }
    }
    ${({ align }) => align && css`
        text-align: ${align}
    `}       
    & + p {
        display: block;
        margin-bottom: 40px;
        margin-top: -35px;
    }
    ${({ color }) => color && css`
        color: ${color}
    `}      
`;


export const SmallText = styled.p`
    display: block;
    margin-bottom: 40px;
    margin-top: 35px;
    font-size: .8rem;
    font-weight: normal;
`;

export const SectionHeaderText = styled.p`

`;

export const SectionHeader = styled.div`
    text-align: center;
    h2 {
        text-align: inherit;
    }
`;

export const Button = styled.a`
    padding-left: 60px;
    padding-right: 60px;
    border-radius: 999px;
    font-size: .8rem;
    text-transform: uppercase;
    cursor: pointer;
    line-height: 3.8;
    display: inline-block;
    background-color: whitesmoke;
    color: white !important;
    &.--blue {
        background-color: #293341;
    }
    &.--green {
        background-color: #15894f;
    }    
    &.--see-all {
        margin-top: 25px;
    }
    text-align: center;
    text-decoration: none!important;
`;


export const CarrouselItem = styled.div<ITypes>`
    color: #293341;
    h4 {
        font-size: 1.4rem;
        font-weight: bold;
        margin-bottom: 25px;
        small {
            display: flex;
            align-items: center;
            font-size: .8rem;
            text-transform: uppercase;
            margin-bottom: inherit;
            margin-bottom: 15px;
            [class*="fa"] {
                color: #d7dbe0;
                margin-right: 8px
            }
            &:last-child {
                margin-bottom: 0;
                margin-top: 15px;
            }
        }
    }
    ${({ compact }) => compact && css`
        h4 {
            font-size: .8rem;
            font-weight: normal;
        }
    `} 
    ${({ stretch }) => stretch && css`
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        height: 100%;
        .--see-all {
            margin-top: 0;
            margin-right: auto;
        }
    `}     
`;

export const Agenda = styled.div`
    background-color: #293341;
    color: white;
    border-radius: 20px;
    padding: 45px;
    height: 100%;
    overflow: auto;
    max-height: 285px;
    .item {
        color: inherit;
        h4 {
            margin-bottom: 0;
        }
        &:not(:last-child) {
            border-bottom: 1px rgba(255,255,255,.1) solid;
            padding-bottom: 25px;
            margin-bottom: 25px;
        }        
    }
`;