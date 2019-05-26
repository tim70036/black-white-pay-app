import statusReducer from '../../../src/reducers/status';
import actionType from '../../../src/constants/actionTypes';

describe('status reducer', () => {
  it('should return the initial state', () => {
    // Setup
    const expected = {
      loading: false,
      success: null,
      error: null,
      info: null,
    };

    // Execution
    const result = statusReducer(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_STATUS', () => {
    // Setup
    const expected = {
      loading: false,
      success: 'test',
      error: null,
      info: null,
    };

    const action = {
      data: {
        success: 'test',
      },
      type: actionType.REPLACE_STATUS,
    };

    // Execution
    const result = statusReducer(undefined, action);

    // Expectation
    expect(result).toEqual(expected);
  });
})