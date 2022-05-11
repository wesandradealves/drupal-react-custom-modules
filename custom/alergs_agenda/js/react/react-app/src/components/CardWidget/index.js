import React from "react";

export default class CardDate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }    

    componentDidMount = async () => {}

    componentDidUpdate(prevProps, prevState) {}    
    
    render() {
        let fim = '';
        let andar = '' ;
        if(this.props.horaFim){
            fim = 'às '+this.props.horaFim;
        }
        if(this.props.nomeAndar){
            andar = '- '+this.props.nomeAndar;
        }
        return (
            <>
             <div className="agendaEventosItem">
                                                    
                                                    <div className="agendaEventosItemTitle"><h4>{this.props.nomeEvento}</h4></div>
                                                    <span className="agendaEventosItemTime">{this.props.horaInicio} {fim}</span> 
                                                        
                                                </div>
                
              <hr/>  
            </>
        );
    }
}