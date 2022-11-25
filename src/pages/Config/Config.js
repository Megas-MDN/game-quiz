import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../helpers/api';
import logo from '../../images/logo.png';
import { setLink } from '../../redux/actions';
import './Config.css';

const FIVE = 5;
const EIGHT = 8;
const ANY_DIFFICULTY = 'Any Difficulty';

class Config extends Component {
  state = {
    questionsNumber: 5,
    category: 'Any category',
    categories: ['...Loading'],
    difficulty: ANY_DIFFICULTY,
    type: 'Any Type',
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  generateLink = (theState) => {
    const { dispatch, history } = this.props;
    const { questionsNumber, category, difficulty, type, categories } = theState;
    let link = `amount=${questionsNumber > 0 ? questionsNumber : FIVE}`;
    link += `${
      category !== 'Any category'
        ? `&category=${EIGHT + categories.indexOf(category)}`
        : ''
    }`;
    link += `${
      difficulty !== ANY_DIFFICULTY ? `&difficulty=${difficulty}` : ''
    }`;
    link += `${
      type !== 'Any Type'
        ? `&type=${type === 'Multiple Choice' ? 'multiple' : 'boolean'}`
        : ''
    }`;
    link += '&token=';
    dispatch(setLink(link));
    history.push('/');
  };

  render() {
    const { categories, category, difficulty, questionsNumber, type } = this.state;
    return (
      <section className="section-config">
        <img src={ logo } alt="logo" className="section-img" />
        <div className="section-div">
          <h1 data-testid="settings-title" className="config-title">
            SEETINGS
          </h1>
        </div>
        <div className="inputs-container">
          <select name="category" onChange={ this.handleChange } value={ category }>
            {categories.map((element) => (
              <option key={ element }>{element}</option>
            ))}
          </select>
          <select
            name="difficulty"
            onChange={ this.handleChange }
            value={ difficulty }
          >
            {['Any Difficulty', 'easy', 'medium', 'hard'].map((element) => (
              <option key={ element }>{element}</option>
            ))}
          </select>
          <label htmlFor="questionsNumber" className="number-container">
            NUMBER OF QUESTIONS
            <input
              type="number"
              name="questionsNumber"
              id="questionsNumber"
              value={ questionsNumber }
              onChange={ this.handleChange }
            />
          </label>
          <select name="type" onChange={ this.handleChange } value={ type }>
            {['Any Type', 'Multiple Choice', 'True / False'].map((element) => (
              <option key={ element }>{element}</option>
            ))}
          </select>
          <div className="loginBtns">
            <button
              type="button"
              style={ { width: '100%' } }
              className="fill"
              onClick={ () => this.generateLink(this.state) }
            >
              {' '}
              PLAY NOW
            </button>
          </div>
        </div>
      </section>
    );
  }
}

Config.propTypes = {}.isRequired;

export default connect()(Config);
