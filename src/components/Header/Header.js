import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaCoins } from 'react-icons/fa';
import { connect } from 'react-redux';
import logo from '../../images/logo.png';
import './Header.css';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const email = md5(gravatarEmail).toString();
    return (
      <div className="headerContent">
        <img src={ logo } alt="logo" />
        <img className="profileImg" data-testid="header-profile-picture" alt="profile-img" src={ `https://www.gravatar.com/avatar/${email}` } />
        <p data-testid="header-player-name">{ name }</p>
        <p className="score" data-testid="header-score">
          <FaCoins style={ { color: 'gold' } } />
          { score }
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.player.gravatarEmail,
  name: globalState.player.name,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Header);
