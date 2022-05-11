import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import { render } from 'react-dom';

// @todo: remove the import because the scss
import Banner from './components/Banner';
import Comissoes from "./components/Comissoes";

const Root = () => {
  return (
    <div className="home">
      <Comissoes />
    </div>
  )
}

render(<Root />, document.querySelector('#comissoes-parlamentares'));
