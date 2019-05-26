import React from 'react';
import { shallow } from 'enzyme';
import '../../../../../src/constants/test-config';

import ChangeName from '../../../../../src/native/components/Mine/ChangeName';


describe('<ChangeName />', () => {
  let wrapper;
  let textInput;
  const name = 'shawn';
  beforeEach(() => {
    wrapper = shallow(
      <ChangeName onFormSubmit={() => {}} />,
    );
    textInput = wrapper.find('TextInput');
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should show initial state value', () => {
    expect(wrapper.state('name')).toBe('');
    expect(wrapper.state('nameMsg')).toBe('');
    expect(wrapper.state('buttonIsPressed')).toBe(false);
  });

  // it('should show props ', () => {
  //   console.log(wrapper.props());
  //   expect(wrapper.props().onFormSubmit.exists());
  // });

  it('press button text without input value', () => {
    wrapper.find('TouchableHighlight').simulate('press');
    expect(wrapper.state('nameMsg')).toBe('暱稱長度最長為六，最短為一');
  });

  it('press button text with input value', () => {
    textInput.simulate('changeText', name);
    expect(wrapper.state('name')).toBe(name);
    wrapper.find('TouchableHighlight').simulate('press');
    expect(wrapper.state('nameMsg')).toBe('');
  });
});
