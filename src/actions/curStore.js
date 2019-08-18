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

function replaceComment(newCommentData) {
  return { type: actionType.REPLACE_CURSTORE_COMMENT, data: newCommentData };
}

function clearComment() {
  return { type: actionType.CLEAR_CURSTORE_COMMENT };
}

function replaceCoupons(newCouponsData) {
  return { type: actionType.REPLACE_CURSTORE_COUPONS, data: newCouponsData };
}

function clearCoupons() {
  return { type: actionType.CLEAR_CURSTORE_COUPONS };
}

function setCurStore(curStoreId) {
  return async (dispatch, getState) => {

    const storeList = getState().stores;
    const targetStore = storeList.find(store => (store.storeId === curStoreId));
    const curStore = {
      ...targetStore,
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
    const result = await apiRequest(dispatch, '/store/ad', 'POST', requestBody);
    // Process result
    if (result && result.success) {
      const adList = result.data;
      dispatch(replaceAds(adList));
    }
  };
}

function getComment() {
  return async (dispatch, getState) => {
    const requestBody = JSON.stringify({
      storeId: getState().curStore.storeId.toString(),
    });

    // Api request
    const result = await apiRequest(dispatch, '/store/comment', 'POST', requestBody);
    // Process result
    if (result && result.success) {
      const comment = result.data;
      dispatch(replaceComment(comment));
    }
  };
}

export {
  replaceCurStore,
  clearCurStore,

  replaceAds,
  clearAds,

  replaceComment,
  clearComment,

  replaceCoupons,
  clearCoupons,

  setCurStore,
  getAds,
  getComment,
};
