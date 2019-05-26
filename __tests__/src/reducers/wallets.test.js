import walletsReducer from '../../../src/reducers/wallets';
import actionType from '../../../src/constants/actionTypes';

describe('wallets reducer', () => {

  const initState = [];

  it('should return the initial state', () => {
    // Setup
    const expected = initState;
    // Execution
    const result = walletsReducer(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_WALLETS', () => {
    // Setup
    const expected = [
      {
        storeId: 1,
        currencyName: 'test',
        availBalance: 100,
      },
    ];

    const action = {
      data: expected,
      type: actionType.REPLACE_WALLETS,
    };

    // Execution
    const result = walletsReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with CLEAR_WALLETS', () => {
    // Setup
    const expected = initState;

    const action = {
      type: actionType.CLEAR_WALLETS,
    };

    // Execution
    const result = walletsReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });
})