import actionType from '../constants/actionTypes';
import { clearAnnouncements } from './announcements';
import { clearCurStore } from './curStore';
import { clearCurWallet } from './curWallet';
import { clearFriend } from './friend';
import { clearGameWallets } from './gameWallets';
import { clearNotifications } from './notifications';
import { clearQrCodeReceive } from './qrCodeReceive';
import { clearStores } from './stores';
import { clearWallets } from './wallets';
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

function replaceUserThumbnail(newThumbnail) {
  return { type: actionType.REPLACE_USER_THUMBNAIL, data: newThumbnail};
}

function replaceUserAuth(isAuthenticated) {
  return { type: actionType.REPLACE_USER_AUTH, data: isAuthenticated };
}

function registerPushPhone() {
  return async (dispatch, getState) => {
    // Get data from store
    const registerData = getState().user;
    const requestBody = JSON.stringify({
      phoneNumber: registerData.account,
    });

    // Api request
    let result = await apiRequest(dispatch, '/auth/register/push-phone', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '請查看簡訊'));
      return true;
    }

    return false;
  };
}

function forgetPushPhone() {
  return async (dispatch, getState) => {
    // Get data from store
    const forgetData = getState().user;
    const requestBody = JSON.stringify({
      phoneNumber: forgetData.account,
    });

    // Api request
    let result = await apiRequest(dispatch, '/auth/forget/push-phone', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '請查看簡訊'));
      return true;
    }

    return false;
  };
}

function registerVerifyPhone(verifyCode) {
  return async (dispatch, getState) => {
    // Get data from store
    const registerData = getState().user;
    const requestBody = JSON.stringify({
      phoneNumber: registerData.account,
      verifyCode: verifyCode,
    });

    // Api request
    let result = await apiRequest(dispatch, '/auth/register/verify-phone', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '電話驗證成功'));
      return true;
    }

    return false;
  };
}

function forgetVerifyPhone(verifyCode) {
  return async (dispatch, getState) => {
    // Get data from store
    const forgetData = getState().user;
    const requestBody = JSON.stringify({
      phoneNumber: forgetData.account,
      verifyCode: verifyCode,
    });

    // Api request
    let result = await apiRequest(dispatch, '/auth/forget/verify-phone', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '電話驗證成功'));
      return true;
    }

    return false;
  };
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
    let result = await apiRequest(dispatch, '/auth/register/register', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '註冊成功'));
      return true;
    }

    return false;
  };
}


function forget() {
  return async (dispatch, getState) => {
    // Get data from store
    const forgetData = getState().user;
    const requestBody = JSON.stringify({
      account: forgetData.account,
      password: forgetData.password,
      transPwd: forgetData.transPwd,
    });

    // Api request
    let result = await apiRequest(dispatch, '/auth/forget/forget', 'POST', requestBody);

    // Process result
    if (result && result.success) {
      // Status
      dispatch(statusMessage('success', '密碼重新設定成功'));
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
      // get session id from cookie
      const session = result.setCookie.find(e => (e.name === 'connect.sid'));
      const userData = {
        account: account,
        password: password,
        transPwd: '',
        name: result.data.name,
        thumbnail: result.data.thumbnail,
        authenticated: true,
        sessionId: session.value,
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
      // Reset all data
      dispatch(replaceUserAuth(false));
      dispatch(clearAnnouncements());
      dispatch(clearCurStore());
      dispatch(clearCurWallet());
      dispatch(clearFriend());
      dispatch(clearGameWallets());
      dispatch(clearNotifications());
      dispatch(clearQrCodeReceive());
      dispatch(clearStores());
      dispatch(clearWallets());

      // Status
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

function changeThumbnail(formData) {
  const { thumbnailFormdata } = formData;

  return async (dispatch, getState) => {
    // Api request
    let result = await apiRequest(dispatch, '/user/update/thumbnail', 'POST', thumbnailFormdata, 'multipart/form-data');

    // Process result
    if (result && result.success) {
      // Status
      dispatch(replaceUserThumbnail(result.data.url));
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
  replaceUserThumbnail,
  replaceUserAuth,

  changeName,
  changePwd,
  changeTransPwd,
  changeThumbnail,

  register,
  registerPushPhone,
  registerVerifyPhone,

  forget,
  forgetPushPhone,
  forgetVerifyPhone,

  login,
  logout,
};
