import actionType from '../constants/actionTypes';
import { statusMessage } from './status';
import { apiRequest } from '../lib/util';

function replaceNotifications(newNotificationsData) {
  return { type: actionType.REPLACE_NOTIFICATIONS, data: newNotificationsData };
}

function clearNotifications() {
  return { type: actionType.CLEAR_NOTIFICATIONS };
}

function appendNotifications(newNotificationsData) {
  return { type: actionType.APPEND_NOTIFICATIONS, data: newNotificationsData };
}

function hasReadNotifications() {
  return { type: actionType.HASREAD_NOTIFICATIONS };
}

function getNotifications() {
  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/info/notification/list', 'GET');

    // Process result
    if (result && result.success) {
      const notificationList = result.data;
      dispatch(replaceNotifications(notificationList));
    }
  };
}

export {
  replaceNotifications,
  clearNotifications,
  appendNotifications,
  hasReadNotifications,
  getNotifications,
};
