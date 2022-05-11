import styled, { css } from 'styled-components';

interface ITypes {
    hasError: Boolean
}

export const Container = styled.form<ITypes>`
    textarea,
    input:not([type="checkbox"]):not([type="radio"]) {
        display: block;
        width: 100%;
        border: 0;
        padding: 15px 30px;
        border: 1px white solid;
        border-radius: 20px;
        color: white;
        outline: 0 !important;
        background-color: transparent !important;
    }
    textarea {
        height: 190px;
        overflow: hidden;
        resize: none;
    }
    [class*="col"] {
        &:not(:empty) {
            margin-bottom: 24px
        }
    }
    .captcha {
        display: flex;
        justify-content: center;
        flex-flow: column wrap;
        position: relative;
        overflow: hidden;
    }
`;

export const Button = styled.button<ITypes>`
    display: inline-block;
    padding: 15px 40px;
    border: 1px white solid;
    border-radius: 15px;
    color: white;
    &.btn-send {
        &[disabled] {
            opacity: .3;
            pointer-events: none;
        }
        background-color: #fdc100;
        border: 0;
        text-transform: uppercase;
        color: #293341;
    }
    outline: 0;
    cursor: pointer;
`;

export const Checkbox = styled.div<ITypes>`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const Input = styled.input<ITypes>`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    display: block;
    opacity: 0;
    &:checked + * {
        opacity: 1;
    }
    cursor: pointer;
`;

export const MaskedLabel = styled.label<ITypes>`
    width: 100%;
    height: 100%;
    background-color: rgb(253, 193, 0);
    border-radius: 999px;
    display: block;
    opacity: 0;
    z-index: 1;
    margin: 0;
`;

export const Label = styled.label<ITypes>`
    padding-left: 15px;
    color: white;
    line-height: 1.2;
    font-size: .8rem;
    margin: 0;
    a {
        color: #15894f;
        text-decoration: underline;
    }
`;

export const CheckboxInner = styled.div<ITypes>`
    position: relative;
    height: 15px;
    width: 15px;
    background-color: white;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
`;


export const CaptchaField = styled.input<ITypes>`
    position: relative;
    z-index: 2;
    padding: 12px 25px !important;
    border-radius: 0 !important;
    border: 0 !important;
    border-bottom: 1px white solid !important;
    font-size: 1.3rem;
    letter-spacing: 10px;  
    ${({ hasError }) => hasError && css`
        border-color: red !important;       
    `}       
    & + div {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        padding: 13px 16px;
        opacity: .2;        
    }
`;
