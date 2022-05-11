import styled, { css } from 'styled-components';

interface IContainer {
    linkFoto: string;
    bold?: boolean;
    circled?: boolean;
    orientation?: any;
}

interface IDeputadosInterna {
    src?: string;
    compact?: boolean;
    stretch?: boolean;
}


export const Thumbnail = styled.div<IContainer>`
    display: block;
    padding: 0 0 ${({ orientation }) => (orientation === 'horizontal' ? '50%' : '100%')};
    border-radius: ${({ circled }) => (circled ? '20px' : 'initial')};
    ${({ linkFoto }) => linkFoto && css`
        background: url(${linkFoto}) center 0 / cover no-repeat;
    `}  
`;

export const Title = styled.h3`
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
    cursor: pointer;
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


export const CarrouselItem = styled.div<IDeputadosInterna>`
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