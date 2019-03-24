import actionType from '../constants/actionTypes';
import config from '../constants/config';
import { statusMessage } from './status';
import { replaceUserAuth } from './user';

function replaceWallets(newWalletsData) {
  return { type: actionType.REPLACE_WALLETS, data: newWalletsData };
}

function clearWallets() {
  return { type: actionType.CLEAR_WALLETS };
}

export {
  replaceWallets,
  clearWallets,
};
