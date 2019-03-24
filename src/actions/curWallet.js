import actionType from '../constants/actionTypes';

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

export {
  replaceCurWallet,
  clearCurWallet
  replaceAvailBalance,
  clearAvailBalance,
  replaceTransHistory,
  clearTransHistory,
};
