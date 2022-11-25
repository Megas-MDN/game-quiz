import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { disableOptions } from '../../redux/actions';
import './Counter.css';

const ONE_SECOND = 1000;
const MIN_SECOND = 1;

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { seconds } = this.state;
    const { dispatch, showColors } = this.props;
    if (prevState.seconds === MIN_SECOND) {
      clearInterval(this.interval);
    }
    if (seconds === 0) {
      showColors();
      dispatch(disableOptions(true));
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div className="counterContent">
        <div className="countdown">
          <span className="countdownText" id="countdown">{seconds}</span>
          <svg viewBox="-50 -50 100 100" strokeWidth="10">
            <circle r="45" />
            <circle
              r="45"
              strokeDasharray="282.7433388230814"
              strokeDashoffset="282.7433388230814px"
            />
          </svg>
        </div>
      </div>
    );
  }
}

Counter.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Counter);
