import actionType from '../constants/actionTypes';
import config from '../constants/config';
import { statusMessage } from './status';
import { replaceUserAuth } from './user';

function replaceStores(newStoresData) {
  return { type: actionType.REPLACE_STORES, data: newStoresData };
}

function clearStores() {
  return { type: actionType.CLEAR_STORES };
}

function getStores() {
  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));

    // Get stores
    let response;
    try {
      response = await fetch( `${config.apiUrl}/store/list`, {
        method: 'GET',
        credentials: 'include',
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
      const storeList = response.data;
      dispatch(replaceStores(storeList));
    } else if (response.errCode === 87) {
      dispatch(replaceUserAuth(false));
    } else {

    }

    // Status
    dispatch(statusMessage('loading', false));
  };
}

export {
  replaceStores,
  clearStores,

  getStores,
};
