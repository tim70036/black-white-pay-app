import config from '../constants/config';
import { statusMessage } from '../actions/status';
import { replaceUserAuth } from '../actions/user';


// dispatch: redux dispatch
// body: JSON string
// method: 'POST' or 'GET'
// Return result = { success: boolean, data: ??? }
async function apiRequest(dispatch, apiPath, method, body = '', contentType = '') {
  // Status
  dispatch(statusMessage('loading', true));

  let fetchPayload = (method === 'POST') ? {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': contentType ? contentType : 'application/json',
    },
    body: body,
  } : {
    method: 'GET',
    credentials: 'include',
  };


  let result = {
    success: false,
    data: null,
  };

  let response;
  try {
    response = await fetch( `${config.apiUrl}${apiPath}`, fetchPayload);
    response = await response.json();
    if (!response) throw Error('沒有回應');
  } catch (error) {
    // Status
    dispatch(statusMessage('error', '網路發生問題，請重試'));
    return result;
  }

  // Process response
  if (response.errCode === 0) {
    result.success = true;
    if (response.data) result.data = response.data;

    // Status
    dispatch(statusMessage('loading', false));
  } else if (response.errCode === 1) {
    // Status
    dispatch(statusMessage('error', response.msg));
  } else if (response.errCode === 87) {
    dispatch(replaceUserAuth(false));
    dispatch(statusMessage('error', response.msg));
  } else {
    dispatch(statusMessage('error', '網路發生問題，請重試'));
  }

  return result;
}

export { apiRequest };