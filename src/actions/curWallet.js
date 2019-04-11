import actionType from '../constants/actionTypes';
import config from '../constants/config';
import { statusMessage } from './status';
import { replaceUserAuth } from './user';

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
    // if (!targetWallet) {

    // }

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

function transfer(transferData) {
  const {
    accountTo,
    amount,
    transPwd,
    comment,
  } = transferData;

  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));

    // Transfer using form data
    let response;
    try {
      response = await fetch(`${config.apiUrl}/wallet/transfer`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId: getState().curWallet.storeId,
          accountTo: accountTo,
          amount: amount,
          transPwd: transPwd,
          comment: comment,
        }),
      });
      response = await response.json();
      if (!response) throw Error('沒有回應');
      console.log(response);
    } catch (error) {
      console.log(error.message);
      dispatch(statusMessage('loading', false));
      return false;
    }

    // Process response
    if (response.errCode === 0) {
      // Status
      dispatch(statusMessage('loading', false));
      return true;
    } else if (response.errCode === 1) {
      // Status
      dispatch(statusMessage('error', response.msg));
    } else if (response.errCode === 87) {
      dispatch(replaceUserAuth(false));
      // Status
      dispatch(statusMessage('loading', false));
    } else {
      // Status
      dispatch(statusMessage('loading', false));
    }

    return false;

  };
}

function getTransHistory(startTime, endTime) {
  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));

    // Transfer using form data
    let response;
    try {
      response = await fetch(`${config.apiUrl}/wallet/history`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId: getState().curWallet.storeId,
          startTime: startTime,
          endTime: endTime,
        }),
      });
      response = await response.json();
      if (!response) throw Error('沒有回應');
      console.log(response);
    } catch (error) {
      console.log(error.message);
      dispatch(statusMessage('loading', false));
      return;
    }

    // Process response
    if (response.errCode === 0) {
      // Status
      const transHistoryList = response.data;
      dispatch(replaceTransHistory(transHistoryList));
      dispatch(statusMessage('loading', false));
    } else if (response.errCode === 1) {
      // Status
      dispatch(statusMessage('error', response.msg));
    } else if (response.errCode === 87) {
      dispatch(replaceUserAuth(false));
      // Status
      dispatch(statusMessage('loading', false));
    } else {
      // Status
      dispatch(statusMessage('loading', false));
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
