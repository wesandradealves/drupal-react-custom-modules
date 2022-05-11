import React, { useState, useEffect } from 'react';
import Slider from "react-slick";

const ComentariosList = ({ newComment }) => {
  const [comentarios, setComentarios] = useState(JSON.parse(drupalSettings.comments) || []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    variableWidth: false
  };

  useEffect(() => {
    setComentarios(comentarios.reverse())
  }, [])

  useEffect(() => {
    if (newComment) {
      setComentarios([...comentarios, newComment])
    }
  }, [newComment])

  return (
    <div id="container-comentarios-list">
      <h2 className="text-center">Comentários</h2>

      {
        comentarios.length == 0 &&
        <p className="pt-4 text-center">Nenhum comentário ainda.</p>
      }

      <Slider {...settings}>
        {
          comentarios && comentarios.length > 0 &&
          comentarios.reverse().map((c) => {
            return (
              <div className="comment-list">
                <div className="p-5">
                  <div className="comment-list-item">
                    <img className="d-inline" src="/modules/custom/alergs_opine_proposicoes/img/user.png" alt="" />
                    <span className=""><strong>{c.nome}</strong></span>
                    <img className="d-inline" src="/modules/custom/alergs_opine_proposicoes/img/calendar.png" alt="" />
                    <span className=""><strong>{c.dataComentario.slice(0, 10)}</strong></span>
                    <p className="mt-4 text-break">{c.comentario}</p>
                  </div>
                </div>
              </div>
            );
          })
        }


      </Slider>
    </div>
  );
}

export default ComentariosList;
