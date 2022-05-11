import styled, { css } from 'styled-components';

interface ITypes {
}

export const ContactForm = styled.section`
    background-color: #293341;
    .container {
        padding-top: 75px;
        padding-bottom: 75px;
        > * {
            align-items: stretch;
        }
    }
`;

export const FormTitle = styled.h2`
    color: white;
    font-weight: bold;
    font-size: 1.8rem;
`;


export const SocialNetworks = styled.div`
    margin-top: 60px;
    display: flex;
    flex-flow: row wrap;
    color: white;
    @media only screen and (min-width: 320px) {
        margin-bottom: 30px;
        @media only screen and (min-width: 1024px) {
            margin-bottom: 0;
        }          
    }      
`;

export const SocialHeader = styled.p`
    flex: 0 0 auto;
    margin-bottom: 10px;
    width: 100%;
    font-size: 1.2rem;
`;

export const SocialItem = styled.a`
    color: inherit;
    font-size: 24px;
    &:not(:last-child) {
        margin-right: 20px;
    }
`;

export const Icon = styled.i`

`;