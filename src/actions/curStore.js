import actionType from '../constants/actionTypes';

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

export {
  replaceCurStore,
  clearCurStore,

  replaceAds,
  clearAds,

  replaceCoupons,
  clearCoupons,

};
