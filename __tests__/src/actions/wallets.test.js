import * as actions from '../../../src/actions/wallets';
import actionType from '../../../src/constants/actionTypes';

describe('wallets actions', () => {
  it('test replaceWallets', () => {
    // Setup
    const data = [
      {
        storeId: 1,
        currencyName: '',
        availBalance: 0,
      },
      {
        storeId: 2,
        currencyName: '',
        availBalance: 0,
      },
      {
        storeId: 3,
        currencyName: '',
        availBalance: 0,
      },
    ];

    const expected = {
      data: data,
      type: actionType.REPLACE_WALLETS,
    };

    // Execution
    const result = actions.replaceWallets(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test clearWallets', () => {
    const expected = {
      type: actionType.CLEAR_WALLETS,
    };

    // Execution
    const result = actions.clearWallets();
    // Expectation
    expect(result).toEqual(expected);
  });
});
