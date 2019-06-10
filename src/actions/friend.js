import actionType from '../constants/actionTypes';
import { statusMessage } from './status';
import { apiRequest } from '../lib/util';

function replaceFriend(newFriendData) {
  return { type: actionType.REPLACE_FRIEND, data: newFriendData };
}

function clearFriend() {
  return { type: actionType.CLEAR_FRIEND };
}

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
  return { type: actionType.REPLACE_FRIEND_CURFRIEND, data: newCurFriendData };
}

function clearCurFriend() {
  return { type: actionType.CLEAR_FRIEND_CURFRIEND };
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
    let result = await apiRequest(dispatch, '/friend/invitation/list', 'GET');

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
    let result = await apiRequest(dispatch, '/friend/request/list', 'GET');

    // Process result
    if (result && result.success) {
      const requestList = result.data;
      dispatch(replaceRequests(requestList));
    }
  };
}

function getDetail(formData) {
  const { account } = formData;
  
  return async (dispatch, getState) => {
    const requestBody = JSON.stringify({
      account: account,
    });

    // Api request
    let result = await apiRequest(dispatch, '/friend/detail', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      const friendDetail = result.data;
      dispatch(replaceCurFriend(friendDetail));
      return true;
    }

    return false;
  };
}

function createRequest(formData) {
  const { account } = formData;
  
  return async (dispatch, getState) => {
    const requestBody = JSON.stringify({
      account: account,
    });

    // Api request
    let result = await apiRequest(dispatch, '/friend/request/create', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '好友邀請已送出'));
      // Call actions to refresh data
      dispatch(getRequests());
      return true;
    }

    return false;
  };
}

function cancelRequest(formData) {
  const { account } = formData;

  return async (dispatch, getState) => {
    const requestBody = JSON.stringify({
      account: account,
    });

    // Api request
    let result = await apiRequest(dispatch, '/friend/request/cancel', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '好友邀請已收回'));
      // Call actions to refresh data
      dispatch(getRequests());
      return true;
    }

    return false;
  };
}

function acceptInvitation(formData) {
  const { account } = formData;

  return async (dispatch, getState) => {
    const requestBody = JSON.stringify({
      account: account,
    });

    // Api request
    let result = await apiRequest(dispatch, '/friend/invitation/accept', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '接受好友邀請成功'));
      // Call actions to refresh data
      dispatch(getInvitations());
      dispatch(getFriends());
      return true;
    }

    return false;
  };
}

function declineInvitation(formData) {
  const { account } = formData;

  return async (dispatch, getState) => {
    const requestBody = JSON.stringify({
      account: account,
    });

    // Api request
    let result = await apiRequest(dispatch, '/friend/invitation/decline', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '拒絕好友邀請成功'));
      // Call actions to refresh data
      dispatch(getInvitations());
      return true;
    }

    return false;
  };
}

function deleteFriend(formData) {
  const { account } = formData;

  return async (dispatch, getState) => {
    const requestBody = JSON.stringify({
      account: account,
    });

    // Api request
    let result = await apiRequest(dispatch, '/friend/delete', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '刪除好友成功'));
      // Call actions to refresh data
      dispatch(getFriends());
      return true;
    }

    return false;
  };
}

export {
  replaceFriend,
  clearFriend,
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
  getDetail,

  createRequest,
  cancelRequest,

  acceptInvitation,
  declineInvitation,

  deleteFriend,
};
