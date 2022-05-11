import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import { render } from 'react-dom';
import Ouvidoria from './components/Ouvidoria';
import OuvidoriaValidar from './components/OuvidoriaValidar';
import {
    GoogleReCaptchaProvider,
    GoogleReCaptcha
  } from 'react-google-recaptcha-v3';

const Root = () => {
    if(document.getElementsByClassName('ouvidoria-validar').length) {
        return (
            <div className="agenda">
                <OuvidoriaValidar /> 
            </div>
        )
    }
    return (
        <div className="ouvidoria">
            <Ouvidoria/>
        </div>
    )
}

render(<GoogleReCaptchaProvider
    reCaptchaKey="6LcQ9FgcAAAAAEdqwim6NERDUN-4-_MalkfLT_J-"
    scriptProps={{
      async: false, // optional, default to false,
      defer: false, // optional, default to false
      appendTo: 'head', // optional, default to "head", can be "head" or "body",
      nonce: undefined // optional, default undefined
    }}
    ><Root /></GoogleReCaptchaProvider>, document.getElementById('ouvidoria-component'));
