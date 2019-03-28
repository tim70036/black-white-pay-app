import actionType from '../constants/actionTypes';

const initState = {
  account: '',
  password: '',
  transPwd: '',
  name: '',
  thumbnail: '',
  authenticated: false,
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
    // authenticated
    case actionType.REPLACE_USER_AUTH: {
      return {
        ...state,
        authenticated: action.data,
      };
    }
    default:
      return state;
  }
}

export default userReducer;
