import actionType from '../constants/actionTypes';

const initState = {
  ads: [],
  availBalance: 0,
  coupons: [],
  transHistory: [],
  notifications: [],
};

function curStoreReducer(state = initState, action) {
  switch (action.type) {

    // all
    case actionType.REPLACE_CURSTORE: {
      if (action.data) {
        return { ...action.data };
      }
      return state;
    }
    case actionType.CLEAR_CURSTORE: {
      return initState;
    }

    // ads
    case actionType.REPLACE_ADS: {
      if (action.data) {
        return {
          ...state,
          ads: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_ADS: {
      return {
        ...state,
        ads: [],
      };
    }

    // availBalance
    case actionType.REPLACE_AVAIL_BALANCE: {
      if (action.data) {
        return {
          ...state,
          availBalance: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_AVAIL_BALANCE: {
      return {
        ...state,
        availBalance: 0,
      };
    }

    // coupons
    case actionType.REPLACE_COUPONS: {
      if (action.data) {
        return {
          ...state,
          coupons: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_COUPONS: {
      return {
        ...state,
        coupons: [],
      };
    }

    // transHistory
    case actionType.REPLACE_TRANS_HISTORY: {
      if (action.data) {
        return {
          ...state,
          transHistory: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_TRANS_HISTORY: {
      return {
        ...state,
        transHistory: [],
      };
    }

    // notifications
    case actionType.REPLACE_NOTIFICATIONS: {
      if (action.data) {
        return {
          ...state,
          notifications: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_NOTIFICATIONS: {
      return {
        ...state,
        notifications: [],
      };
    }

    default:
      return state;
  }
}

export default curStoreReducer;
