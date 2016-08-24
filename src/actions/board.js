import * as types from './types';


export const select = (coords) => {
  return (dispatch, getState) => {
    dispatch(_select(coords));

    const { game: { board } } = getState();
    const winner = check(board, coords);
    console.log('winner: ', winner);
    if(winner){
      dispatch(_setwinner(winner));
    }
  };
};

const _select = (coords) => {
  return {
    type: types.SELECT,
    coords
  };
};

const _setwinner = (winner) => {
  return {
    type: types.SET_WINNER,
    winner
  };
};

const check = (table, {Y, X}) => {
  //check row
	if((table[Y][0] === table[Y][1]) && (table[Y][1] === table[Y][2])){
		return table[Y][0];
	}

  //check column
	else if((table[0][X] === table[1][X]) && (table[1][X] === table[2][X])){
		return table[0][X];
	}

	if(X === Y || X + Y === 2){
		if((table[0][0] === table[1][1]) && (table[1][1] === table[2][2])){
			return table[0][0];
		}
		else if((table[2][0] === table[1][1]) && (table[1][1] === table[0][2])){
			return table[0][0];
		}	
	}
};
