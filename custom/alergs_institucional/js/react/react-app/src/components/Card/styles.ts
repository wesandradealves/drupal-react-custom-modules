import styled, { css } from 'styled-components';

interface IContainer {
    linkFoto: string;
    bold?: boolean;
    circled?: boolean;
    orientation?: any;
}

export const Thumbnail = styled.div<IContainer>`
    display: block;
    padding: 0 0 ${({ orientation }) => (orientation === 'horizontal' ? '50%' : '100%')};
    border-radius: ${({ circled }) => (circled ? '20px' : 'initial')};
    ${({ linkFoto }) => linkFoto && css`
        background: url(${linkFoto}) center 0 / cover no-repeat;
    `}  
`;

export const Title = styled.h2`
    text-align: center;
    padding: 65px 0 50px;
`;

export const Grid = styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin: 0 -30px -30px;
`;

export const GridItem = styled.li`
    flex: 0 0 auto;
    width: 100%;
    padding: 0 30px 30px;
    @media (min-width: 568px)
    {
      width: 33.333%;
      @media (min-width: 900px)
      {
        width: 25%;
        @media (min-width: 1024px)
        {
          width: 20%;
        }         
      }          
    }    
`;

export const GridItemInner = styled.div`
    text-align: center;
`;

export const GridItemTitle = styled.h3<IContainer>`
    font-size: 1.2rem;
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