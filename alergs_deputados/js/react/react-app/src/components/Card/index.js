import React from "react";
import { Thumbnail, GridItem, GridItemTitle, GridItemInner, GridItemDetail } from './styles.ts';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {...this.props.data}
        }        
    }

	redirect = (idDeputado) => {
        document.location = `/deputados/${idDeputado}`
	}  

    render() {
        return (
            <GridItem onClick={e => this.redirect(this.state.data.idDeputado)}>
                <GridItemInner>
                    <Thumbnail 
                        circled={true}
                        // orientation="'horizontal'"
                        fotoGrandeDeputado={this.state.data.fotoGrandeDeputado} 
                        className="thumbnail">
                    </Thumbnail>
                    <GridItemTitle bold={true}>{this.state.data.nomeDeputado}</GridItemTitle>
                    <GridItemDetail>{this.state.data.emailDeputado}</GridItemDetail>
                </GridItemInner>
            </GridItem>
        );
    }
}
