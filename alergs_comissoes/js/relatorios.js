// 'use strict';
// const rEAC = React.createElement;

// console.clear();

// var iconPdf = require('../img/pdf-file.png');
// import iconPdf from '../img/pdf-file.png';
// const {iconPdf} = require('../img/pdf-file.png')

class Relatorios extends React.Component {

  constructor(props) {
    super();

    var items = JSON.parse(props.relatorios);
    console.log(items)

    this.state = {
      items: items,
      currentPage: 1,
      itemsPerPage: 15
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
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
    let destination = document.getElementById("relatorios-component");
    destination.scrollIntoView({
      behavior: 'smooth'
    });
  }

  render() {
    // console.log()
    if (this.state.items == null) {
      return(
        <p>Não há relatórios para esta comissão.</p>
      );
    }

    const { items, currentPage, itemsPerPage } = this.state;

    {console.log(items)}

    // Logic for displaying current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);


    // Create items to <li>
    const renderitems = currentItems.map((item, index) => {
      return (
        <div key={index} className="conteudo-item">
          <div className="bd-highlight">
            <p>{item.descricaoRelatorio}  {(item.detalhesRelatorio) ? <a> - {item.detalhesRelatorio} </a> : ""}</p>
          </div>
          <div className="bd-highlight">
            <a href={item.linkRelatorio}>
              <img src="/themes/custom/alergs_custom/image/pdf-file.png" alt={item.descricaoRelatorio}/>
            </a>
          </div>
        </div>
      );
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
          className={"page-item p-2"}
        >
          {number}
        </li>
      );
    });

    return (
      <div className="">
        <ul className="conteudo-lista">
          {renderitems}
        </ul>
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
  <div>
    <Relatorios relatorios={drupalSettings.relatorios} />
  </div>,
  document.getElementById('relatorios-component')
);

