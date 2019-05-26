import notificationsReducer from '../../../src/reducers/notifications';
import actionType from '../../../src/constants/actionTypes';

describe('notifications reducer', () => {
  it('should return the initial state', () => {
    
    // Setup
    const expected = [];
    // Execution
    const result = notificationsReducer(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_NOTIFICATIONS', () => {
    // Setup
    const expected = [
      { time: 'test', thumbnail: 'test', content: 'test', hasRead: false },
    ];

    const action = {
      data: [
        { time: 'test', thumbnail: 'test', content: 'test', hasRead: false },
      ],
      type: actionType.REPLACE_NOTIFICATIONS,
    };

    // Execution
    const result = notificationsReducer(undefined, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with CLEAR_NOTIFICATIONS', () => {
    // Setup
    const initState = [
      { time: 'test1', thumbnail: 'test1', content: 'test1', hasRead: false },
    ];
    const expected = [];

    const action = {
      type: actionType.CLEAR_NOTIFICATIONS,
    };

    // Execution
    const result = notificationsReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with APPEND_NOTIFICATIONS', () => {
    // Setup
    const initState = [
      { time: 'test1', thumbnail: 'test1', content: 'test1', hasRead: false },
    ];
    const expected = [
      { time: 'test1', thumbnail: 'test1', content: 'test1', hasRead: false },
      { time: 'test2', thumbnail: 'test2', content: 'test2', hasRead: false },
    ];

    const action = {
      data: [
        { time: 'test2', thumbnail: 'test2', content: 'test2', hasRead: false },
      ],
      type: actionType.APPEND_NOTIFICATIONS,
    };

    // Execution
    const result = notificationsReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with HASREAD_NOTIFICATIONS', () => {
    // Setup
    const initState = [
      { time: 'test1', thumbnail: 'test1', content: 'test1', hasRead: false },
    ];
    const expected = [
      { time: 'test1', thumbnail: 'test1', content: 'test1', hasRead: true },
    ];

    const action = {
      type: actionType.HASREAD_NOTIFICATIONS,
    };

    // Execution
    const result = notificationsReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });
})