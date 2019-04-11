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
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 6,
    justifyContent: 'center',
  },

  formStyle: {
    flexDirection: 'column',
    flex: 1,
  },
  formTop: {
    justifyContent: 'center',
    flex: 2,
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
      transPwd: '',
      confirmTransPwd: '',

      transPwdValidate: false,
      confirmTransPwdValidate: false,
      transPwdMsg: '',
      confirmTransPwdMsg: '',
      buttonIsPressed: false,
    };
  }

  validate = (text, type) => {
    const transPwdVal = /([0-9]{6})$/g;
    const { transPwd } = this.state;
    if (type === 'transPwd') {
      if (transPwdVal.test(text)) {
        this.setState({ transPwdValidate: true, transPwdMsg: '' });
        this._handleChange('transPwd', text);
      } else {
        this.setState({ transPwdValidate: false, transPwdMsg: '轉帳密碼必須為6位數字' });
      }
    } else if (type === 'confirmTransPwd') {
      if (transPwd === text) {
        this._handleChange('confirmTransPwd', text);
        this.setState({ confirmTransPwdValidate: true, confirmTransPwdMsg: '' });
      } else {
        this.setState({ confirmTransPwdValidate: false, confirmTransPwdMsg: '密碼不符' });
      }
    }
  }

  _handleChange = (key, val) => {
    this.setState({
      [key]: val,
    });
  }

  _handleSubmit = () => {
    const { transPwdValidate, confirmTransPwdValidate } = this.state;
    const { onFormSubmit } = this.props;
    if (transPwdValidate && confirmTransPwdValidate) {
      onFormSubmit(this.state);
      Actions.register3();
    }
  }

  _change = () => {
    const { buttonIsPressed } = this.state;
    this.setState({ buttonIsPressed: !buttonIsPressed });
  }

  render() {
    const { buttonIsPressed, transPwdMsg, confirmTransPwdMsg } = this.state;
    return (
      <View padder style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.logoStyle}> LOGO </Text>
        </View>
        <View style={styles.formContainer}>
          <Form style={styles.formStyle}>
            <View style={styles.formTop}>
              <Item stackedLabel style={styles.formInputContainer}>
                <Label style={styles.labelText}> 交易密碼 </Label>
                <View style={styles.textInputContainer}>
                  <Input
                    style={styles.textInputStyle}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    keyboardType="default"
                    onChangeText={v => this.validate(v, 'transPwd')}
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
                    onChangeText={v => this.validate(v, 'confirmTransPwd')}
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
