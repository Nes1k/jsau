import * as types from '../actions/types';


const INITIAL_STATE = {
  winner: null,
  player: 'X',
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
};

export default (state = Object.assign({}, INITIAL_STATE), action) => {
  switch(action.type){
    case types.RESET:
      return {...INITIAL_STATE};
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
