import * as actions from '../../../src/actions/announcements';
import actionType from '../../../src/constants/actionTypes';

describe('announcements actions', () => {
  it('test replaceAnnouncements', () => {
    // Setup
    const data = [
      { image: 'test', title: 'test' },
    ];

    const expected = {
      data: data,
      type: actionType.REPLACE_ANNOUNCEMENTS,
    };

    // Execution
    const result = actions.replaceAnnouncements(data);
    // Expectation
    expect(result).toEqual(expected);
  });

  it('test clearAnnouncements', () => {
    const expected = {
      type: actionType.CLEAR_ANNOUNCEMENTS,
    };

    // Execution
    const result = actions.clearAnnouncements();
    // Expectation
    expect(result).toEqual(expected);
  });
});
