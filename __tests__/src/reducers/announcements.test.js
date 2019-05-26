import announcementsReducer from '../../../src/reducers/announcements';
import actionType from '../../../src/constants/actionTypes';

describe('announcements reducer', () => {

  const initState = [];

  it('should return the initial state', () => {
    // Setup
    const expected = initState;
    // Execution
    const result = announcementsReducer(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_ANNOUNCEMENTS', () => {
    // Setup
    const expected = [
      { image: 'test', title: 'test' },
    ];

    const action = {
      data: expected,
      type: actionType.REPLACE_ANNOUNCEMENTS,
    };

    // Execution
    const result = announcementsReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with CLEAR_ANNOUNCEMENTS', () => {
    // Setup
    const expected = initState;

    const action = {
      type: actionType.CLEAR_ANNOUNCEMENTS,
    };

    // Execution
    const result = announcementsReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });
})