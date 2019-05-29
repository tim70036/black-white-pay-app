import actionType from '../constants/actionTypes';
import { statusMessage } from './status';
import { apiRequest } from '../lib/util';

function replaceFriends(newFriendsData) {
  return { type: actionType.REPLACE_FRIEND_FRIENDS, data: newFriendsData };
}

function clearFriends() {
  return { type: actionType.CLEAR_FRIEND_FRIENDS };
}

function replaceInvitations(newInvitationsData) {
  return { type: actionType.REPLACE_FRIEND_INVITATIONS, data: newInvitationsData };
}

function clearInvitations() {
  return { type: actionType.CLEAR_FRIEND_INVITATIONS };
}

function replaceRequests(newRequestsData) {
  return { type: actionType.REPLACE_FRIEND_REQUESTS, data: newRequestsData };
}

function clearRequests() {
  return { type: actionType.CLEAR_FRIEND_REQUESTS };
}

function replaceCurFriend(newCurFriendData) {
  return { type: actionType.REPLACE_CURFRIEND, data: newCurFriendData };
}

function clearCurFriend() {
  return { type: actionType.CLEAR_CURFRIEND };
}

function getFriends() {
  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/friend/list', 'GET');

    // Process result
    if (result && result.success) {
      const friendList = result.data;
      dispatch(replaceFriends(friendList));
    }
  };
}

function getInvitations() {
  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/invitation/list', 'GET');

    // Process result
    if (result && result.success) {
      const invitationList = result.data;
      dispatch(replaceInvitations(invitationList));
    }
  };
}

function getRequests() {
  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/request/list', 'GET');

    // Process result
    if (result && result.success) {
      const requestList = result.data;
      dispatch(replaceRequests(requestList));
    }
  };
}

export {
  replaceFriends,
  clearFriends,
  replaceInvitations,
  clearInvitations,
  replaceRequests,
  clearRequests,
  replaceCurFriend,
  clearCurFriend,

  getFriends,
  getInvitations,
  getRequests,
};
