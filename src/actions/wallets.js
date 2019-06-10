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

function exchange(formData) {
  const {
    outflowStoreId,
    inflowStoreId,
    amount,
    transPwd,
    comment,
  } = formData;

  return async (dispatch, getSatate) => {
    const requestBody = JSON.stringify({
      outflowStoreId: outflowStoreId.toString(),
      inflowStoreId: inflowStoreId.toString(),
      amount: amount.toString(),
      transPwd: transPwd.toString(),
      comment: comment,
    });

    // Api request
    let result = await apiRequest(dispatch, '/wallet/exchange', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '兌換成功'));
      return true;
    }

    return false;
  };
}

export {
  replaceWallets,
  clearWallets,
  getWallets,
  exchange,
};
