import actionType from '../constants/actionTypes';

function replaceUser(newUserData) {
  return { type: actionType.REPLACE_USER, data: newUserData };
}

function clearUser() {
  return { type: actionType.CLEAR_USER };
}

export { replaceUser, clearUser };
