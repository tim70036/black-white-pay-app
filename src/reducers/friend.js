import actionType from '../constants/actionTypes';

const initState = {
  friends: [],
  invitations: [],
  requests: [],
  curFriend: {
    account: '',
    name: '',
    thumbnail: '',
    isFriend: false,
  },
};

function friendReducer(state = initState, action) {
  switch (action.type) {
    // all
    case actionType.REPLACE_FRIEND: {
      if (action.data) {
        return { ...action.data };
      }
      return state;
    }
    case actionType.CLEAR_FRIEND: {
      return initState;
    }

    // friends
    case actionType.REPLACE_FRIEND_FRIENDS: {
      if (action.data) {
        return {
          ...state,
          friends: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_FRIEND_FRIENDS: {
      return {
        ...state,
        friends: [],
      };
    }

    // invitations
    case actionType.REPLACE_FRIEND_INVITATIONS: {
      if (action.data) {
        return {
          ...state,
          invitations: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_FRIEND_INVITATIONS: {
      return {
        ...state,
        invitations: [],
      };
    }

    // requests
    case actionType.REPLACE_FRIEND_REQUESTS: {
      if (action.data) {
        return {
          ...state,
          requests: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_FRIEND_REQUESTS: {
      return {
        ...state,
        requests: [],
      };
    }

    // curFriend
    case actionType.REPLACE_FRIEND_CURFRIEND: {
      if (action.data) {
        return {
          ...state,
          curFriend: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_FRIEND_CURFRIEND: {
      return {
        ...state,
        curFriend: {
          account: '',
          name: '',
          thumbnail: '',
          isFriend: false,
        },
      };
    }

    default:
      return state;
  }
}

export default friendReducer;
