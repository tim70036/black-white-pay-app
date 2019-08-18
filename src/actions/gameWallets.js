import actionType from '../constants/actionTypes';
import { statusMessage } from './status';
import { apiRequest } from '../lib/util';

function replaceGameWallets(newGameWalletsData) {
  return { type: actionType.REPLACE_GAMEWALLETS, data: newGameWalletsData };
}

function clearGameWallets() {
  return { type: actionType.CLEAR_GAMEWALLETS };
}


function getGameWallets() {
  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/game/wallet/list', 'GET');

    // Process result
    if (result && result.success) {
      const gameWalletList = result.data;
      dispatch(replaceGameWallets(gameWalletList));
    }
  };
}

function recycleOneGameWallet(gameId) {
  return async (dispatch, getState) => {
    const requestBody = JSON.stringify({
      gameId: gameId.toString(),
    });
    // Api request
    let result = await apiRequest(dispatch, '/game/wallet/take-out', 'POST', requestBody);
    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '回收成功'));
      return true;
    }
    return false;
  };
}

function recycleAllGameWallet() {
  return async (dispatch, getState) => {
    const requestBody = JSON.stringify({
    });
    // Api request
    let result = await apiRequest(dispatch, '/game/wallet/take-out-all', 'POST', requestBody);
    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '回收成功'));
      return true;
    }
    return false;
  };
}

export {
  replaceGameWallets,
  clearGameWallets,
  getGameWallets,
  recycleOneGameWallet,
  recycleAllGameWallet,
};
