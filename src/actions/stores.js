import actionType from '../constants/actionTypes';

function replaceStores(newStoresData) {
  return { type: actionType.REPLACE_STORES, data: newStoresData };
}

function clearStores() {
  return { type: actionType.CLEAR_STORES };
}

export { replaceStores, clearStores };
