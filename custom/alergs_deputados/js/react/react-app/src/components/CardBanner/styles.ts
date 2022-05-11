import styled, { css } from 'styled-components';

interface ITypes {
    background: string;
    fotoGrandeDeputado: string;
    src: string;
}

export const Navigation = styled.nav`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: stretch;
    margin: 0px auto 50px;
    padding: 0;
    .row {
        width: 100%;
    }
`;

export const NavItem = styled.span`
    display: flex;
    align-items: center;
    flex-flow: column;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    transition: 500ms ease all;
    text-decoration: none !important;
    cursor: pointer;
    border: 1px rgba(0,0,0,0) solid;
    &:hover,
    &.isActive {
        box-shadow: black 0px 5px 20px -15px;
        border: 1px lightgray solid;
    }
`;

export const Caption = styled.h2`
    display: block;
    margin-top: 35px;
    color: #293341;
    font-size: 1rem;
    font-weight: bold;
    line-height: 1;
    text-align: center;
`;

export const Icon = styled.img<ITypes>`
    height: 45px;
    width: auto;
    display: block;
    padding: 0;
`;

export const Banner = styled.div<ITypes>`
    ${({ background }) => background && css`
        background: url(${background}) center 0 / cover no-repeat;
    `}  
    margin-bottom: 80px;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    @media only screen and (min-width: 1024px) {
        height: 300px;
    }    
    .container {
        display: flex;
        flex-flow: row wrap;
        align-items: flex-end;
        padding-bottom: 45px;
        justify-content: center;
        text-align: center;
        @media only screen and (min-width: 1024px) {
            justify-content: flex-start;
            text-align: initial;
        }            
    }
`;

export const Thumbnail = styled.div<ITypes>` 
    height: 320px;
    width: 320px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;  
    margin-bottom: 30px;
    @media only screen and (min-width: 1024px) {
        margin-bottom: -90px; 
    }     
    img {
        display: block;
        width: inherit;
        height: auto;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;        
    }
    ${({ fotoGrandeDeputado }) => fotoGrandeDeputado && css`
        background: url(${fotoGrandeDeputado}) center center / cover no-repeat whitesmoke;
        img {
            display: none;
        }        
    `}      
    cursor: pointer;
`;

export const Info = styled.div<ITypes>`
    flex: 1;
    color: white;
    ul, p {
        margin: 0;
        padding: 0;
    }
    padding-left: 45px;
    ul {
        display: flex;
        align-items: center;
        > li {
            &:not(:last-child) {
                padding-right: 60px;
            }
        }
    }
    p {
        display: block;
        margin: 15px 0;
    }
    h2 {
        font-size: 2rem;
        font-weight: bold;
    }
`;

export const Columns = styled.section`
    .container {
        display: flex;
        align-items: stretch;
        flex-flow: row wrap;
        width: 100%;
    }
`;

export const Column = styled.div`
    flex: 1;
    padding: 0 30px;
`;

export const SectionTitle = styled.h2`
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 40px;
    & + p {
        display: block;
        margin-bottom: 40px;
        margin-top: -35px;
    }
`;

export const SubmenuTitle = styled.h3`
    font-size: 1.6rem;
    font-weight: bold;
`;

export const SubmenuText = styled.p`
    font-size: .8rem;
    display: block;
    margin-top: 10px!important;
`;