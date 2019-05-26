import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Home } from '../../../src/containers/Home';
import Test from '../../../src/native/components/Home/index';
import { logout } from '../../../src/actions/user';
import { getAnnouncements } from '../../../src/actions/announcements';
import '../../../src/constants/test-config';

const mockStore = configureMockStore();

class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

describe('home container', () => {

  let wrapper, store;
  beforeEach(() => {
    const initialState = {
    };
    store = mockStore(initialState);

    wrapper = shallow(
      <Home Layout={Test} store={store} />,
    );
  });

  it('should show previously rolled value', () => {
    // test that the state values were correctly passed as props
    console.log(wrapper);
    expect(wrapper.props().lastRolledNumber).toBe(1);

  });

  // describe('mapStateToProps', () => {
  //   it('should return an object with the announcement array', () => {
  //     // Setup
  //     const mockState = {
  //       announcements: [{ image: 'test', title: 'test' }],
  //       filter: 'SHOW_ALL',
  //     };
  //     const expected = {
  //       announcementList: [{ image: 'test', title: 'test' }],
  //     };

  //     // Execution
  //     const mappedProps = mapStateToProps(mockState);

  //     // Expectation
  //     expect(mappedProps).toEqual(expected);
  //   });
  // });

  // describe('mapDispatchToProps', () => {
  //   it('calls dispatch with an logout action when userLogout is called', async () => {
  //     // Setup
  //     const mockDispatch = jest.fn();
  //     const test = jest.fn();
  //     const actionToDispatch = await logout();

  //     // Execution
  //     // mappedProps = false
  //     const mappedProps = mapDispatchToProps.userLogout()(mockDispatch, test);

  //     // Expectaion
  //     expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  //   })
  // });
});