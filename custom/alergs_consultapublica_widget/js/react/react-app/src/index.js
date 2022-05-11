import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
// import WidgetDeputados from "./components/WidgetDeputados";
// import { 
//   listarDestaqueDeputados
// } from './services/services';
// import "./styles.scss";
const Root = () => {
    // const [data, setData] = useState([]);

    // const fetchData = async () => {
    //   const response = await listarDestaqueDeputados().then(res => {
    //       return JSON.parse(res).lista;
    //   }).catch(err => console.log(err))

    //   return response;
    // }    

    // useEffect(() => {
    //   fetchData().then(res => {
    //     setData(res)
    //   }).catch(err => console.log(err));
    // }, []); 

    return (<>Widget Consulta Pública</>);    
}

render(<Root />, document.querySelector('#app'));
