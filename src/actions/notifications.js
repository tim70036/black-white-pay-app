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

function hasReadNotifications() {
  return { type: actionType.HASREAD_NOTIFICATIONS };
}

function getNotifications() {
  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));

    // Get stores
    let response;
    try {
      response = await fetch( `${config.apiUrl}/user/notification/list`, {
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
      const notificationList = response.data;
      dispatch(replaceNotifications(notificationList));
    } else if (response.errCode === 87) {
      dispatch(replaceUserAuth(false));
    } else {

    }

    // Status
    dispatch(statusMessage('loading', false));
  };
}

export {
  replaceNotifications,
  clearNotifications,
  appendNotifications,
  hasReadNotifications,
  getNotifications,
};
