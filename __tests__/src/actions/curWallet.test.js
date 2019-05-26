import * as actions from '../../../src/actions/curWallet';
import actionType from '../../../src/constants/actionTypes';

describe('curWallet actions', () => {
  it('test replaceCurWallet', () => {
    // Setup
    const data = {
      storeId: 1,
      currencyName: 'test',
      availBalance: 100,
      transHistory: [
        { time: 'test', amount: 'test', relatedName: 'test', comment: 'test' },
      ],
    };

    const expected = {
      data: data,
      type: actionType.REPLACE_CURWALLET,
    };

    // Execution
    const result = actions.replaceCurWallet(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test clearCurWallet', () => {
    const expected = {
      type: actionType.CLEAR_CURWALLET,
    };

    // Execution
    const result = actions.clearCurWallet();
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test replaceAvailBalance', () => {
    // Setup
    const data = {
      availBalance: 100,
    };

    const expected = {
      data: data,
      type: actionType.REPLACE_CURWALLET_AVAIL,
    };

    // Execution
    const result = actions.replaceAvailBalance(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test clearAvailBalance', () => {
    const expected = {
      type: actionType.CLEAR_CURWALLET_AVAIL,
    };

    // Execution
    const result = actions.clearAvailBalance();
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test replaceTransHistory', () => {
    // Setup
    const data = {
      transHistory: [
        { time: 'test', amount: 'test', relatedName: 'test', comment: 'test' },
      ],
    };

    const expected = {
      data: data,
      type: actionType.REPLACE_CURWALLET_HISTORY,
    };

    // Execution
    const result = actions.replaceTransHistory(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test clearTransHistory', () => {
    const expected = {
      type: actionType.CLEAR_CURWALLET_HISTORY,
    };

    // Execution
    const result = actions.clearTransHistory();
    // Expectation
    expect(result).toEqual(expected);
  });
});
