import actionType from '../constants/actionTypes';

const initState = {
  storeId: -1,
  account: '',
  amount: '',
  comment: '',
  type: 'receive',
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

    // storeId
    case actionType.REPLACE_QRCODERECIEVE_STOREID: {
      if (action.data) {
        return {
          ...state,
          storeId: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_QRCODERECIEVE_STOREID: {
      return {
        ...state,
        storeId: -1,
      };
    }

    // amount
    case actionType.REPLACE_QRCODERECIEVE_AMOUNT: {
      if (action.data) {
        return {
          ...state,
          amount: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_QRCODERECIEVE_AMOUNT: {
      return {
        ...state,
        amount: '',
      };
    }

    // comment
    case actionType.REPLACE_QRCODERECIEVE_COMMENT: {
      if (action.data) {
        return {
          ...state,
          comment: action.data,
        };
      }
      return state;
    }
    case actionType.CLEAR_QRCODERECIEVE_COMMENT: {
      return {
        ...state,
        comment: '',
      };
    }

    default:
      return state;
  }
}

export default qrCodeReceiveReducer;
