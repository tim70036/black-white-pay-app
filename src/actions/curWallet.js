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

function replaceGameList(newGameList) {
  return { type: actionType.REPLACE_CURWALLET_GAMELIST, data: newGameList };
}

function clearGameList() {
  return { type: actionType.CLEAR_CURWALLET_GAMELSIT };
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
      gameList: [],
    };
    dispatch(replaceCurWallet(curWallet));

    // Status
    dispatch(statusMessage('loading', false));
  };
}

function updateCurWallet() {
  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));

    // Get precious curWallet data
    const preCurWallet = getState().curWallet;
    // Find wallet data in wallet list
    const walletList = getState().wallets;
    const targetWallet = walletList.find(wallet => (wallet.storeId === preCurWallet.storeId));

    // Get curWallet data
    const curWallet = {
      ...targetWallet,
      transHistory: preCurWallet.transHistory,
      gameList: preCurWallet.gameList,
    };
    dispatch(replaceCurWallet(curWallet));

    // Status
    dispatch(statusMessage('loading', false));
  }
}

function getGameList() {
  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));

    const requestBody = JSON.stringify({
      storeId: getState().curWallet.storeId.toString(),
    });

    // Api request
    const result = await apiRequest(dispatch, '/game/game-list/list', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      const gameList = result.data;
      dispatch(replaceGameList(gameList));
    }
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
      storeId: getState().curWallet.storeId.toString(),
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
      storeId: getState().curWallet.storeId.toString(),
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
  replaceGameList,
  clearGameList,

  setCurWallet,
  updateCurWallet,
  transfer,
  getTransHistory,
  getGameList,
};
