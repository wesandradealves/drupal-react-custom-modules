import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

import { listarVotacaoProposicao, incluirVotacaoProposicao, listarComentarioProposicao } from '../services/Opine';

import ComentariosAdd from './ComentariosAdd';
import ComentariosList from './ComentariosList';

import '../../scss/apresentacao.scss';

const Apresentacao = ({ }) => {
  const [sigla, setSigla] = useState(drupalSettings.siglaTipoProposicao);
  const [nroProposicao, setNroProposicao] = useState(drupalSettings.nroProposicao);
  const [cpfCnpj, setCpfCnpj] = useState(drupalSettings.cpfCnpjParticipante);
  const [userId, setUserId] = useState(drupalSettings.userId);
  const [anoProposicao, setAnoProposicao] = useState(drupalSettings.anoProposicao);
  const [voto, setVoto] = useState(drupalSettings.voto);
  const [proposicao, setProposicao] = useState(JSON.parse(drupalSettings.proposicao));

  // Create dynamic
  const [votos, setVotos] = useState([]);

  const [newComment, setNewComment] = useState(null);

  const getVotos = async () => {
    const columns = [
      { label: 'Concorco' },
      { label: 'Discordo' },
    ]

    await listarVotacaoProposicao(cpfCnpj, sigla, nroProposicao, anoProposicao).then((res) => {
      let rows = [];
      const total = JSON.parse(res).total;

      if (total) {
        rows = total.map(t => {
          return [(t.descricao), t.total];
        });

        setVotos([columns, ...rows]);
      }

    })
  }

  const getComentarios = async () => {
    await listarComentarioProposicao(sigla, nroProposicao, anoProposicao).then((res) => {
      console.log(JSON.parse(res).lista)
      setComentarios(JSON.parse(res).lista);
    });
  }

  const votar = async (e) => {
    setVoto(e.target.value);

    await incluirVotacaoProposicao(cpfCnpj, e.target.value, sigla, nroProposicao, anoProposicao);
    await getVotos();
  }

  useEffect(() => {
    getVotos();
    // getComentarios();
  }, []);

  return (
    <>
      <div className="container-votacao">
        <div className="row-votacao">
          <div className="col-6">
            <div className="border">
              <div className="estilo">
                <h2>Participe da Votação!</h2>

                <div className="estilo3">
                <div>
                  <img className="" src="/modules/custom/alergs_opine_proposicoes/img/file.png" alt="" />
                  <span className=" ">{proposicao.proposicao}</span>
                </div>
                <div>
                  <img className="" src="/modules/custom/alergs_opine_proposicoes/img/calendar.png" alt="" />
                  <span className=" ">{proposicao.dataSituacaoProposicao.slice(0, 10)}</span>
                </div>
                <div>
                  <img className="" src="/modules/custom/alergs_opine_proposicoes/img/user.png" alt="" />
                  <span className=" ">{proposicao.proponente}</span>
                </div>
                </div>

                {votos && votos.length > 1
                  ?
                  <div className="d-flex justify-content-center">
                    <Chart
                      className=""
                      width={'100%'}
                      height={'300px'}
                      chartType="PieChart"
                      loader={<div>Carregando...</div>}
                      data={votos}
                      options={{
                        // title: 'Votação',
                        is3D: true,
                        // legend: 'none',
                        legend: { 'position': 'right', 'alignment': 'center' },
                        backgroundColor: { fill: 'transparent' },
                        colors: ['#15894f', '#f70414'],
                        chartArea: { width: '60%' },
                        sliceVisibilityThreshold: 0.3,
                        pieHole: 0.2,
                        // pieSliceText: 'label',
                      }}
                      rootProps={{ 'data-testid': '1' }}
                    />
                  </div>
                  :
                  <div className="p5">
                    <p className="text-center">Nenhum registro encontrado ainda</p>
                  </div>
                }

                {cpfCnpj &&
                  <>
                    <div className="container-votar">
                    </div>

                    <div className="divButton">
                      <button onClick={votar} value="CONC" disabled={voto} className="butonnC">
                        Concordo
                      </button>
                      <button onClick={votar} value="DISC" disabled={voto} className="butonnC">
                        Discordo
                      </button>

                      {
                        voto &&
                        <div className="d-flex">
                          <p className="text-center">Participação registrada com sucesso.</p>
                        </div>
                      }
                    </div>
                  </>
                }

              </div>
            </div>
          </div>

          <div className="col6">

            {cpfCnpj &&
              <ComentariosAdd cpfCnpj={cpfCnpj} sigla={sigla} nroProposicao={nroProposicao} anoProposicao={anoProposicao} setNewComment={setNewComment} />
            }

            {cpfCnpj == null &&
              <div id="comentario-deslogado" className="estilo pt-5">
                <h2>Entre para deixar sua opinião</h2>
                <div className="divButton2">
                  <a href="/user/register" className="butonnE">Cadastre-se</a>
                  <a href="/user/login" className="butonnE">Login</a>
                </div>
              </div>
            }
          </div>
        </div>

        <div id="comentarios-list">
          <ComentariosList newComment={newComment} />
        </div>

      </div>
    </>
  )
}

export default Apresentacao;
