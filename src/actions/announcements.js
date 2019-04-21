import actionType from '../constants/actionTypes';
import { statusMessage } from './status';
import { apiRequest } from '../lib/util';

function replaceAnnouncements(newAnnouncementsData) {
  return { type: actionType.REPLACE_ANNOUNCEMENTS, data: newAnnouncementsData };
}

function clearAnnouncements() {
  return { type: actionType.CLEAR_ANNOUNCEMENTS };
}

function getAnnouncements() {
  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/info/announement/list', 'GET');

    // Process result
    if (result && result.success) {
      const announceList = result.data;
      dispatch(replaceAnnouncements(announceList));
    }
  };
}

export {
  replaceAnnouncements,
  clearAnnouncements,
  getAnnouncements,
};
