import actionType from '../constants/actionTypes';
import { statusMessage } from './status';
import { apiRequest } from '../lib/util';

function replaceWallets(newWalletsData) {
  return { type: actionType.REPLACE_WALLETS, data: newWalletsData };
}

function clearWallets() {
  return { type: actionType.CLEAR_WALLETS };
}


function getWallets() {
  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/wallet/list', 'GET');

    // Process result
    if (result && result.success) {
      const walletList = result.data;
      dispatch(replaceWallets(walletList));
    }
  };
}

export {
  replaceWallets,
  clearWallets,
  getWallets,
};
