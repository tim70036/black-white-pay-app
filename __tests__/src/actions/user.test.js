import * as actions from '../../../src/actions/user';
import actionType from '../../../src/constants/actionTypes';

describe('user actions', () => {

  it('test replaceUser', () => {
    // Setup
    const data = {
      account: '0970779896',
      password: 'qwer1234',
      transPwd: '123456',
      name: 'shawn',
      thumbnail: '',
      authenticated: true,
    };

    const expected = {
      data: {
        account: '0970779896',
        authenticated: true,
        name: 'shawn',
        password: 'qwer1234',
        thumbnail: '',
        transPwd: '123456',
      },
      type: actionType.REPLACE_USER,
    };

    // Execution
    const result = actions.replaceUser(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test clearUser', () => {

    const expected = {
      type: actionType.CLEAR_USER,
    };

    // Execution
    const result = actions.clearUser();
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test replaceUserAccount', () => {
    const data = {
      account: 'shawn',
    };
    const expected = {
      data: {
        account: 'shawn',
      },
      type: actionType.REPLACE_USER_ACCOUNT,
    };

    // Execution
    const result = actions.replaceUserAccount(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test replaceUserPassword', () => {
    const data = {
      password: 'test',
    };
    const expected = {
      data: {
        password: 'test',
      },
      type: actionType.REPLACE_USER_PASSWORD,
    };

    // Execution
    const result = actions.replaceUserPassword(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test replaceUserTransPwd', () => {
    const data = {
      transPwd: 'test',
    };
    const expected = {
      data: {
        transPwd: 'test',
      },
      type: actionType.REPLACE_USER_TRANSPWD,
    };

    // Execution
    const result = actions.replaceUserTransPwd(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test replaceUserName', () => {
    const data = {
      name: 'test',
    };
    const expected = {
      data: {
        name: 'test',
      },
      type: actionType.REPLACE_USER_NAME,
    };

    // Execution
    const result = actions.replaceUserName(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test replaceUserThumbnail', () => {
    const data = {
      thumbnail: 'test',
    };
    const expected = {
      data: {
        thumbnail: 'test',
      },
      type: actionType.REPLACE_USER_THUMBNAIL,
    };

    // Execution
    const result = actions.replaceUserThumbnail(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test replaceUserAuth', () => {
    const data = {
      auth: true,
    };
    const expected = {
      data: {
        auth: true,
      },
      type: actionType.REPLACE_USER_AUTH,
    };

    // Execution
    const result = actions.replaceUserAuth(data);
    // Expectation
    expect(result).toEqual(expected);
  });
})