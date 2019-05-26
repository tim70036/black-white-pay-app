import * as actions from '../../../src/actions/notifications';
import actionType from '../../../src/constants/actionTypes';

describe('notifications actions', () => {
  it('test replaceNotifications', () => {
    // Setup
    const data = [
      { time: 'test', thumbnail: 'test', content: 'test', hasRead: false },
    ];

    const expected = {
      data: data,
      type: actionType.REPLACE_NOTIFICATIONS,
    };

    // Execution
    const result = actions.replaceNotifications(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test clearNotifications', () => {
    const expected = {
      type: actionType.CLEAR_NOTIFICATIONS,
    };

    // Execution
    const result = actions.clearNotifications();
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test appendNotifications', () => {
    // Setup
    const data = [
      { time: 'test', thumbnail: 'test', content: 'test', hasRead: false },
    ];

    const expected = {
      data: data,
      type: actionType.APPEND_NOTIFICATIONS,
    };

    // Execution
    const result = actions.appendNotifications(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test hasReadNotifications', () => {
    const expected = {
      type: actionType.HASREAD_NOTIFICATIONS,
    };

    // Execution
    const result = actions.hasReadNotifications();
    // Expectation
    expect(result).toEqual(expected);
  });
});
