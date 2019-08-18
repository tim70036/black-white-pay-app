import actionType from '../constants/actionTypes';

const initState = [];

function gameWalletsReducer(state = initState, action) {
  switch (action.type) {
    case actionType.REPLACE_GAMEWALLETS: {
      if (action.data) {
        return [...action.data];
      }
      return state;
    }
    case actionType.CLEAR_GAMEWALLETS: {
      return initState;
    }
    default:
      return state;
  }
}

export default gameWalletsReducer;
