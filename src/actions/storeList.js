import actionType from '../constants/actionTypes';

function replaceStoreList(newStoresData) {
  return { type: actionType.REPLACE_STORE_LIST, data: newStoresData };
}

function clearStoreList() {
  return { type: actionType.CLEAR_STORE_LIST };
}

export { replaceStoreList, clearStoreList };
