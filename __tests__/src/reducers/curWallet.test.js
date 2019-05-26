import curWalletReducer from '../../../src/reducers/curWallet';
import actionType from '../../../src/constants/actionTypes';

describe('curWallet reducer', () => {

  const initState = {
    storeId: -1,
    currencyName: '',
    availBalance: 0,
    transHistory: [],
  };

  it('should return the initial state', () => {
    // Setup
    const expected = initState;
    // Execution
    const result = curWalletReducer(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_CURWALLET', () => {
    // Setup
    const expected = {
      storeId: 1,
      currencyName: 'test',
      availBalance: 100,
      transHistory: [],
    };

    const action = {
      data: expected,
      type: actionType.REPLACE_CURWALLET,
    };

    // Execution
    const result = curWalletReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with CLEAR_CURWALLET', () => {
    // Setup
    const expected = initState;

    const action = {
      type: actionType.CLEAR_CURWALLET,
    };

    // Execution
    const result = curWalletReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_CURWALLET_AVAIL', () => {
    // Setup
    const expected = {
      ...initState,
      availBalance: 100,
    };
    const action = {
      data: 100,
      type: actionType.REPLACE_CURWALLET_AVAIL,
    };

    // Execution
    const result = curWalletReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with CLEAR_CURWALLET_AVAIL', () => {
    // Setup
    const expected = {
      ...initState,
      availBalance: 0,
    };

    const action = {
      type: actionType.CLEAR_CURWALLET_AVAIL,
    };

    // Execution
    const result = curWalletReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_CURWALLET_HISTORY', () => {
    // Setup
    const expected = {
      ...initState,
      transHistory: [
        { time: 'test1', amount: 'test1', relatedName: 'test1', comment: 'test1' },
      ],
    };

    const action = {
      data: [
        { time: 'test1', amount: 'test1', relatedName: 'test1', comment: 'test1' },
      ],
      type: actionType.REPLACE_CURWALLET_HISTORY,
    };

    // Execution
    const result = curWalletReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with CLEAR_CURWALLET_HISTORY', () => {
    // Setup
    const expected = {
      ...initState,
      transHistory: [],
    };

    const action = {
      type: actionType.CLEAR_CURWALLET_HISTORY,
    };

    // Execution
    const result = curWalletReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });
})