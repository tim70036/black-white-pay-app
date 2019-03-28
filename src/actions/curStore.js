import actionType from '../constants/actionTypes';
import config from '../constants/config';
import { statusMessage } from './status';
import { replaceUserAuth } from './user';

function replaceCurStore(newStoreData) {
  return { type: actionType.REPLACE_CURSTORE, data: newStoreData };
}

function clearCurStore() {
  return { type: actionType.CLEAR_CURSTORE };
}

function replaceAds(newAdsData) {
  return { type: actionType.REPLACE_CURSTORE_ADS, data: newAdsData };
}

function clearAds() {
  return { type: actionType.CLEAR_CURSTORE_ADS };
}

function replaceCoupons(newCouponsData) {
  return { type: actionType.REPLACE_CURSTORE_COUPONS, data: newCouponsData };
}

function clearCoupons() {
  return { type: actionType.CLEAR_CURSTORE_COUPONS };
}

function setCurStore(curStoreId) {
  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));

    // Get cur store data
    let response;
    try {
      response = await fetch( `${config.apiUrl}/store/ads`, {
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
      const curStore = {
        storeId: curStoreId,
        ads: response.data,
        coupons: [],
      };
      dispatch(replaceCurStore(curStore));
    } else if (response.errCode === 87) {
      dispatch(replaceUserAuth(false));
    } else {

    }

    // Status
    dispatch(statusMessage('loading', false));
  };
}

export {
  replaceCurStore,
  clearCurStore,

  replaceAds,
  clearAds,

  replaceCoupons,
  clearCoupons,

  setCurStore,
};
