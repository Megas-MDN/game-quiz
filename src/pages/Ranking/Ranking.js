import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Podium from './Podium';
import winners from './winners.png';

class Ranking extends Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  goFulRanking = () => {
    const { history } = this.props;
    history.push('/ranking/all');
  };

  render() {
    return (
      <div>
        <img className="winners-are" src={ winners } alt="And the winners are" />
        <Podium />
        <div className="loginBtns">
          <button
            className="fill"
            type="button"
            data-testid="btn-go-home"
            onClick={ this.goHome }
          >
            GO HOME
          </button>
          <button className="fill" type="button" onClick={ this.goFulRanking }>
            FULL RANKING
          </button>
        </div>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Ranking);
