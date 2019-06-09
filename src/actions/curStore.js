import actionType from '../constants/actionTypes';
import { statusMessage } from './status';
import { apiRequest } from '../lib/util';

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
    // Init data
    const curStore = {
      storeId: curStoreId,
      ads: [],
      coupons: [],
    };

    dispatch(replaceCurStore(curStore));
  };
}

function getAds() {
  return async (dispatch, getState) => {
    const requestBody = JSON.stringify({
      storeId: getState().curStore.storeId.toString(),
    });

    // Api request
    let result = await apiRequest(dispatch, '/store/ad', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      const adList = result.data;
      dispatch(replaceAds(adList));
    }
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
  getAds,
};
