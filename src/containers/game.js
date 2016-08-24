import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Field } from '../components';

export default class Game extends Component {
  constructor(props){
    super(props);
  }

  onClick(){
    console.log('Click');
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

  renderScore(winner){
    console.log('Render', winner);
    if(winner === 'O'){
      return <div className="alert alert-danger" role="alert">Game ower.</div>;
    }
    else if(winner === 'X'){
      return <div className="alert alert-success" role="alert">You win!</div>;
    }
    return null;
  }

  render(){
    const { player, winner } = this.props.game;

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
        {this.renderScore(winner)}
      </div>
    );
  }
}

const mapStateToProps = ({ game }) =>  {
  return { game };
};

export default connect(mapStateToProps)(Game);
