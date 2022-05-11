import React from "react";

import { ObterMesaDiretora } from '../../services/services'
import MesaContainer from "../MesaContainer";

export default class Mesadiretora extends React.Component {
    constructor(props) {
        super(props);

        var mesa_apenas = document.querySelector('#institucional-component').getAttribute("data-apenas-mesa");


        if(mesa_apenas && mesa_apenas != null){
            this.state = {
                mesas: [],
                'data-apenas-mesa': mesa_apenas
            }
        }else{
            this.state = {
                mesas: [],
                'data-apenas-mesa': "",
            }
        }

    }

	fetchData = async () => {
        const response = await ObterMesaDiretora().then(data => {
            return JSON.parse(data).lista;
        }).catch(err => console.log(err));

        this.setState({ mesas: response });

	}      

    componentDidMount = async () => {
        this.fetchData();      
    }

    render() {
        return (
            <MesaContainer data={this.state.mesas} data-mesa-apenas={this.state['data-apenas-mesa']} onlyTable title="Conheça os Deputados que fazem parte da mesa diretora da ALRS." />
        );
    }
}

