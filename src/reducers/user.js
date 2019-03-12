import actionType from '../constants/actionTypes';

const initState = {
  name: 'Unknown',
  phone: '8888888',
  account: 'm1',
  pwd: '1',
};

function userReducer(state = initState, action) {
  switch (action.type) {
    case actionType.REPLACE_USER: {
      if (action.data) {
        return { ...action.data };
      }
      return state;
    }
    case actionType.CLEAR_USER: {
      return initState;
    }
    default:
      return state;
  }
}

export default userReducer;
