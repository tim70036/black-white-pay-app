import actionType from '../constants/actionTypes';
import { statusMessage } from './status';
import { apiRequest } from '../lib/util';

function replaceQrCodeReceive(newQrCodeReceiveData) {
  return { type: actionType.REPLACE_QRCODERECIEVE, data: newQrCodeReceiveData };
}

function clearQrCodeReceive() {
  return { type: actionType.CLEAR_QRCODERECIEVE };
}

function replaceCurQrReceive(newCurQrReceiveData) {
  return { type: actionType.REPLACE_CURQRCODERECIEVE, data: newCurQrReceiveData };
}

function clearCurQrReceive() {
  return { type: actionType.CLEAR_CURQRCODERECIEVE };
}

function replaceCurQrReceiveStoreId(newStoreId) {
  return { type: actionType.REPLACE_CURQRCODERECIEVE_STOREID, data: newStoreId };
}

function clearCurQrReceiveStoreId() {
  return { type: actionType.CLEAR_CURQRCODERECIEVE_STOREID };
}

function replaceCurQrReceiveAccount(newAccount) {
  return { type: actionType.REPLACE_CURQRCODERECIEVE_ACCOUNT, data: newAccount };
}

function clearCurQrReceiveAccount() {
  return { type: actionType.CLEAR_CURQRCODERECIEVE_ACCOUNT };
}

function replaceCurQrReceiveAmount(newAmount) {
  return { type: actionType.REPLACE_CURQRCODERECIEVE_AMOUNT, data: newAmount };
}

function clearCurQrReceiveAmount() {
  return { type: actionType.CLEAR_CURQRCODERECIEVE_AMOUNT };
}

function replaceCurQrReceiveComment(newComment) {
  return { type: actionType.REPLACE_CURQRCODERECIEVE_COMMENT, data: newComment };
}

function clearCurQrReceiveComment() {
  return { type: actionType.CLEAR_CURQRCODERECIEVE_COMMENT };
}

function replaceFavorite(newFavorite) {
  return { type: actionType.REPLACE_QRCODERECIEVE_FAVORITE, data: newFavorite };
}

function clearFavorite() {
  return { type: actionType.CLEAR_QRCODERECIEVE_FAVORITE };
}

function setCurQrCodeReceive(data) {
  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));

    dispatch(replaceCurQrReceive(data));

    // Status
    dispatch(statusMessage('loading', false));
  };
}

function getFavoriteList() {
  return async (dispatch, getState) => {
    // Api request
    const result = await apiRequest(dispatch, '/user/qr-re-fav', 'GET');

    // Process result
    if (result && result.success) {
      const favoriteList = result.data;
      dispatch(replaceFavorite(favoriteList));
    }
  };
}

function addFavorite(newFavoriteItem) {
  return async (dispatch, getState) => {
    const { favorite } = getState().qrCodeReceive;

    // prepare body data
    const requestBody = JSON.stringify({
      storeId: newFavoriteItem.storeId.toString(),
      amount: newFavoriteItem.amount,
      comment: newFavoriteItem.comment,
    });

    // Api request
    let result = await apiRequest(dispatch, '/user/qr-re-fav/add', 'POST', requestBody);

    // Process result & update favoriteList
    if (result && result.success) {
      const favoriteList = result.data;
      dispatch(statusMessage('success', '新增成功'));
      dispatch(replaceFavorite(favoriteList));
    }
  };
}

function removeFavorite(targetIdx) {
  return async (dispatch, getState) => {
    const { favorite } = getState().qrCodeReceive;
    const exist = favorite.find(e => (e.id === targetIdx));
    if (!exist) return;

    // prepare body data
    const requestBody = JSON.stringify({
      id: targetIdx.toString(),
    });

    // Api request
    let result = await apiRequest(dispatch, '/user/qr-re-fav/delete', 'POST', requestBody);

    // Process result && update favoriteList
    if (result && result.success) {
      const favoriteList = result.data;
      dispatch(statusMessage('success', '刪除成功'));
      dispatch(replaceFavorite(favoriteList));
    }
  };
}

export {
  replaceQrCodeReceive,
  clearQrCodeReceive,
  replaceCurQrReceive,
  clearCurQrReceive,
  replaceCurQrReceiveStoreId,
  clearCurQrReceiveStoreId,
  replaceCurQrReceiveAccount,
  clearCurQrReceiveAccount,
  replaceCurQrReceiveAmount,
  clearCurQrReceiveAmount,
  replaceCurQrReceiveComment,
  clearCurQrReceiveComment,
  replaceFavorite,
  clearFavorite,


  setCurQrCodeReceive,
  getFavoriteList,
  addFavorite,
  removeFavorite,
};
