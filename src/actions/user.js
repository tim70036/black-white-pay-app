import actionType from '../constants/actionTypes';
import config from '../constants/config';
import { statusMessage } from './status';

function replaceUser(newUserData) {
  return { type: actionType.REPLACE_USER, data: newUserData };
}

function clearUser() {
  return { type: actionType.CLEAR_USER };
}

function register(registerData) {
  return async (dispatch) => {

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
    try {
      let response = await fetch( `${config.apiUrl}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: account,
          password: password,
        }),
      });
      response = await response.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // Update user data into state

    // Status
    dispatch(statusMessage('loading', false));
  };
}

function reLogin() {
  return async (dispatch, getState) => {
    // login using state data

    let response = await fetch( `${config.apiUrl}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'h1',
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
  login,
  reLogin,
};
