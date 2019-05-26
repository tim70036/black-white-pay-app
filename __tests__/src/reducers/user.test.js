import userReducer from '../../../src/reducers/user';
import actionType from '../../../src/constants/actionTypes';

describe('user reducer', () => {

  const initState = {
    account: '',
    password: '',
    transPwd: '',
    name: '',
    thumbnail: '',
    authenticated: false,
  };

  it('should return the initial state', () => {
    // Setup
    const expected = initState;
    // Execution
    const result = userReducer(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_USER', () => {
    // Setup
    const expected = {
      account: 'test',
      password: 'test',
      transPwd: 'test',
      name: 'test',
      thumbnail: 'test',
      authenticated: false,
    };

    const action = {
      data: expected,
      type: actionType.REPLACE_USER,
    };

    // Execution
    const result = userReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with CLEAR_USER', () => {
    // Setup
    const expected = initState;

    const action = {
      type: actionType.CLEAR_USER,
    };

    // Execution
    const result = userReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_USER_ACCOUNT', () => {
    // Setup
    const expected = {
      account: 'test',
      password: '',
      transPwd: '',
      name: '',
      thumbnail: '',
      authenticated: false,
    };

    const action = {
      data: 'test',
      type: actionType.REPLACE_USER_ACCOUNT,
    };

    // Execution
    const result = userReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_USER_PASSWORD', () => {
    // Setup
    const expected = {
      account: '',
      password: 'test',
      transPwd: '',
      name: '',
      thumbnail: '',
      authenticated: false,
    };

    const action = {
      data: 'test',
      type: actionType.REPLACE_USER_PASSWORD,
    };

    // Execution
    const result = userReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_USER_TRANSPWD', () => {
    // Setup
    const expected = {
      account: '',
      password: '',
      transPwd: 'test',
      name: '',
      thumbnail: '',
      authenticated: false,
    };

    const action = {
      data: 'test',
      type: actionType.REPLACE_USER_TRANSPWD,
    };

    // Execution
    const result = userReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_USER_NAME', () => {
    // Setup
    const expected = {
      account: '',
      password: '',
      transPwd: '',
      name: 'test',
      thumbnail: '',
      authenticated: false,
    };

    const action = {
      data: 'test',
      type: actionType.REPLACE_USER_NAME,
    };

    // Execution
    const result = userReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_USER_THUMBNAIL', () => {
    // Setup
    const expected = {
      account: '',
      password: '',
      transPwd: '',
      name: '',
      thumbnail: 'test',
      authenticated: false,
    };

    const action = {
      data: 'test',
      type: actionType.REPLACE_USER_THUMBNAIL,
    };

    // Execution
    const result = userReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_USER_AUTH', () => {
    // Setup
    const expected = {
      account: '',
      password: '',
      transPwd: '',
      name: '',
      thumbnail: '',
      authenticated: true,
    };

    const action = {
      data: true,
      type: actionType.REPLACE_USER_AUTH,
    };

    // Execution
    const result = userReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });
})