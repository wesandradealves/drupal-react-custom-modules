import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { incluirComentarioProposicao, listarComentarioProposicao } from '../services/Opine';

const ComentariosAdd = ({ cpfCnpj, sigla, nroProposicao, anoProposicao, setNewComment }) => {

  const max = 400;
  const [remain, setRemain] = useState(400);
  const [comentario, setComentario] = useState('');
  const [msgErro, setMsgErro] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [hasComment, setHasComment] = useState(false);

  const handleComentario = (e) => {
    const input = e.target.value;

    setComentario(e.target.value);
    setRemain(max - input.length)
  }

  const submitForm = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (comentario.length < 5) {
      setMsgErro('Digite uma mensagem válida.')
      setIsLoading(false)
      return
    }

    await incluirComentarioProposicao(cpfCnpj, comentario, sigla, nroProposicao, anoProposicao).then((res) => {
      setComentario('');
      setMsgErro('');
      setIsLoading(false);
      setRemain(max);
      setHasComment(true);
      setNewComment({ nome: drupalSettings.userName, dataComentario: moment().format('L'), comentario: comentario })
    }).catch(function (err) {
      console.log(err);
    });
  }

  const getComentario = async () => {
    await listarComentarioProposicao(sigla, nroProposicao, anoProposicao, cpfCnpj).then((res) => {
      const result = JSON.parse(res).lista

      if (result) {
        setHasComment(true);
      }
    })
  }

  useEffect(() => {
    getComentario();
  }, [])

  return (
    <>
      <form data-drupal-form-fields="">
        <div className="divArea">
          <h2>Deixe aqui sua opinião</h2>
          <textarea disabled={hasComment} className="textArea mt-4" name="comentario" value={comentario} placeholder="Mensagem..." onChange={handleComentario} cols="60" rows="10" tabindex="-1"></textarea>

          {!hasComment &&
            <p className="pArea mt-4">{remain} caracteres restantes</p>
          }

          <p>{msgErro}</p>
          <button
            // className={isLoading ? 'disabled' : ''}
            className={`butonnE ${isLoading ? 'disabled' : ''}`}
            type="button"
            onClick={submitForm}
            disabled={isLoading || hasComment}
            placeholder="Mensagem..."
            tabindex="-1"
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>

          {
            hasComment &&
            <div className="d-flex">
              <p className="text-center">Comentário registrado com sucesso.</p>
            </div>
          }
        </div>
      </form>
    </>
  );
}

export default ComentariosAdd;
