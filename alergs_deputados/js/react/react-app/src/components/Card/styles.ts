import styled, { css } from 'styled-components';

interface ITypes {
    fotoGrandeDeputado: string;
    bold?: boolean;
    circled?: boolean;
    orientation?: any;
}

export const Thumbnail = styled.div<ITypes>`
    display: block;
    padding: 0 0 ${({ orientation }) => (orientation === 'horizontal' ? '50%' : '100%')};
    border-radius: ${({ circled }) => (circled ? '20px' : 'initial')};
    ${({ fotoGrandeDeputado }) => fotoGrandeDeputado && css`
        background: url(${fotoGrandeDeputado}) center 0 / cover no-repeat;
    `}  
`;

export const Grid = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin: 0 -30px -30px;
`;

export const GridItem = styled.div`
    cursor: pointer;
    flex: 0 0 auto;
    width: 100%;
    padding: 0 30px 30px;
`;

export const GridItemInner = styled.div`
    text-align: center;
`;

export const GridItemTitle = styled.h3<ITypes>`
    font-size: .9rem;
    display: block;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 25px 0 10px;
    font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`;

export const GridItemDetail = styled.h4`
    font-size: .7rem;
`;