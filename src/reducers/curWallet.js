import actionType from '../constants/actionTypes';

const initState = {
  storeId: -1,
  currencyName: '',
  availBalance: 0,
  transHistory: [],
  gameList: [],
};

function curWalletReducer(state = initState, action) {
  switch (action.type) {
    // all
    case actionType.REPLACE_CURWALLET: {
      if (action.data) {
        return { ...action.data };
      }
      return state;
    }
    case actionType.CLEAR_CURWALLET: {
      return initState;
    }


    // availBalance
    case actionType.REPLACE_CURWALLET_AVAIL: {
      if (action.data) {
        return {
          ...state,
          availBalance: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_CURWALLET_AVAIL: {
      return {
        ...state,
        availBalance: 0,
      };
    }

    // transHistory
    case actionType.REPLACE_CURWALLET_HISTORY: {
      if (action.data) {
        return {
          ...state,
          transHistory: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_CURWALLET_HISTORY: {
      return {
        ...state,
        transHistory: [],
      };
    }

    // gameList
    case actionType.REPLACE_CURWALLET_GAMELIST: {
      if (action.data) {
        return {
          ...state,
          gameList: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_CURWALLET_GAMELSIT: {
      return {
        ...state,
        gameList: [],
      };
    }

    default:
      return state;
  }
}

export default curWalletReducer;
