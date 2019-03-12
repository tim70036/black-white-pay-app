import actionType from '../constants/actionTypes';

function replaceCurStore(newStoreData) {
  return { type: actionType.REPLACE_CURSTORE, data: newStoreData };
}

function clearCurStore() {
  return { type: actionType.CLEAR_CURSTORE };
}

function replaceAds(newAdsData) {
  return { type: actionType.REPLACE_ADS, data: newAdsData };
}

function clearAds() {
  return { type: actionType.CLEAR_ADS };
}

function replaceAvailBalance(newAvailBalanceData) {
  return { type: actionType.REPLACE_AVAIL_BALANCE, data: newAvailBalanceData };
}

function clearAvailBalance() {
  return { type: actionType.CLEAR_AVAIL_BALANCE };
}

function replaceCoupons(newCouponsData) {
  return { type: actionType.REPLACE_COUPONS, data: newCouponsData };
}

function clearCoupons() {
  return { type: actionType.CLEAR_COUPONS };
}

function replaceTransHistory(newTransHistoryData) {
  return { type: actionType.REPLACE_TRANS_HISTORY, data: newTransHistoryData };
}

function clearTransHistory() {
  return { type: actionType.CLEAR_TRANS_HISTORY };
}

function replaceNotifications(newNotificationsData) {
  return { type: actionType.REPLACE_NOTIFICATIONS, data: newNotificationsData };
}

function clearNotifications() {
  return { type: actionType.CLEAR_NOTIFICATIONS };
}

export {
  replaceCurStore,
  clearCurStore,

  replaceAds,
  clearAds,

  replaceAvailBalance,
  clearAvailBalance,

  replaceCoupons,
  clearCoupons,

  replaceTransHistory,
  clearTransHistory,

  replaceNotifications,
  clearNotifications,
};
