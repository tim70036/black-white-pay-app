import actionType from '../constants/actionTypes';
import { statusMessage } from './status';
import { apiRequest } from '../lib/util';

function replaceCurWallet(newCurWalletData) {
  return { type: actionType.REPLACE_CURWALLET, data: newCurWalletData };
}

function clearCurWallet() {
  return { type: actionType.CLEAR_CURWALLET };
}

function replaceAvailBalance(newAvailBalanceData) {
  return { type: actionType.REPLACE_CURWALLET_AVAIL, data: newAvailBalanceData };
}

function clearAvailBalance() {
  return { type: actionType.CLEAR_CURWALLET_AVAIL };
}

function replaceTransHistory(newTransHistoryData) {
  return { type: actionType.REPLACE_CURWALLET_HISTORY, data: newTransHistoryData };
}

function clearTransHistory() {
  return { type: actionType.CLEAR_CURWALLET_HISTORY };
}

function setCurWallet(curStoreId) {
  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));

    // Find wallet data in wallet list
    const walletList = getState().wallets;
    const targetWallet = walletList.find(wallet => (wallet.storeId === curStoreId));

    // Get curWallet data
    const curWallet = {
      ...targetWallet,
      transHistory: [],
    };
    dispatch(replaceCurWallet(curWallet));

    // Status
    dispatch(statusMessage('loading', false));
  };
}

function transfer(formData) {
  const {
    accountTo,
    amount,
    transPwd,
    comment,
  } = formData;
  

  return async (dispatch, getState) => {
    const requestBody = JSON.stringify({
      storeId: getState().curWallet.storeId,
      accountTo: accountTo,
      amount: amount,
      transPwd: transPwd,
      comment: comment,
    });

    // Api request
    let result = await apiRequest(dispatch, '/wallet/transfer', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '轉帳成功'));
      return true;
    }

    return false;
  };
}

function getTransHistory(startTime, endTime) {
  return async (dispatch, getState) => {
    const requestBody = JSON.stringify({
      storeId: getState().curWallet.storeId,
      startTime: startTime,
      endTime: endTime,
    });

    // Api request
    let result = await apiRequest(dispatch, '/wallet/history', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      const transHistoryList = result.data;
      dispatch(replaceTransHistory(transHistoryList));
    }
  };
}


export {
  replaceCurWallet,
  clearCurWallet,
  replaceAvailBalance,
  clearAvailBalance,
  replaceTransHistory,
  clearTransHistory,

  setCurWallet,
  transfer,
  getTransHistory,
};
