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
    const { board } = this.props;
    const fields = [];
    for(let y = 0; y < 3; y++){
      for(let x = 0; x < 3; x++){
        fields.push(<Field key={`${x}${y}`} value={board[y][x]} Y={y} X={x} />);
      }
    }
    return fields;
  }

  render(){
    return (
      <div className="container">
        <h5>Now: player</h5>
        <div className="col-sm-3">
          <div className="row">
            {this.renderField()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ board }) =>  {
  return { board };
};

export default connect(mapStateToProps)(Game);
