import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import { render } from 'react-dom';
import Agenda from './components/Agenda';
import AgendaWidget from './components/AgendaWidget';

const Root = () => {
    if(document.getElementsByClassName('agenda-widget').length) {
        return (
            <div className="agenda">
                <AgendaWidget  /> 
            </div>
        )
    }
    return (
        <div className="agenda">
            <Agenda/>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js" integrity="sha512-fzff82+8pzHnwA1mQ0dzz9/E0B+ZRizq08yZfya66INZBz86qKTCt9MLU0NCNIgaMJCgeyhujhasnFUsYMsi0Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        </div>
    )
}

render(<Root />, document.getElementById('agenda-component'));
