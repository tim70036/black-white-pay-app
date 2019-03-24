import actionType from '../constants/actionTypes';

const initState = [];

function walletsReducer(state = initState, action) {
  switch (action.type) {
    case actionType.REPLACE_WALLETS: {
      if (action.data) {
        return [...action.data];
      }
      return state;
    }
    case actionType.CLEAR_WALLETS: {
      return initState;
    }
    default:
      return state;
  }
}

export default walletsReducer;
