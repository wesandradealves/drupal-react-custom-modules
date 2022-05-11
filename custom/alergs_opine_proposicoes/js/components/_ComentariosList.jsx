import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import { scrollIntoView } from '../helpers/Scroll';
import { getNameByCpfCnpj } from '../services/User';

const ComentariosList = ({ userId, comentarios }) => {

  // Paginate config
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState();
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(2);
  const [postData, setPostData] = useState([]);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    setOffset(e.selected * perPage);
    scrollIntoView('comentarios-list');
  }

  useEffect(() => {
    comentarios.reverse();

    const getName = (cpfCnpj) => {
      // const response = await getNameByCpfCnpj(cpfCnpj).then(res => {
      //   return JSON.parse(res);
      // }).catch(err => console.log(err))

      // return response;
    }

    const getName2 = async (cpfCnpj) => {
      // Only numbers
      // const _cpfCnpj = cpfCnpj.replace(/\W+/g, "");

      const result = await getNameByCpfCnpj(cpfCnpj).then(res => {
        // console.log(JSON.parse(res.name))
        return 123;
      });

      console.log(result)

      return result;
    }

    const slice = comentarios.slice(offset, offset + perPage)
    const postData = slice.map((c) => {
      return (
        <>
          <div class="col-6 d-flex justify-content-center">
            <div className="px-5 py-4 bg-light text-dark estilo2">
              {/* TODO: Add getName from UserController */}

              {/* <img src="/modules/custom/alergs_opine_proposicoes/img/user.png" alt="" />
              <span>{getName(c.cpfCnpjFormatado).then(obj => {
                return obj.name;
              })}</span> */}

              <img className="" src="/modules/custom/alergs_opine_proposicoes/img/calendar.png" alt="" />
              <span><strong>{c.dataComentario.slice(0, 10)}</strong></span>

              <p className="mt-4 text-break">{c.comentario}</p>
            </div>
          </div>
        </>
      )
    });

    setPageCount(Math.ceil(comentarios.length / perPage))
    setPostData(postData)
  }, [comentarios, offset]);

  return (
    <>
      <h2 className="text-center">Comentários</h2>

      <div className="row m-5">
        {postData}
      </div>

      {postData.length >= 1 &&
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próximo"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          const onPageChange={handlePageClick}
          containerClassName={"pagination m-5"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      }
    </>
  );
}

export default _ComentariosList;
