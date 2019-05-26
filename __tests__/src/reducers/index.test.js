import reducer from '../../../src/reducers/index';

describe('index reducer', () => {
  const initState = false;
  it('should return the initial state', () => {
    // Setup
    const expected = initState;
    // Execution
    const result = reducer.rehydrated(initState, {});

    // Expectation
    expect(result).toEqual(expected);
  });

  it('should return the state with persist/REHYDRATE', () => {
    // Setup
    const expected = true;

    const action = {
      type: 'persist/REHYDRATE',
    };

    // Execution
    const result = reducer.rehydrated(initState, action);

    // Expectation
    expect(result).toEqual(expected);
  });
})