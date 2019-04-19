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
      console.log(response);
    } catch (error) {
      console.log(error.message);
      dispatch(statusMessage('error', '網路發生問題，請重試'));
      return false;
    }

    if (!response) {
      dispatch(statusMessage('error', '網路發生問題，請重試'));
      return false;
    }
    // Process response
    if (response.errCode === 0) {
      const storeList = response.data;
      dispatch(replaceStores(storeList));
    } else if (response.errCode === 1) {
      // Status
      dispatch(statusMessage('error', response.msg));
    } else if (response.errCode === 87) {
      dispatch(replaceUserAuth(false));
      dispatch(statusMessage('error', response.msg));
    } else {
      dispatch(statusMessage('error', '網路發生問題，請重試'));
    }

    // Status
    dispatch(statusMessage('loading', false));
  };
}


function bindStores(data) {
  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));
    const { bindCode } = data;

    // Get stores
    let response;
    try {
      response = await fetch( `${config.apiUrl}/store/bind`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bindCode: bindCode,
        }),
      });
      response = await response.json();
      console.log(response);
    } catch (error) {
      console.log(error.message);
      dispatch(statusMessage('error', '網路發生問題，請重試'));
      return false;
    }

    if (!response) {
      dispatch(statusMessage('error', '網路發生問題，請重試'));
      return false;
    }
    // Process response
    if (response.errCode === 0) {
      dispatch(statusMessage('success', '新增成功'));
      return true;
    } else if (response.errCode === 1) {
      // Status
      dispatch(statusMessage('error', response.msg));
    } else if (response.errCode === 87) {
      dispatch(replaceUserAuth(false));
      dispatch(statusMessage('error', response.msg));
    } else {
      dispatch(statusMessage('error', '網路發生問題，請重試'));
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
