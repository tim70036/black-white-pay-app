import * as actions from '../../../src/actions/status';
import actionType from '../../../src/constants/actionTypes';

describe('status actions', () => {

  it('test replaceStatus', () => {
    // Setup
    const type = 'success';
    const message = 'test';

    const expected = {
      data: {
        success: 'test',
      },
      type: actionType.REPLACE_STATUS,
    };

    // Execution
    const result = actions.replaceStatus(type, message);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test statusMessage', () => {

    const data = {
      success: 'Success',
      error: 'Sorry, an error occurred',
      info: 'Something is happening...',
      loading: true,
    };

    Object.keys(data).forEach((key) => {
      const dispatch = jest.fn();
      const expected = {
        data: {
          [key]: data[key],
        },
        type: actionType.REPLACE_STATUS,
      };
      // Execution
      const result = actions.statusMessage(key, null)(dispatch);
      // Expectation
      expect(dispatch).toBeCalledWith(expected);
    });
  });
})