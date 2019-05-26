import * as actions from '../../../src/actions/stores';
import actionType from '../../../src/constants/actionTypes';

describe('store actions', () => {
  it('test replaceStores', () => {
    // Setup
    const data = [
      {
        storeId: 1,
        name: '',
        thumbnail: '',
      },
      {
        storeId: 2,
        name: '',
        thumbnail: '',
      },
      {
        storeId: 3,
        name: '',
        thumbnail: '',
      },
    ];

    const expected = {
      data: data,
      type: actionType.REPLACE_STORES,
    };

    // Execution
    const result = actions.replaceStores(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test clearStores', () => {
    const expected = {
      type: actionType.CLEAR_STORES,
    };

    // Execution
    const result = actions.clearStores();
    // Expectation
    expect(result).toEqual(expected);
  });
});
