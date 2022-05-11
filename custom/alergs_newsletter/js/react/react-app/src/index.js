import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import { render } from 'react-dom';
import NewsletterComponent from "./components/Newsletter";

const Root = () => {
    return (
      <NewsletterComponent />
    );    
}

render(<Root />, document.querySelector('#app'));
