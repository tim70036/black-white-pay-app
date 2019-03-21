import actionType from '../constants/actionTypes';
import config from '../constants/config';
import { statusMessage } from './status';

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

function register() {
  return async (dispatch, getState) => {
    // Status
    dispatch(statusMessage('loading', true));

    // Get data from store
    const registerData = getState().user;

    // login using form data
    let response;
    try {
      response = await fetch( `${config.apiUrl}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: registerData.account,
          password: registerData.password,
          transPwd: registerData.transPwd,
          name: registerData.name,
        }),
      });
      response = await response.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // Process response
    if (response.errCode === 0) {

    }

    // Status
    dispatch(statusMessage('loading', false));
  };
}

function login(loginData) {
  const { account, password } = loginData;

  return async (dispatch) => {
    // Status
    dispatch(statusMessage('loading', true));

    // Clear user data in state
    dispatch(clearUser());

    // login using form data
    let response;
    try {
      response = await fetch( `${config.apiUrl}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: account,
          password: password,
        }),
      });
      response = await response.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // Process response
    if (response.errCode === 0) {
      const userData = {
        account: account,
        password: password,
        transPwd: '',
        name: response.name,
        thumbnail: '',
        authenticated: true,
      }
      dispatch(replaceUser(userData));
    } else if (response.errCode === 1) {

    } else {

    }

    // Status
    dispatch(statusMessage('loading', false));
  };
}

function reLogin() {
  return async (dispatch, getState) => {
    // login using state data

    let response = await fetch( `${config.apiUrl}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: 'h1',
        password: '1',
      }),
    });
    let body = await response.json();
    console.log( body );
  };
}

export {
  replaceUser,
  clearUser,
  replaceUserAccount,
  replaceUserPassword,
  replaceUserTransPwd,
  replaceUserName,

  register,
  login,
  reLogin,
};
