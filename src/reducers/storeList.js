import actionType from '../constants/actionTypes';

const initState = [];

function storeListReducer(state = initState, action) {
  switch (action.type) {
    case actionType.REPLACE_STORE_LIST: {
      if (action.data) {
        return [...action.data];
      }
      return state;
    }
    case actionType.CLEAR_STORE_LIST: {
      return initState;
    }
    default:
      return state;
  }
}

export default storeListReducer;
