import React from "react";
import Card from "../Card";
export default class EventsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }    

    componentDidMount = async () => {}

    componentDidUpdate(prevProps, prevState) {}    
    
    render() {
        
        return (
            <>
            <div className="col-sm-12 agendaEventosWrapper">
                                        <div className="agendaDate"><h4>{this.props.dataInicio}</h4></div>
                                        {this.props.contents ?
                            this.props.contents.sort((a, b) => a.horaInicio > b.horaInicio ? 1:-1).map((eventos, i) => (
                              
                            <Card
								key={i}
								dataInicio={eventos.dataInicio}
								nomeEvento={eventos.nomeEvento}
								horaInicio={eventos.horaInicio}
                                horaFim={eventos.horaFim}
                                nomeLocal={eventos.nomeLocal}
                                nomeAndar={eventos.nomeAndar}
                                eventType={eventos.eventType}
							/>
 
                           
                        )
                        )
                        :
                            <p className="text-center">Nenhum evento encontrado.</p>
                        }
                                         
                                       
                                    </div>
            
              <hr/>  
            </>
        );
    }
}