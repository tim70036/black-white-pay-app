import actionType from '../constants/actionTypes';
import config from '../constants/config';
import { statusMessage } from './status';
import { replaceUserAuth } from './user';

function replaceNotifications(newNotificationsData) {
  return { type: actionType.REPLACE_NOTIFICATIONS, data: newNotificationsData };
}

function clearNotifications() {
  return { type: actionType.CLEAR_NOTIFICATIONS };
}

function appendNotifications(newNotificationsData) {
  return { type: actionType.APPEND_NOTIFICATIONS, data: newNotificationsData };
}

export {
  replaceNotifications,
  clearNotifications,
  appendNotifications,
};
