import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../../components/Counter/Counter';
import Header from '../../components/Header/Header';
import { getQuests } from '../../helpers/api';
import { disableOptions, updateScore } from '../../redux/actions';
import './Game.css';

class Game extends Component {
  state = {
    questions: [],
    index: 0,
    showNext: false,
    correct: '',
    wrong: '',
    showCounter: true,
  };

  async componentDidMount() {
    const { history, urlLink } = this.props;
    const token = localStorage.getItem('token');
    const response = await getQuests(`${token}`, urlLink);
    if (response.results.length === 0) {
      localStorage.setItem('token', '');
      history.push('/');
    }
    const questionsPlusOrd = this.createOptions(response.results);
    this.setState({
      questions: [...questionsPlusOrd],
    });
  }

  handleClick = (e) => {
    const { target: { name } } = e;
    if (name === 'correct') {
      this.handleScore();
      this.showColors();
    } else {
      this.showColors();
    }
  };

  handleScore() {
    const one = 1;
    const two = 2;
    const three = 3;
    const ten = 10;
    const { index, questions } = this.state;
    const { dispatch } = this.props;
    const { difficulty } = questions[index];
    const multiplier = (str) => {
      if (str === 'hard') {
        return three;
      }
      if (str === 'medium') {
        return two;
      }
      return one;
    };
    const timer = document.querySelector('#countdown').innerHTML;
    const score = ten + (timer * multiplier(difficulty));
    dispatch(updateScore(score));
  }

  showColors = () => {
    this.setState({
      correct: 'correct',
      wrong: 'wrong',
      showNext: true,
      showCounter: false,
    });
  };

  arrAns = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  createOptions = (arr) => arr.map((q) => {
    const randArr = [q.correct_answer, ...q.incorrect_answers];
    q.options = this.arrAns(randArr);
    return q;
  });

  handleNext = () => {
    const { history, dispatch } = this.props;
    const { index, questions } = this.state;
    this.setState((prev) => ({
      showNext: false,
      index: (prev.index + 1) % prev.questions.length,
      correct: '',
      wrong: '',
      showCounter: true,
    }));
    dispatch(disableOptions(false));
    const FOUR = questions.length - 1;
    if (index === FOUR) {
      history.push('/feedback');
    }
  };

  render() {
    const { isDisabled } = this.props;
    const { questions, index, showNext, correct, wrong, showCounter } = this.state;
    const arrObj = questions[index];
    const he = require('he');
    if (!arrObj) return null;
    return (
      <div className="gameContent">
        <Header />
        <section>
          {[arrObj].map((q, i) => (
            <div key={ i }>
              <div className="questionContent">
                <div className="questionHeader">
                  <p>{`${q.category} - ${q.difficulty}`}</p>
                </div>
                <p
                  className="question"
                  data-testid="question-text"
                >
                  {he.decode(q.question)}

                </p>
                { showCounter && <Counter showColors={ this.showColors } />}
              </div>
              <div data-testid="answer-options">
                {q.options.map((el, indx) => (
                  <button
                    key={ indx + el }
                    type="button"
                    name={ el === q.correct_answer ? 'correct' : 'wrong' }
                    className={ `${el === q.correct_answer
                      ? correct : wrong} optionsBtn` }
                    id={ indx }
                    data-testid={
                      el === q.correct_answer
                        ? 'correct-answer'
                        : `wrong-answer-${indx}`
                    }
                    onClick={ this.handleClick }
                    disabled={ isDisabled }
                  >
                    {he.decode(el)}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {
            showNext && (
              <button
                className="fill nextBtn"
                data-testid="btn-play"
                type="button"
                onClick={ this.handleNext }
              >
                NEXT QUESTION
              </button>
            )
          }

        </section>
      </div>
    );
  }
}
Game.propTypes = {}.isRequired;

const mapStateToProps = (state) => ({
  isDisabled: state.gameReducer.isDisabled,
  correct: state.gameReducer.correct,
  wrong: state.gameReducer.wrong,
  showNext: state.gameReducer.showNext,
  showCounter: state.gameReducer.showCounter,
  urlLink: state.player.urlLink,
});

export default connect(mapStateToProps)(Game);
