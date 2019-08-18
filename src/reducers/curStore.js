import actionType from '../constants/actionTypes';

const initState = {
  storeId: -1,
  ads: [],
  coupons: [],
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
    case actionType.REPLACE_CURSTORE_ADS: {
      if (action.data) {
        return {
          ...state,
          ads: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_CURSTORE_ADS: {
      return {
        ...state,
        ads: [],
      };
    }

    // comment
    case actionType.REPLACE_CURSTORE_COMMENT: {
      if (action.data) {
        return {
          ...state,
          comment: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_CURSTORE_COMMENT: {
      return {
        ...state,
        comment: '',
      };
    }

    // coupons
    case actionType.REPLACE_CURSTORE_COUPONS: {
      if (action.data) {
        return {
          ...state,
          coupons: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_CURSTORE_COUPONS: {
      return {
        ...state,
        coupons: [],
      };
    }

    default:
      return state;
  }
}

export default curStoreReducer;
