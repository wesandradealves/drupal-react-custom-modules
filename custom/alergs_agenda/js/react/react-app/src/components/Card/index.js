import React from "react";

export default class Card extends React.Component {
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
             <div className="row pl-5">
                                            <div className="col-sm">

                                            <div className="agendaEventosItem">
                                                    
                                                    <div className="agendaEventosItemTitle"><h4>{this.props.nomeEvento}</h4></div>
                                                    <span className="agendaEventosItemTime">{this.props.horaInicio} {fim}</span> 
                                                     <span className="agendaEventosItemLoc">
                                                        {this.props.nomeLocal.indexOf('http') !== -1 ? (<a href={this.props.nomeLocal} target="_blank">On-line</a> ) : (this.props.nomeLocal)} {andar}
                                                    </span>                                                 
                                                </div>

                                                
                                            </div>
                                            <div className="col-sm">
                                                
                                                <span className="AgendaEventosItemTag">{this.props.eventType}</span>
                                            </div>
                                        </div>
                                      <hr/> 
                
            </>
        );
    }
}