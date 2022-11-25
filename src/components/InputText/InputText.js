import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class InputText extends Component {
  render() {
    const { name, onChange, placeHolder } = this.props;
    return (
      <div className="centered">
        <div className="group">
          <input
            onChange={ onChange }
            name={ name }
            id={ name }
            type="text"
            required="required"
          />
          <label htmlFor={ name }>{placeHolder}</label>
          <div className="bar" />
        </div>
      </div>
    );
  }
}

InputText.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeHolder: PropTypes.string,
}.isRequired;
