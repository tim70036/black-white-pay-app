import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TouchableHighlight } from 'react-native';
import {
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';

import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: Colors.backgroundBlack,
    paddingHorizontal: viewportWidthPercent(4),
    paddingVertical: viewportHeightPercent(3),
  },

  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: viewportWidthPercent(4),
    marginVertical: viewportHeightPercent(2),
  },

  formStyle: {
    flexDirection: 'column',
    flex: 1,
  },
  formTop: {
    justifyContent: 'center',
  },
  formBottom: {
  },
  formInputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: viewportHeightPercent(5),
  },

  labelText: {
    fontSize: 18,
    color: Colors.labelGold,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 35,
  },
  textInputStyle: {
    height: '100%',
    color: 'white',
  },
  iconStyle: {
    color: Colors.labelGold,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
  },
  buttonStyle: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 45,
    borderWidth: 1,
    borderColor: Colors.labelGold,
    borderRadius: 50,
  },

  text: {
    color: Colors.labelGold,
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  valText: {
    color: 'red',
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 3,
  },
});

class ChangePwd extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',

      oldPasswordValidate: false,
      newPasswordValidate: false,
      confirmPwdValidate: false,
      oldPasswordMsg: '',
      newPasswordMsg: '',
      confirmPwdMsg: '',
      buttonIsPressed: '',
    };
  }

  validate = (text, type) => {
    const passwordVal = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    const { newPassword, oldPassword } = this.state;
    if (type === 'oldPassword') {
      this.setState({ oldPasswordValidate: true, oldPasswordMsg: '' });
      this._handleChange('oldPassword', text);
    } else if (type === 'newPassword') {
      if (passwordVal.test(text)) {
        this.setState({ newPasswordValidate: true, newPasswordMsg: '' });
        this._handleChange('newPassword', text);
      } else if (text === oldPassword) {
        this.setState({ newPasswordValidate: false, newPasswordMsg: '新密碼不可與舊密碼重複' });
      } else {
        this.setState({ newPasswordValidate: false, newPasswordMsg: '密碼至少為八碼，需包含字元和數字' });
      }
    } else if (type === 'confirmPassword') {
      if (newPassword === text) {
        this._handleChange('confirmPassword', text);
        this.setState({ confirmPwdValidate: true, confirmPwdMsg: '' });
      } else {
        this.setState({ confirmPwdValidate: false, confirmPwdMsg: '密碼不符' });
      }
    }
  }

  _change = () => {
    const { buttonIsPressed } = this.state;
    this.setState({ buttonIsPressed: !buttonIsPressed });
  }

  _handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  _handleSubmit = async () => {
    const { onFormSubmit } = this.props;
    const { oldPasswordValidate, newPasswordValidate, confirmPwdValidate } = this.state;
    if (oldPasswordValidate && newPasswordValidate && confirmPwdValidate) {
      const success = await onFormSubmit(this.state);
      if (success) {
        Actions.pop();
      }
    }
  }

  render() {
    const { newPasswordMsg, confirmPwdMsg, oldPasswordMsg, buttonIsPressed } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Form style={styles.formStyle}>
            <View style={styles.formTop}>
              <Item stackedLabel style={styles.formInputContainer}>
                <Label style={styles.labelText}> 舊密碼 </Label>
                <View style={styles.textInputContainer}>
                  <Input
                    style={styles.textInputStyle}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    keyboardType="default"
                    onChangeText={v => this.validate(v, 'oldPassword')}
                    onSubmitEditing={Keyboard.dismiss}
                    secureTextEntry
                  />
                </View>
              </Item>
              <Text style={styles.valText}>{oldPasswordMsg}</Text>
              <Item stackedLabel style={styles.formInputContainer}>
                <Label style={styles.labelText}> 新密碼 </Label>
                <View style={styles.textInputContainer}>
                  <Input
                    style={styles.textInputStyle}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    keyboardType="default"
                    onChangeText={v => this.validate(v, 'newPassword')}
                    onSubmitEditing={Keyboard.dismiss}
                    secureTextEntry
                  />
                </View>
              </Item>
              <Text style={styles.valText}>{newPasswordMsg}</Text>
              <Item stackedLabel style={styles.formInputContainer}>
                <Label style={styles.labelText}> 再次確認密碼 </Label>
                <View style={styles.textInputContainer}>
                  <Input
                    required
                    style={styles.textInputStyle}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    keyboardType="default"
                    onChangeText={v => this.validate(v, 'confirmPassword')}
                    onSubmitEditing={Keyboard.dismiss}
                    secureTextEntry
                  />
                </View>
              </Item>
              <Text style={styles.valText}>{confirmPwdMsg}</Text>
            </View>
            <View style={{ height: 35 }} />
            <View padder style={styles.formBottom}>
              <TouchableHighlight
                style={{
                  ...styles.buttonStyle,
                }}
                onPress={this._handleSubmit}
                onPressIn={this._change}
                onPressOut={this._change}
                underlayColor={Colors.labelGold}
              >
                <Text
                  style={{
                    ...styles.text,
                    color: buttonIsPressed === true ? 'white' : Colors.labelGold,
                  }}
                >
                  確認
                </Text>
              </TouchableHighlight>
            </View>
          </Form>
        </View>
      </View>
    );
  }
}

export default ChangePwd;
