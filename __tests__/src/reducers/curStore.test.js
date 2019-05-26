import curStoreReducer from '../../../src/reducers/curStore';
import actionType from '../../../src/constants/actionTypes';

describe('curStore reducer', () => {

  const initState = {
    storeId: -1,
    ads: [],
    coupons: [],
  };

  it('should return the initial state', () => {
    // Setup
    const expected = initState;
    // Execution
    const result = curStoreReducer(undefined, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_CURSTORE', () => {
    // Setup
    const expected = {
      storeId: 1,
      ads: [
        { image: 'test', title: 'test' },
      ],
      coupons: [
        { id: 'test', thumbnail: 'test', title: 'test', subtitle: 'test' },
      ],
    };

    const action = {
      data: expected,
      type: actionType.REPLACE_CURSTORE,
    };

    // Execution
    const result = curStoreReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with CLEAR_CURSTORE', () => {
    // Setup
    const expected = initState;

    const action = {
      type: actionType.CLEAR_CURSTORE,
    };

    // Execution
    const result = curStoreReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_CURSTORE_ADS', () => {
    // Setup
    const expected = {
      ...initState,
      ads: [
        { image: 'test', title: 'test' },
      ],
    };
    const action = {
      data: [
        { image: 'test', title: 'test' },
      ],
      type: actionType.REPLACE_CURSTORE_ADS,
    };

    // Execution
    const result = curStoreReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with CLEAR_CURSTORE_ADS', () => {
    // Setup
    const expected = {
      ...initState,
      ads: [],
    };

    const action = {
      type: actionType.CLEAR_CURSTORE_ADS,
    };

    // Execution
    const result = curStoreReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with REPLACE_CURSTORE_COUPONS', () => {
    // Setup
    const expected = {
      ...initState,
      coupons: [
        { id: 'test', thumbnail: 'test', title: 'test', subtitle: 'test' },
      ],
    };

    const action = {
      data: [
        { id: 'test', thumbnail: 'test', title: 'test', subtitle: 'test' },
      ],
      type: actionType.REPLACE_CURSTORE_COUPONS,
    };

    // Execution
    const result = curStoreReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with CLEAR_CURSTORE_COUPONS', () => {
    // Setup
    const expected = {
      ...initState,
      coupons: [],
    };

    const action = {
      type: actionType.CLEAR_CURSTORE_COUPONS,
    };

    // Execution
    const result = curStoreReducer(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });
})