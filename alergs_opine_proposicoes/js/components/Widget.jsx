import React, { useState } from "react";
import Slider from "react-slick";

import '../../scss/widget.scss';

const Widget = () => {
  const [proposicoes, setProposicoes] = useState(JSON.parse(drupalSettings.proposicoes));

  console.log(proposicoes)

  const settings = {
    arrows: true,
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
    // infinite: true,
    // speed: 500,
    // variableWidth: true
  };

  return (
    <div className="container container-opine-widget">

      <div class="d-flex justify-content-center flex-sm-row flex-column">
        <div class="p-2 w-100 flex-grow-1">
          <h2 className="text-white">Opine</h2>
          <p className="">Participe do debate, deixe sua opinião nas Proposições que estão na Ordem do Dia da Assembleia Legislativa do Rio Grande do Sul</p>
        </div>
        <div class="p-2 mt-4 mb-md-4 d-inline-flex cta">
          <a href="/opine">Saiba mais</a>
        </div>
      </div>

      <div className="flex-sm-row flex-column">
        {!proposicoes &&
          <p className="text-center">Nenhum registro encontrado.</p>
        }

        {proposicoes &&
          <Slider {...settings}>
            {proposicoes.map((proposicao, i) => {
              return (
                <div className="slider-item d-flex justify-content-center bd-highlight p-2 pb-3">
                  <div className="container-item">
                    <div className="info">
                      <div className="item">
                        <img src="/modules/custom/alergs_opine_proposicoes/img/file.png" alt="" />
                        {/* <p>{proposicao.materia}</p> */}
                        <p>{`${proposicao.siglaTipoProposicao.trim()} ${proposicao.nroProposicao} ${proposicao.anoProposicao}`}</p>
                      </div>
                      <div className="item">
                        <img src="/modules/custom/alergs_opine_proposicoes/img/calendar.png" alt="" />
                        {/* <p>{proposicao.dthOrdemDia}</p> */}
                        <p>{proposicao.dthOrdemDiaSessao}</p>
                      </div>
                      <div className="item">
                        <img src="/modules/custom/alergs_opine_proposicoes/img/user.png" alt="" />
                        {/* <p>{proposicao.deputado}</p> */}
                        <p title={proposicao.nome}>{proposicao.nome.split(" ").splice(0, 2).join(" ")}</p>
                      </div>
                    </div>
                    <div className="conteudo">
                      <p>{proposicao.ementa}</p>
                    </div>
                    <div className="mt-3">
                      <a className="cta2" href={`/opine/${proposicao.siglaTipoProposicao.trim()}/${proposicao.nroProposicao}/${proposicao.anoProposicao}`}>Opinar</a>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        }
      </div>
    </div >
  );
};

export { Widget };
