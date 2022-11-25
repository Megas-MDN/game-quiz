import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';

class Feedback extends Component {
  componentDidMount() {
    const { name, score, email } = this.props;
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    const rank = localStorage.getItem('ranking');
    const player = { name, score, picture };
    if (rank) {
      const arrPLayers = JSON.parse(rank);
      arrPLayers.push(player);
      arrPLayers.sort((a, b) => b.score - a.score);
      // const unicArr = this.arrUnic(arrPLayers);
      localStorage.setItem('ranking', JSON.stringify(arrPLayers));
      // localStorage.setItem('ranking', JSON.stringify(unicArr));
    } else {
      localStorage.setItem('ranking', JSON.stringify([player]));
    }
  }

  // arrUnic = (arr) => {
  //   const objUnic = arr.reduce(
  //     (acc, crr) => ({
  //       ...acc,
  //       [crr.picture]: crr,
  //     }),
  //     {},
  //   );
  //   return Object.values(objUnic);
  // };

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    return (
      <div>
        <Header />
        {assertions >= THREE ? (
          <p data-testid="feedback-text">Well Done!</p>
        ) : (
          <p data-testid="feedback-text">Could be better...</p>
        )}
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <div className="loginBtns">
          <button
            className="fill"
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            PLAY AGAIN
          </button>
          <button
            className="fill"
            type="button"
            data-testid="btn-ranking"
            onClick={ this.goToRanking }
          >
            RANKING
          </button>
        </div>
      </div>
    );
  }
}

Feedback.defaultProps = {
  name: '',
  email: '',
};

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
};

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
  name: globalState.player.name,
  email: globalState.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
