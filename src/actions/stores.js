import actionType from '../constants/actionTypes';
import config from '../constants/config';
import { statusMessage } from './status';

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
      response = await fetch( `${config.apiUrl}/store/store-list`, {
        method: 'GET',
        credentials: 'include',
      });
      response = await response.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // Process response
    if (response.errCode === 0) {
      const storeList = response.data;
      dispatch(replaceStores(storeList));
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
