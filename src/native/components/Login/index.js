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

import registerForNotifications from '../../lib/expoNotification';

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
    flex: 1,
  },

  formBottom: {
    justifyContent: 'center',
    flex: 1,
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
    // flex: 1,
  },

  forgetPasswordStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 45,
  },

  text: {
    color: '#AA8049',
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

class Login extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }),
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    user: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      account: (props.user && props.user.account) ? props.user.account : '',
      password: (props.user && props.user.password) ? props.user.password : '',
      loginButtonIsPressed: false,
      registerButtonIsPressed: false,
    };
  }

  _handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  _handleRegisterBtn = () => {
    Actions.register();
  };

  _handleSubmit = async () => {
    const { onFormSubmit } = this.props;
    const success = await onFormSubmit(this.state);

    if (success) {
      registerForNotifications();
      Actions.main(); // need reset?
    }
  }

  _changeLoginButton = () => {
    const { loginButtonIsPressed } = this.state;
    this.setState({ loginButtonIsPressed: !loginButtonIsPressed });
  }

  _changeRegisterButton = () => {
    const { registerButtonIsPressed } = this.state;
    this.setState({ registerButtonIsPressed: !registerButtonIsPressed });
  }

  render = () => {
    const { account, password, loginButtonIsPressed, registerButtonIsPressed } = this.state;

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
                    onChangeText={v => this._handleChange('account', v)}
                    onSubmitEditing={Keyboard.dismiss}
                    defaultValue={account}
                  />
                  <Icon style={styles.iconStyle} name="user" />
                </View>
              </Item>
              <Item stackedLabel style={styles.formInputContainer}>
                <Label style={styles.labelText}> 密碼 </Label>
                <View style={styles.textInputContainer}>
                  <Input
                    style={styles.textInputStyle}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    keyboardType="default"
                    onChangeText={v => this._handleChange('password', v)}
                    onSubmitEditing={Keyboard.dismiss}
                    defaultValue={password}
                    secureTextEntry
                  />
                  <Icon style={styles.iconStyle} name="lock1" />
                </View>
              </Item>
            </View>
            <View style={{ height: 30 }} />
            <View style={styles.formBottom}>
              <View padder style={styles.formButton}>
                <TouchableHighlight
                  style={{
                    ...styles.buttonStyle,
                  }}
                  onPress={this._handleSubmit}
                  onPressIn={this._changeLoginButton}
                  onPressOut={this._changeLoginButton}
                  underlayColor="#AA8049"
                >
                  <Text
                    style={{
                      ...styles.text,
                      color: loginButtonIsPressed === true ? 'white' : '#AA8049',
                    }}
                  >
                    登入
                  </Text>
                </TouchableHighlight>
              </View>
              <View padder style={styles.formButton}>
                <TouchableHighlight
                  style={{
                    ...styles.buttonStyle,
                  }}
                  onPress={this._handleRegisterBtn}
                  onPressIn={this._changeRegisterButton}
                  onPressOut={this._changeRegisterButton}
                  underlayColor="#AA8049"
                >
                  <Text
                    style={{
                      ...styles.text,
                      color: registerButtonIsPressed === true ? 'white' : '#AA8049',
                    }}
                  >
                    註冊
                  </Text>
                </TouchableHighlight>
              </View>
              <View padder style={styles.formButton}>
                <TouchableHighlight
                  style={{
                    ...styles.forgetPasswordStyle,
                  }}
                  // onPress={this._handleSubmit}
                >
                  <Text
                    style={{
                      ...styles.text,
                      fontSize: 17,
                      color: '#F7F9F9',
                    }}
                  >
                    忘 記 密 碼
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </Form>
        </View>
      </View>

    );
  }
}

export default Login;
