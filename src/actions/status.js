import actionType from '../constants/actionTypes';

function replaceStatus(type, message) {
  return { type: actionType.REPLACE_STATUS, data: { [type]: message } };
}

function statusMessage(type, val) {
  return (dispatch) => {
    // Validate types
    const allowed = ['error', 'success', 'info', 'loading'];
    if (!allowed.includes(type)) {
      return null;
    }

    let message = val;

    // Default values
    if (!val) {
      if (type === 'success') message = 'Success';
      if (type === 'error') message = 'Sorry, an error occurred';
      if (type === 'info') message = 'Something is happening...';
      if (type === 'loading' && val !== false) message = true;
    }

    return dispatch(replaceStatus(type, message));
  };
}

export { replaceStatus, statusMessage };
