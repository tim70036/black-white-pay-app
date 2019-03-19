import actionType from '../constants/actionTypes';

const initState = {
  account: 'm1',
  password: '1',
  transPwd: '1',
  name: 'Unknown',
  phone: '8888888',
  thumbnail: '',
};

function userReducer(state = initState, action) {
  switch (action.type) {
    // all
    case actionType.REPLACE_USER: {
      if (action.data) {
        return { ...action.data };
      }
      return state;
    }
    case actionType.CLEAR_USER: {
      return initState;
    }
    // account
    case actionType.REPLACE_USER_ACCOUNT: {
      if (action.data) {
        return {
          ...state,
          account: action.data,
        };
      }
      return state;
    }
    // password
    case actionType.REPLACE_USER_PASSWORD: {
      if (action.data) {
        return {
          ...state,
          password: action.data,
        };
      }
      return state;
    }
    // transPwd
    case actionType.REPLACE_USER_TRANSPWD: {
      if (action.data) {
        return {
          ...state,
          transPwd: action.data,
        };
      }
      return state;
    }
    // name
    case actionType.REPLACE_USER_NAME: {
      if (action.data) {
        return {
          ...state,
          name: action.data,
        };
      }
      return state;
    }
    default:
      return state;
  }
}

export default userReducer;
