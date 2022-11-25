import { Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class FullRanking extends Component {
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

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  goRanking = () => {
    const { history } = this.props;
    history.push('/ranking/');
  };

  render() {
    const { arrPlayes } = this.state;

    const columns = [
      {
        field: 'avatar',
        headerName: 'GRAVATAR',
        width: 90,
        renderCell: (params) => <Avatar src={ params.formattedValue } />,
      },
      { field: 'name', headerName: 'NAME', width: 150 },
      { field: 'score', headerName: 'SCORE', width: 150 },
    ];

    const rows = arrPlayes.map((row, index) => ({
      id: index,
      avatar: row.picture,
      name: row.name,
      score: row.score,
    }));
    const TEN = 10;
    return (
      <div style={ { width: '500px' } }>
        <DataGrid
          autoHeight
          rows={ rows }
          columns={ columns }
          pageSize={ 10 }
          rowsPerPageOptions={ [TEN] }
        />
        <div className="loginBtns">
          <button className="fill" type="button" onClick={ this.goRanking }>
            GO TO WINNERS
          </button>
          <button className="fill" type="button" onClick={ this.goHome }>
            GO HOME
          </button>
        </div>
      </div>
    );
  }
}
FullRanking.propTypes = {}.isRequired;
export default connect()(FullRanking);
