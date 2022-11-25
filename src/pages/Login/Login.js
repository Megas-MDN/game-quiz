import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import InputText from '../../components/InputText/InputText';
import { getUserToken } from '../../helpers/api';
import logo from '../../images/logo.png';
import { login, resetGame } from '../../redux/actions/index';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      gravatarEmail: '',
      name: '',
      isDisable: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetGame());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateButton);
  };

  validateButton = () => {
    const { gravatarEmail, name } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validateEmail = regex.test(gravatarEmail);
    const validate = validateEmail && name.length > 0;
    this.setState({
      isDisable: !validate,
    });
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const usertoken = await getUserToken();
    localStorage.setItem('token', usertoken);
    history.push('/game');
    dispatch(login(this.state));
  };

  pushToConfig = () => {
    const { history } = this.props;
    history.push('/config');
  };

  pushToRanking = () => {
    const { history } = this.props;
    history.push('/ranking/all');
  };

  render() {
    const { isDisable } = this.state;
    return (
      <div className="content">
        <img src={ logo } alt="logo" />
        <section className="form">
          <InputText
            placeHolder="Nome"
            name="name"
            onChange={ this.handleChange }
          />
          <InputText
            placeHolder="Gravatar Email"
            name="gravatarEmail"
            onChange={ this.handleChange }
          />
          <div className="loginBtns">
            <button
              className="fill"
              data-testid="btn-play"
              type="button"
              disabled={ isDisable }
              onClick={ this.handleClick }
            >
              PLAY
            </button>
            <button
              className="fill"
              data-testid="btn-settings"
              type="button"
              onClick={ this.pushToConfig }
            >
              SETTINGS
            </button>
            <button
              className="fill"
              style={ { width: '99%' } }
              data-testid="btn-settings"
              type="button"
              onClick={ this.pushToRanking }
            >
              RANKING
            </button>
          </div>
        </section>
      </div>

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
