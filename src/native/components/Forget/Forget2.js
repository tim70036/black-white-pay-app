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
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: Colors.backgroundBlack,
    paddingHorizontal: viewportWidthPercent(4),
    paddingVertical: viewportHeightPercent(3),
  },

  topContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  formContainer: {
    flex: 7,
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
    flex: 3,
  },

  formButton: {
    flex: 1,
  },

  formInputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: viewportHeightPercent(1),
  },

  logoStyle: {
    color: Colors.labelGold,
    fontSize: 40,
    fontWeight: 'bold',
  },

  labelText: {
    fontSize: 18,
    color: Colors.labelGold,
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

class Forget extends React.Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      transPwd: '',
      confirmTransPwd: '',

      passwordMsg: '',
      confirmPwdMsg: '',
      transPwdMsg: '',
      confirmTransPwdMsg: '',
      buttonIsPressed: '',
    };
  }

  _validate = () => {
    const passwordVal = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    const transPwdVal = /([0-9]{6})$/g;
    const { password, confirmPassword, transPwd, confirmTransPwd } = this.state;


    if (passwordVal.test(password)) {
      this.setState({ passwordMsg: '' });
    } else {
      this.setState({ passwordMsg: '密碼至少為八碼，需包含字元和數字' });
      return false;
    }

    if (password === confirmPassword) {
      this.setState({ confirmPwdMsg: '' });
    } else {
      this.setState({ confirmPwdMsg: '密碼不符' });
      return false;
    }

    if (transPwdVal.test(transPwd)) {
      this.setState({ transPwdMsg: '' });
    } else {
      this.setState({ transPwdMsg: '轉帳密碼必須為6位數字' });
      return false;
    }

    if (transPwd === confirmTransPwd) {
      this.setState({ confirmTransPwdMsg: '' });
    } else {
      this.setState({ confirmTransPwdMsg: '密碼不符' });
      return false;
    }
    return true;
  }

  _handleChange = (key, val) => {
    this.setState({
      [key]: val,
    });
  }

  _handleSubmit = async () => {
    const { onFormSubmit } = this.props;
    if (!this._validate()) return;

    let success = await onFormSubmit(this.state);
    if (success) Actions.login();
  }

  _change = () => {
    const { buttonIsPressed } = this.state;
    this.setState({ buttonIsPressed: !buttonIsPressed });
  }

  render = () => {
    const { buttonIsPressed, passwordMsg, confirmPwdMsg, transPwdMsg, confirmTransPwdMsg } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.logoStyle}> LOGO </Text>
        </View>
        <View style={styles.formContainer}>
          <Form style={styles.formStyle}>
            <View style={styles.formTop}>
              <Item stackedLabel style={styles.formInputContainer}>
                <Label style={styles.labelText}> 新密碼 </Label>
                <View style={styles.textInputContainer}>
                  <Input
                    style={styles.textInputStyle}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    keyboardType="default"
                    onChangeText={v => this._handleChange('password', v)}
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
                    onChangeText={v => this._handleChange('confirmPassword', v)}
                    onSubmitEditing={Keyboard.dismiss}
                    secureTextEntry
                  />
                  <Icon style={styles.iconStyle} name="lock1" />
                </View>
              </Item>
              <Text style={styles.valText}>{confirmPwdMsg}</Text>
              <Item stackedLabel style={styles.formInputContainer}>
                <Label style={styles.labelText}> 新交易密碼 </Label>
                <View style={styles.textInputContainer}>
                  <Input
                    style={styles.textInputStyle}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    keyboardType="default"
                    onChangeText={v => this._handleChange('transPwd', v)}
                    onSubmitEditing={Keyboard.dismiss}
                    secureTextEntry
                  />
                  <Icon style={styles.iconStyle} name="lock1" />
                </View>
                <View style={{ height: 20 }} />
              </Item>
              <Text style={styles.valText}>{transPwdMsg}</Text>
              <Item stackedLabel style={styles.formInputContainer}>
                <Label style={styles.labelText}> 再次確認交易密碼 </Label>
                <View style={styles.textInputContainer}>
                  <Input
                    style={styles.textInputStyle}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    keyboardType="default"
                    onChangeText={v => this._handleChange('confirmTransPwd', v)}
                    onSubmitEditing={Keyboard.dismiss}
                    secureTextEntry
                  />
                  <Icon style={styles.iconStyle} name="lock1" />
                </View>
                <View style={{ height: 20 }} />
              </Item>
              <Text style={styles.valText}>{confirmTransPwdMsg}</Text>
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
                underlayColor={Colors.labelGold}
              >
                <Text
                  style={{
                    ...styles.text,
                    color: buttonIsPressed === true ? 'white' : Colors.labelGold,
                  }}
                >
                  確認送出
                </Text>
              </TouchableHighlight>
            </View>
          </Form>
        </View>
      </View>

    );
  }
}

export default Forget;
