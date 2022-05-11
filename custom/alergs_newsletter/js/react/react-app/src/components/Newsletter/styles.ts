import styled, { css } from 'styled-components';

interface ITypes {
}

export const Title = styled.h2`
    color: white;
    font-weight: bold;
    font-size: 1.8rem;
`;

export const Newsletter = styled.section`
    margin: 0 -15px;
    background-color: #293341;
    .container {
        padding-top: 40px;
        padding-bottom: 40px;
        > * {
            align-items: stretch;
        }
    }
    [class*="col"] {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }
`;