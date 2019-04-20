import actionType from '../constants/actionTypes';
import { statusMessage } from './status';
import { apiRequest } from '../lib/util';

function replaceUser(newUserData) {
  return { type: actionType.REPLACE_USER, data: newUserData };
}

function clearUser() {
  return { type: actionType.CLEAR_USER };
}

function replaceUserAccount(newAccount) {
  return { type: actionType.REPLACE_USER_ACCOUNT, data: newAccount };
}

function replaceUserPassword(newPassword) {
  return { type: actionType.REPLACE_USER_PASSWORD, data: newPassword };
}

function replaceUserTransPwd(newTransPwd) {
  return { type: actionType.REPLACE_USER_TRANSPWD, data: newTransPwd };
}

function replaceUserName(newName) {
  return { type: actionType.REPLACE_USER_NAME, data: newName };
}

function replaceUserAuth(isAuthenticated) {
  return { type: actionType.REPLACE_USER_AUTH, data: isAuthenticated };
}

function register() {
  return async (dispatch, getState) => {
    // Get data from store
    const registerData = getState().user;
    const requestBody = JSON.stringify({
      account: registerData.account,
      password: registerData.password,
      transPwd: registerData.transPwd,
      name: registerData.name,
    });

    // Api request
    let result = await apiRequest(dispatch, '/auth/register', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '註冊成功'));
      return true;
    }

    return false;
  };
}

function login(formData) {
  const { account, password } = formData;
  const requestBody = JSON.stringify({
    account: account,
    password: password,
  });

  return async (dispatch) => {

    // Clear user data in state
    dispatch(clearUser());

    // Api request
    let result = await apiRequest(dispatch, '/auth/login', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      const userData = {
        account: account,
        password: password,
        transPwd: '',
        name: result.data.name,
        thumbnail: '',
        authenticated: true,
      };
      dispatch(replaceUser(userData));

      // Status
      dispatch(statusMessage('success', '登入成功'));
      return true;
    }

    return false;
  };
}

function logout() {
  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/auth/logout', 'GET');

    // Process result
    if (result && result.success) {
      // Logout user in state
      dispatch(replaceUserAuth(false));
      dispatch(statusMessage('success', '登出成功'));
      return true;
    }

    return false;
  };
}

function changeName(formData) {
  const { name } = formData;
  const requestBody = JSON.stringify({
    name: name,
  });

  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/user/update/name', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '更改成功'));
      return true;
    }

    return false;
  };
}

function changePwd(formData) {
  const { oldPassword, newPassword } = formData;
  const requestBody = JSON.stringify({
    oldPwd: oldPassword,
    newPwd: newPassword,
  });

  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/user/update/pwd', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '更改成功'));
      return true;
    }

    return false;
  };
}

function changeTransPwd(formData) {
  const { oldTransPassword, newTransPassword } = formData;
  const requestBody = JSON.stringify({
    oldPwd: oldTransPassword,
    newPwd: newTransPassword,
  });

  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/user/update/transpwd', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '更改成功'));
      return true;
    }

    return false;
  };
}

export {
  replaceUser,
  clearUser,
  replaceUserAccount,
  replaceUserPassword,
  replaceUserTransPwd,
  replaceUserName,
  replaceUserAuth,

  changeName,
  changePwd,
  changeTransPwd,

  register,
  login,
  logout,
};
