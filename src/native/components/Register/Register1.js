import React from 'react';
import {
  StyleSheet, Keyboard, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Form, Item, Label, Input, Text, View,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#1A1B1B',
  },

  topContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  formContainer: {
    flex: 7,
    justifyContent: 'center',
  },

  formStyle: {
    flexDirection: 'column',
    flex: 1,
  },

  formTop: {
    justifyContent: 'center',
    flex: 3,
  },

  formButton: {
    flex: 1,
  },

  formInputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: viewportHeightPercent(5),
  },

  logoStyle: {
    color: '#AA8049',
    fontSize: 40,
    fontWeight: 'bold',
  },

  labelText: {
    fontSize: 18,
    color: '#AA8049',
    justifyContent: 'center',
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
    color: '#AA8049',
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
    borderColor: '#AA8049',
    borderRadius: 50,
  },

  text: {
    color: '#AA8049',
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

class Register extends React.Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',

      accountValidate: false,
      passwordValidate: false,
      confirmPwdValidate: false,
      accountMsg: '',
      passwordMsg: '',
      confirmPwdMsg: '',
      buttonIsPressed: '',
    };
  }

  validate = (text, type) => {
    const phoneVal = /((?=(09))[0-9]{10})$/g;
    const passwordVal = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    const { password } = this.state;
    if (type === 'account') {
      if (phoneVal.test(text)) {
        this.setState({ accountValidate: true, accountMsg: '' });
        this._handleChange('account', text);
      } else {
        this.setState({ accountValidate: false, accountMsg: '帳號必須為電話號碼' });
      }
    } else if (type === 'password') {
      if (passwordVal.test(text)) {
        this.setState({ passwordValidate: true, passwordMsg: '' });
        this._handleChange('password', text);
      } else {
        this.setState({ passwordValidate: false, passwordMsg: '密碼至少為八碼，需包含字元和數字' });
      }
    } else if (type === 'confirmPassword') {
      if (password === text) {
        this._handleChange('confirmPassword', text);
        this.setState({ confirmPwdValidate: true, confirmPwdMsg: '' });
      } else {
        this.setState({ confirmPwdValidate: false, confirmPwdMsg: '密碼不符' });
      }
    }
  }

  _handleChange = (key, val) => {
    this.setState({
      [key]: val,
    });
  }

  _handleSubmit = () => {
    const { onFormSubmit } = this.props;
    const { accountValidate, passwordValidate, confirmPwdValidate } = this.state;
    if (accountValidate && passwordValidate && confirmPwdValidate) {
      onFormSubmit(this.state);
      Actions.register2();
    }
  }

  _change = () => {
    const { buttonIsPressed } = this.state;
    this.setState({ buttonIsPressed: !buttonIsPressed });
  }

  render = () => {
    const { buttonIsPressed, accountMsg, passwordMsg, confirmPwdMsg } = this.state;
    return (
      <View padder style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.logoStyle}> LOGO </Text>
        </View>
        <View style={styles.formContainer}>
          <Form style={styles.formStyle}>
            <View style={styles.formTop}>
              <Item stackedLabel style={styles.formInputContainer}>
                <Label style={styles.labelText}> 帳號 </Label>
                <View style={styles.textInputContainer}>
                  <Input
                    style={styles.textInputStyle}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    keyboardType="default"
                    onChangeText={v => this.validate(v, 'account')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  <Icon style={styles.iconStyle} name="user" />
                </View>
              </Item>
              <Text style={styles.valText}>{accountMsg}</Text>
              <Item stackedLabel style={styles.formInputContainer}>
                <Label style={styles.labelText}> 密碼 </Label>
                <View style={styles.textInputContainer}>
                  <Input
                    style={styles.textInputStyle}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    keyboardType="default"
                    onChangeText={v => this.validate(v, 'password')}
                    onSubmitEditing={Keyboard.dismiss}
                    secureTextEntry
                  />
                  <Icon style={styles.iconStyle} name="lock1" />
                </View>
              </Item>
              <Text style={styles.valText}>{passwordMsg}</Text>
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
                  <Icon style={styles.iconStyle} name="lock1" />
                </View>
              </Item>
              <Text style={styles.valText}>{confirmPwdMsg}</Text>
            </View>

            <View style={{ height: 50 }} />
            <View padder style={styles.formButton}>
              <TouchableHighlight
                style={{
                  ...styles.buttonStyle,
                }}
                onPress={this._handleSubmit}
                onPressIn={this._change}
                onPressOut={this._change}
                underlayColor="#AA8049"
              >
                <Text
                  style={{
                    ...styles.text,
                    color: buttonIsPressed === true ? 'white' : '#AA8049',
                  }}
                >
                  下一步
                </Text>
              </TouchableHighlight>
            </View>
          </Form>
        </View>
      </View>

    );
  }
}

export default Register;
