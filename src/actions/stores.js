import actionType from '../constants/actionTypes';
import { statusMessage } from './status';
import { apiRequest } from '../lib/util';

function replaceStores(newStoresData) {
  return { type: actionType.REPLACE_STORES, data: newStoresData };
}

function clearStores() {
  return { type: actionType.CLEAR_STORES };
}

function getStores() {
  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/store/list', 'GET');

    // Process result
    if (result && result.success) {
      const storeList = result.data;
      dispatch(replaceStores(storeList));
    }
  };
}


function bindStores(formData) {
  const { bindCode } = formData;
  const requestBody = JSON.stringify({
    bindCode: bindCode,
  });

  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/store/bind', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '新增成功'));
      return true;
    }

    return false;
  };
}


export {
  replaceStores,
  clearStores,

  getStores,
  bindStores,
};
