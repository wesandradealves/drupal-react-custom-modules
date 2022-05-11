import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  Icon,
  Select
} from './styles.ts';
import './styles.scss';

const CustomSelect = ({
  onChange,
  optionValue,
  optionLabel,
  label,
  data
}) => {

  return (
    <Select>
      <select className="customSelect" onChange={onChange}>
        <option>{label}</option>
        {data.sort((a, b) => a[optionValue] > b[optionValue] ? 1 : -1).map((item, i) => (
          <option value={item[optionValue ? optionValue : optionLabel]}>{item[optionLabel]}</option>
        ))}
      </select>
    </Select>
  );
};

export default CustomSelect;
