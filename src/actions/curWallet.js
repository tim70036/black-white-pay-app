import actionType from '../constants/actionTypes';
import { statusMessage } from './status';

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


export {
  replaceCurWallet,
  clearCurWallet,
  replaceAvailBalance,
  clearAvailBalance,
  replaceTransHistory,
  clearTransHistory,

  setCurWallet,
};
