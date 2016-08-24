import * as types from '../actions/types';


const INITIAL_STATE = {
  winner: null,
  player: 'O',
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
  case types.SELECT:
    const newState = {...state};
    newState.player = state.player === 'O' ? 'X' : 'O';
    newState.board[action.coords.Y][action.coords.X] = state.player;
    return newState;
  case types.SET_WINNER:
    return {...state, winner: action.winner};
  default:
    return state;
  }
};
