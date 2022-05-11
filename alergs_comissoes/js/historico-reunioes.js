class HistoricoReunioes extends React.Component {

  constructor(props) {
    super();

    var idComissao = props.idComissao;
    var anos = JSON.parse(props.anos);
    var historicoReunioes = JSON.parse(props.historicoReunioes);

    this.state = {
      loading: false,

      idComissao: idComissao,
      anos: anos,
      reunioes: historicoReunioes,

      currentPage: 1,
      reunioesPerPage: 25
    };

    this.handleYear = this.handleYear.bind(this);
    this.handlePageNumber = this.handlePageNumber.bind(this);

  }

  handlePageNumber(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });

    // TODO: need to create new logic!
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function (el) {
      el.classList.remove("active");
    });
    event.target.classList.add('active');

    // Smooth scroll
    let destination = document.getElementById("historico-reunioes-component");
    destination.scrollIntoView({
      behavior: 'smooth'
    });
  }

  handleYear(event) {
    this.setState({
      loading: true
    });
  
    axios.post(`${window.location.origin}:5000/reuniaoComissao`, { codComissao: '86', anoReuniao: event.target.value })
      .then(res => {
        this.setState({
          loading: false,
          reunioes: res.data.lista
        });


        console.log('pegou')
      });
  }

  render() {
    const { anos, reunioes, currentPage, reunioesPerPage } = this.state;

    const indexOfLastItem = currentPage * reunioesPerPage;
    const indexOfFirstItem = indexOfLastItem - reunioesPerPage;

    const currentReunioes = reunioes.slice(indexOfFirstItem, indexOfLastItem);

    var lastDate = moment();
    var equal = false;

    const renderYears = anos.map((ano, index) => {
      return (
        <option key={index} value={ano.value}>
          {ano.label}
        </option>
      );
    })

    const renderReunioes = currentReunioes.map((reuniao, index) => {
      var pautaClass = 'reunioes-badge';
      var data = moment(reuniao.dthPublicacaoAgenda, 'DD/MM/YYYY', "pt", true);
      console.log(lastDate.isSame(data))
      if(lastDate.isSame(data))
        equal = true;
      else 
        equal = false
      lastDate = data;
      return (
        <div key={index}>
          {
            equal ? 
            <div className="group-title">
            </div>
            :
            <div className="group-title">
              <span>{data.format('dddd')}</span> 
              {data.format(', D [de] MMMM [de] YYYY')}
            </div>
          }
          
          <div className="reunioes-list-item">
            <div className="text-container">
              <p><b>Assunto</b>: {reuniao.descricao} | </p>
              <p><b>Data</b>: {reuniao.dthPublicacaoAgenda} | </p>
              <p><b>Horário</b>: {reuniao.horaInicioReuniao} </p>
              <p><b>Local</b>: {reuniao.nomeLocal}</p>
            </div>
            <div className="badges-container"> 
              {(reuniao.urlTexto) ? <a href={reuniao.urlTexto} className={pautaClass} target="_blank">Pauta</a> : ""}
              {(reuniao.urlAta) ? <a href={reuniao.urlAta} className={pautaClass} target="_blank">Ata</a> : ""}
              {(reuniao.urlTranscricao) ? <a href={reuniao.urlTranscricao} className={pautaClass} target="_blank">Transcrição</a> : ""}
              {(reuniao.urlAditamento) ? <a href={reuniao.urlAditamento} className={pautaClass} target="_blank">Atendimento</a> : ""}
              {(reuniao.urlCancelamento) ? <a href={reuniao.urlCancelamento} className={pautaClass} target="_blank">Cancelamento</a> : ""}
              {(reuniao.urlRetificacao) ? <a href={reuniao.urlRetificacao} className={pautaClass} target="_blank">Retificação</a> : ""}
            </div>
          </div>
        </div>
      );
    })

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(reunioes.length / reunioesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handlePageNumber}
          className={"page-item p-2"}
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        <select onChange={this.handleYear}>
          <option>Escolher o ano</option>
          {renderYears}
        </select>

        {(this.state.loading) ? 'Carregando...' : ''}

        <div className="reunioes-list">
          {renderReunioes}
        </div>

        <div className="d-flex justify-content-center">
          <ul id="page-numbers" className="pagination">
            {renderPageNumbers}
          </ul>
        </div>
      </div>
    );
  }

}

ReactDOM.render(
  <HistoricoReunioes
    idComissao={drupalSettings.id}
    anos={drupalSettings.anos}
    historicoReunioes={drupalSettings.historicoReunioes}
  />,
  document.querySelector('#historico-reunioes-component')
);
