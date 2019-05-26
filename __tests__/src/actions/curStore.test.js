import * as actions from '../../../src/actions/curStore';
import actionType from '../../../src/constants/actionTypes';

describe('curStore actions', () => {
  it('test replaceCurStore', () => {
    // Setup
    const data = {
      storeId: 1,
      ads: [
        { image: 'test', title: 'test' },
      ],
      coupons: [
        { id: 'test', thumbnail: 'test', title: 'test', subtitle: 'test' },
      ],
    };

    const expected = {
      data: data,
      type: actionType.REPLACE_CURSTORE,
    };

    // Execution
    const result = actions.replaceCurStore(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test clearCurStore', () => {
    const expected = {
      type: actionType.CLEAR_CURSTORE,
    };

    // Execution
    const result = actions.clearCurStore();
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test replaceAds', () => {
    // Setup
    const data = {
      ads: [
        { image: 'test', title: 'test' },
      ],
    };

    const expected = {
      data: data,
      type: actionType.REPLACE_CURSTORE_ADS,
    };

    // Execution
    const result = actions.replaceAds(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test clearAds', () => {
    const expected = {
      type: actionType.CLEAR_CURSTORE_ADS,
    };

    // Execution
    const result = actions.clearAds();
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test replaceCoupons', () => {
    // Setup
    const data = {
      coupons: [
        { id: 'test', thumbnail: 'test', title: 'test', subtitle: 'test' },
      ],
    };

    const expected = {
      data: data,
      type: actionType.REPLACE_CURSTORE_COUPONS,
    };

    // Execution
    const result = actions.replaceCoupons(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test clearCoupons', () => {
    const expected = {
      type: actionType.CLEAR_CURSTORE_COUPONS,
    };

    // Execution
    const result = actions.clearCoupons();
    // Expectation
    expect(result).toEqual(expected);
  });
});
