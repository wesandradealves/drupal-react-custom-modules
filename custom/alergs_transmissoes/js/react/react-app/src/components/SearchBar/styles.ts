import styled, { css } from 'styled-components';

interface ITypes {
    flex?: any;
}

export const Container = styled.div`
    background-color: #293341;
    margin: 45px auto;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    padding: 35px;
    width: 100%;
`;

export const Title = styled.h2`
    color: white;
    font-size: 2rem;
    font-weight: bold;
    display: block;
    text-aligN: center;
    margin-bottom: 35px;
`;

export const Form = styled.form`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-end;    
`;

export const FormGroup = styled.div<ITypes>`
    flex: 1;
    &:not(:last-child) {
        padding-right: 15px;
    }
    ${({ flex }) => flex && css`
        flex: 0 0 auto;
        width: ${flex};
    `}       
`;

export const Label = styled.label`
    display: block;
    color: white;
    font-size: .9rem;
`;

export const Input = styled.input`
    display: block;
    width: 100%;
    border: 1px white solid;
    border-radius: 20px;
    padding: 12px 20px;
    font-size: .9rem;
    background: transparent;
    color: white;    
`;


export const Button = styled.button`
    padding: 12px;
    border: 0;
    color: white;
    background: #148a4e;
    border-radius: 999px;
    width: 100%;
    display: block;
`;

export const DateField = styled.span`
    width: 100%;
    position: relative;
    overflow: hidden;
    display: block;
`;