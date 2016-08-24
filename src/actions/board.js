import * as types from './types';


export const select = (coords) => {
  return (dispatch, getState) => {
    dispatch(_select(coords));

    const { game: { board, player } } = getState();
    const winner = check(board, coords);
    if(winner){
      dispatch(_setwinner(winner));
    }
    else if (player === 'O') {
      let xy ;
      xy = where(board);
      if(xy){
        dispatch(select(xy));
      }
      else {
        xy = where(board, 'X');
        if(xy){
          dispatch(select(xy));
        } else {
          xy = random(board);
          if(xy){
            dispatch(select(xy));
          } else {
            dispatch(_setwinner('draw'));
          }
        }
      }
    }
  };
};

export const reset = () => {
  return {
    type: types.RESET
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
			return table[2][0];
		}
	}
};

// check where put sign
const where = (table, check='O') => {
	let player = 0;
	let free;
	const cross_x = [2, 1, 0];

	//cross [0][0] [1][1] [2][2]
	for(let i = 0; i < 3; i++){
		if(table[i][i] === check){
			player += 1;
		}
		else if(table[i][i] === null){
			free = {Y: i, X: i};
		}
	}
	if(player === 2 && free){
		return free;
	}
	player = 0;
	free = null;

	//cross [0][2] [1][1] [2][0]
	for(let i = 0; i < 3; i++){
		if(table[i][cross_x[i]] === check){
			player += 1;
		}
		else if(table[i][i] === null){
			free = {Y: i, X: cross_x[i]};
		}
	}
	if(player === 2 && free){
		return free;
	}

	for(let i = 0; i < 3; i++){
		player = 0;
		free = null;

		//row
		for(let j = 0; j < 3; j++){
			if(table[j][i] === check){
				player += 1;
			}
			else if(table[j][i] === null){
				free = {Y: j, X: i};
			}
		}
		if(player === 2 && free){
			return free;
		}

		player = 0;
		free = null;
		// column
		for(let j = 0; j < 3; j++){
			if(table[i][j] === check){
				player += 1;
			}
			else if(table[i][j] === null){
				free = {Y: i, X: j};
			}
		}
		if(player === 2 && free){
			return free;
		}

	}
  return null;
};

// return first free field
const random = (board) =>{
  for(let x = 0; x < 3; x++){
    for(let y = 0; y < 3; y++){
      if(board[y][x] === null){
        return {Y: y, X: x};
      }
    }
  }
};

