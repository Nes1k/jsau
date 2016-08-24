import React, { Component } from 'react';
import { connect } from 'react-redux';

import { reset } from '../actions/board';
import { Field } from '../components';

export default class Game extends Component {
  constructor(props){
    super(props);

    this.renderScore = this.renderScore.bind(this);
  }

  renderField(){
    const { board } = this.props.game;
    const fields = [];
    for(let y = 0; y < 3; y++){
      for(let x = 0; x < 3; x++){
        fields.push(<Field key={`${x}${y}`} value={board[y][x]} Y={y} X={x} />);
      }
    }
    return fields;
  }

  renderScore(){
    const { game: { winner }, reset } = this.props;

    if(winner === 'O'){
      return (
        <div className="alert alert-danger" role="alert">Game ower.
          <button onClick={reset} />
        </div>
        );
    }
    else if(winner === 'X'){
      return (
        <div className="alert alert-success" role="alert">You win!
          <button onClick={reset}>Restart</button>
        </div>
      );
    }
    else if(winner === 'draw'){
      return (
        <div className="alert alert-warning" role="alert">Draw.
          <button onClick={reset}>Restart</button>
        </div>
      );
    }
    return null;
  }

  render(){
    const { player } = this.props.game;

    return (
      <div className="container">
        <h5>Now: { player === 'O' ? 'Computer' : 'Player'}</h5>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <div className="row">
              {this.renderField()}
            </div>
          </div>
        </div>
        {this.renderScore()}
      </div>
    );
  }
}

const mapStateToProps = ({ game }) =>  {
  return { game };
};

export default connect(mapStateToProps, { reset })(Game);
