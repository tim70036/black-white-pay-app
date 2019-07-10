import actionType from '../constants/actionTypes';
import { statusMessage } from './status';

function replaceQrCodeReceive(newQrCodeReceiveData) {
  return { type: actionType.REPLACE_QRCODERECIEVE, data: newQrCodeReceiveData };
}

function clearQrCodeReceive() {
  return { type: actionType.CLEAR_QRCODERECIEVE };
}

function replaceQrCodeReceiveStoreId(newStoreIdData) {
  return { type: actionType.REPLACE_QRCODERECIEVE_STOREID, data: newStoreIdData };
}

function clearQrCodeReceiveStoreId() {
  return { type: actionType.CLEAR_QRCODERECIEVE_STOREID };
}

function replaceQrCodeReceiveAmount(newAmountData) {
  return { type: actionType.REPLACE_QRCODERECIEVE_AMOUNT, data: newAmountData };
}

function clearQrCodeReceiveAmount() {
  return { type: actionType.CLEAR_QRCODERECIEVE_AMOUNT };
}

function replaceQrCodeReceiveComment(newCommentData) {
  return { type: actionType.REPLACE_QRCODERECIEVE_COMMENT, data: newCommentData };
}

function clearQrCodeReceiveComment() {
  return { type: actionType.CLEAR_QRCODERECIEVE_COMMENT };
}

function setQrCodeReceive(data) {
  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));

    dispatch(replaceQrCodeReceive(data));

    // Status
    dispatch(statusMessage('loading', false));
  };
}

function setQrCodeReceiveStoreId(data) {
  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));

    dispatch(replaceQrCodeReceiveStoreId(data));

    // Status
    dispatch(statusMessage('loading', false));
  };
}

export {
  replaceQrCodeReceive,
  clearQrCodeReceive,
  replaceQrCodeReceiveStoreId,
  clearQrCodeReceiveStoreId,
  replaceQrCodeReceiveAmount,
  clearQrCodeReceiveAmount,
  replaceQrCodeReceiveComment,
  clearQrCodeReceiveComment,

  setQrCodeReceive,
  setQrCodeReceiveStoreId,
};
