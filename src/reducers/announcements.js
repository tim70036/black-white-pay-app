import actionType from '../constants/actionTypes';

const initState = [];

function announcementsReducer(state = initState, action) {
  switch (action.type) {
    case actionType.REPLACE_ANNOUNCEMENTS: {
      if (action.data) {
        return [...action.data];
      }
      return state;
    }
    case actionType.CLEAR_ANNOUNCEMENTS: {
      return initState;
    }
    default:
      return state;
  }
}

export default announcementsReducer;
