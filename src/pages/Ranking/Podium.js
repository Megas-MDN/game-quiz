import React from 'react';
import Confetti from 'react-confetti';
import PodiumStep from './PodiumStep';

class Podium extends React.Component {
  state = {
    arrPlayes: [],
  };

  componentDidMount() {
    const rank = localStorage.getItem('ranking');
    if (rank) {
      this.setState({
        arrPlayes: JSON.parse(rank),
      });
    }
  }

  renderPodium = () => {
    const { arrPlayes } = this.state;
    let arrRender = [];
    if (arrPlayes.length > 2) {
      arrRender = [arrPlayes[1], arrPlayes[0], arrPlayes[2]];
    }
    if (arrPlayes.length === 1) {
      arrRender = [arrPlayes[0]];
    }
    if (arrPlayes.length === 2) {
      arrRender = [arrPlayes[1], arrPlayes[0]];
    }
    return (
      <div
        style={ {
          display: 'grid',
          gridAutoFlow: 'column dense',
          gap: '.5rem',
          marginTop: '2rem',
          justifyContent: 'center',
          justifyItems: 'center',
          alignContent: 'flex-end',
          alignItems: 'flex-end',
          height: 250,
        } }
      >
        {arrRender.map((player, index) => {
          if (!player.name) {
            return <p key={ index }>No Ranking Yet...</p>;
          }
          if (index <= 2) {
            return <PodiumStep key={ index } podium={ index } player={ player } />;
          }
          return null;
        })}
      </div>
    );
  };

  render() {
    if (!this.renderPodium) {
      return <p>No Ranking Yet...</p>;
    }
    return (
      <div className="x-center">
        <Confetti
          tweenDuration={ 10000 }
          recycle={ false }
        />
        {this.renderPodium()}
      </div>
    );
  }
}
export default Podium;
Podium.propTypes = {}.isRequired;
