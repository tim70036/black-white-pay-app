import actionType from '../constants/actionTypes';

const initState = {
  loading: false,
  success: null,
  error: null,
  info: null,
};

function statusReducer(state = initState, action) {
  switch (action.type) {
    case actionType.REPLACE_STATUS: {
      if (action.data) {
        return {
          ...state,
          loading: action.data.loading || false,
          success: action.data.success || null,
          error: action.data.error || null,
          info: action.data.info || null,
        };
      }
      return state;
    }
    default:
      return state;
  }
}

export default statusReducer;
