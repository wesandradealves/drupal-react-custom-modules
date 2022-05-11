import styled, { css } from 'styled-components';

interface ITypes {
    color?: string;
    alignText?: string;
}

export const Column = styled.div`
    a {
        text-transform: uppercase;
        color: #333333;
    }
    &:not(:first-of-type) {
        a {
            text-transform: initial;
            text-decoration: underline;
        }
    }
`;


export const Link = styled.a`

`;


export const Filter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 60px;
    color: #333333;
    font-size: .9rem;
    .row {
        width: 100%;
        [class*="col"] {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
        }
    }
    a {
        text-decoration: none;
        color: gray;
    }
`;


export const Select = styled.select`
    height: 65px;
    border-radius: 999px;
    border: 1px #333 solid;
    outline: 0px;
    width: 310px;
    text-align: center;
    text-align-last: center;
    cursor: pointer;
`;

export const List = styled.ul`
    &.--pronunciamentos {
        li {
            &:first-child {
                text-align: center;
            }
            p {
                display: flex;
                span {
                    flex: 1;
                    &:first-child {
                        flex: 0 0 auto;
                        width: 30%;
                        text-align: center;
                    }
                }
            }
        }        
    }
`;

export const ListItem = styled.li`
    cursor: pointer;
`;

export const ListHeader = styled.div`
`;

export const SectionTitle = styled.h2<ITypes>`
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 40px;
    width: 100%;
    text-align: left;
    & + p {
        display: block;
        margin-bottom: 40px;
        margin-top: -35px;
    }
    ${({ color }) => color && css`
        color: ${color}
    `}      
`;


export const ListCell = styled.span<ITypes>`
    text-align: left;
    ${({ alignText }) => alignText && css`
        text-align: ${alignText}
    `} 
`;