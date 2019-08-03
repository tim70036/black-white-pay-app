import actionType from '../constants/actionTypes';

const initState = {
  curQrReceive: {
    storeId: -1,
    account: '',
    amount: '',
    comment: '',
    type: 'receive',
  },
  favorite: [],
};

function qrCodeReceiveReducer(state = initState, action) {
  switch (action.type) {
    // all
    case actionType.REPLACE_QRCODERECIEVE: {
      if (action.data) {
        return { ...action.data };
      }
      return state;
    }
    case actionType.CLEAR_QRCODERECIEVE: {
      return initState;
    }

    // curQrReceive
    case actionType.REPLACE_CURQRCODERECIEVE: {
      if (action.data) {
        return {
          ...state,
          curQrReceive: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_CURQRCODERECIEVE: {
      return {
        ...state,
        curQrReceive: {
          storeId: -1,
          account: '',
          amount: '',
          comment: '',
          type: 'receive',
        },
      };
    }

    // curQrReceiveStoreId
    case actionType.REPLACE_CURQRCODERECIEVE_STOREID: {
      if (action.data) {
        const newState = Object.assign({}, state);
        newState.curQrReceive.storeId = action.data;
        return newState;
      }
      return state;
    }
    case actionType.CLEAR_CURQRCODERECIEVE_STOREID: {
      const newState = Object.assign({}, state);
      newState.curQrReceive.storeId = -1;
      return newState;
    }

    // curQrReceiveAccount
    case actionType.REPLACE_CURQRCODERECIEVE_ACCOUNT: {
      if (action.data) {
        const newState = Object.assign({}, state);
        newState.curQrReceive.account = action.data;
        return newState;
      }
      return state;
    }
    case actionType.CLEAR_CURQRCODERECIEVE_ACCOUNT: {
      const newState = Object.assign({}, state);
      newState.curQrReceive.account = '';
      return newState;
    }

    // curQrReceiveAmount
    case actionType.REPLACE_CURQRCODERECIEVE_AMOUNT: {
      if (action.data || action.data === '') {
        const newState = Object.assign({}, state);
        newState.curQrReceive.amount = action.data;
        return newState;
      }
      return state;
    }
    case actionType.CLEAR_CURQRCODERECIEVE_AMOUNT: {
      const newState = Object.assign({}, state);
      newState.curQrReceive.amount = '';
      return newState;
    }

    // curQrReceiveComment
    case actionType.REPLACE_CURQRCODERECIEVE_COMMENT: {
      if (action.data || action.data === '') {
        const newState = Object.assign({}, state);
        newState.curQrReceive.comment = action.data;
        return newState;
      }
      return state;
    }
    case actionType.CLEAR_CURQRCODERECIEVE_COMMENT: {
      const newState = Object.assign({}, state);
      newState.curQrReceive.comment = '';
      return newState;
    }

    // favorite
    case actionType.REPLACE_QRCODERECIEVE_FAVORITE: {
      if (action.data) {
        return {
          ...state,
          favorite: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_QRCODERECIEVE_FAVORITE: {
      return {
        ...state,
        favorite: [],
      };
    }

    default:
      return state;
  }
}

export default qrCodeReceiveReducer;
