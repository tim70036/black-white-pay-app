import actionType from '../constants/actionTypes';
import { statusMessage } from './status';

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
    
    // Get curStore data
    const curStore = {
      storeId: curStoreId,
      ads: [],
      coupons: [],
    };
    dispatch(replaceCurStore(curStore));

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
