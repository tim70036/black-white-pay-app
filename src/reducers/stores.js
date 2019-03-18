import actionType from '../constants/actionTypes';

const initState = [];

function storesReducer(state = initState, action) {
  switch (action.type) {
    case actionType.REPLACE_STORES: {
      if (action.data) {
        return [...action.data];
      }
      return state;
    }
    case actionType.CLEAR_STORES: {
      return initState;
    }
    default:
      return state;
  }
}

export default storesReducer;
