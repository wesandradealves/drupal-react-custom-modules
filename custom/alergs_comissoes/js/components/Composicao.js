import React from "react";

export default class Composicao extends React.Component {
  constructor(props) {
    super(props);

    const deputados = JSON.parse(drupalSettings.deputados);

    this.state = {
      deputado: null,
      deputados: deputados
    }
  }

  handleDeputado(event) {
    console.log(event.target.value)

    // const {deputado} = this.state;

    // console.log(deputado)
  }

  render() {
    const {deputados} = this.state;
    const renderDeputadosOptions = deputados.map((deputado, index) => {
      return (
        // console.log(deputados)
        <option
          key={index}
          value={index}
          onClick={this.handleDeputado}
        >
          {deputado.nomeDeputado}
        </option>
      )
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-6">

            <form>
              <select>
                <option>Selecione um(a) deputado(a)</option>
                {renderDeputadosOptions}
              </select>
              {/* {deputado} */}
            </form>

          </div>
          <div className="col-6">
            teste
          </div>
        </div>
      </div>
    );
  }

}
