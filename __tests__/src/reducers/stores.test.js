import storesReducer from '../../../src/reducers/stores';
import actionType from '../../../src/constants/actionTypes';

describe('stores reducer', () => {

  const initState = [];

  it('should return the initial state', () => {
    // Setup
    const expected = initState;
    // Execution
    const result = storesReducer(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_STORES', () => {
    // Setup
    const expected = [
      {
        storeId: 1,
        name: 'test',
        thumbnail: 'test',
      },
    ];

    const action = {
      data: expected,
      type: actionType.REPLACE_STORES,
    };

    // Execution
    const result = storesReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with CLEAR_STORES', () => {
    // Setup
    const expected = initState;

    const action = {
      type: actionType.CLEAR_STORES,
    };

    // Execution
    const result = storesReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });
})