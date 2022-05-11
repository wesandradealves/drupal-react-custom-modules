import React from "react";
import Calendar from 'react-calendar';
import moment from 'moment';
import { reuniaoComissao } from "../services/Promovel.js";

import '../../scss/agenda.scss';

export default class Agenda extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: new Date(),
    }
  }

  onClick(value) {
    reuniaoComissao(value);
  }

  render() {
    const { value } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Calendar
              calendarType="US"
              locale='pt-BR'
              formatMonthYear={(locale, date) => moment(date).format('MMMM / YYYY')}
              onClickDay={this.onClick}
              value={value}
            />
          </div>
          <div className="col-6">
            Result
          </div>
        </div>
      </div>
    );
  }
}
