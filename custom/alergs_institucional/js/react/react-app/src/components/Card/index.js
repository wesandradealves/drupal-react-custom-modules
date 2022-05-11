import React from "react";
import { Thumbnail, GridItem, GridItemTitle, GridItemInner, GridItemDetail } from './styles.ts';
import OwlCarousel from 'react-owl-carousel-autoheight';
/* import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
 */
export default class Card extends React.Component {
    constructor(props) {
        super(props);
    }

	redirect = (codProponente) => {
        document.location = `${window.location.href + '/' + codProponente}`
	}  

   /*  render() {
        return (
         /*    <GridItem>
                <GridItemInner>
                
                    <GridItemTitle bold={true}>{this.props.sigla}</GridItemTitle>
                    <GridItemTitle bold={true}>{this.props.nome}</GridItemTitle>
                  
                </GridItemInner>
            </GridItem> */
            /* <OwlCarousel className='owl-theme' loop margin={10} nav>
            <div class='item'>
                <h4>1</h4>
            </div>
            <div class='item'>
                <h4>2</h4>
            </div>
            <div class='item'>
                <h4>3</h4>
            </div>
            <div class='item'>
                <h4>4</h4>
            </div>
            <div class='item'>
                <h4>5</h4>
            </div>
            <div class='item'>
                <h4>6</h4>
            </div>
            <div class='item'>
                <h4>7</h4>
            </div>
            <div class='item'>
                <h4>8</h4>
            </div>
            <div class='item'>
                <h4>9</h4>
            </div>
            <div class='item'>
                <h4>10</h4>
            </div>
            <div class='item'>
                <h4>11</h4>
            </div>
            <div class='item'>
                <h4>12</h4>
            </div>
        </OwlCarousel>
        );
 */ /*}
    } */
}
