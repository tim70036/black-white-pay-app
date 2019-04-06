import actionType from '../constants/actionTypes';

const initState = [];

function notificationsReducer(state = initState, action) {
  switch (action.type) {
    case actionType.REPLACE_NOTIFICATIONS: {
      if (action.data) {
        return [...action.data];
      }
      return state;
    }
    case actionType.CLEAR_NOTIFICATIONS: {
      return initState;
    }
    case actionType.APPEND_NOTIFICATIONS: {
      if (action.data) {
        return [...state, ...action.data];
      }
      return state;
    }
    case actionType.HASREAD_NOTIFICATIONS: {
      const newState = state.map(item => ({ ...item, hasRead: true }));
      return newState;
    }
    default:
      return state;
  }
}

export default notificationsReducer;
