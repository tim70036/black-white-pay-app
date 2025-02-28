import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TextInput, Text, ImageBackground, Image, ScrollView  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';

import { accountValidate, pwdValidate } from '../../lib/validate';
import { formStyle, elementColors } from '../../lib/styles';
import Colors from '../../constants/colors';
import { registerForNotifications } from '../../lib/expo';
import { viewportHeightPercent, PreventDoubleClickTH } from '../../lib/util';

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 50,
    color: Colors.labelWhite,
  },
  logoImage: {
    height: viewportHeightPercent(25),
    width: viewportHeightPercent(25),
    resizeMode: 'contain',
  },
  button: {
    marginTop: viewportHeightPercent(3),
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 58,
    borderRadius: 36.5,
    alignItems: 'center',
    backgroundColor: Colors.buttonGray,
  },
});

export default class Login extends Component {
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
      visibleSpinner: false,

      accountMsg: '',
      passwordMsg: '',
    };
  }

  _validate = () => {
    const { account, password } = this.state;
    const pwdResult = pwdValidate(password);
    const accountResult = accountValidate(account);

    if (accountResult.result) {
      this.setState({ accountMsg: '' });
    } else {
      this.setState({ accountMsg: accountResult.errMsg });
      return false;
    }

    if (pwdResult.result) {
      this.setState({ passwordMsg: '' });
    } else {
      this.setState({ passwordMsg: pwdResult.errMsg });
      return false;
    }

    return true;
  }

  _handleChange = (key, val) => {
    this.setState({
      [key]: val,
    });
  }

  _handleRegisterBtn = () => {
    Actions.register();
  };

  _handleForgetBtn = () => {
    Actions.forget();
  };

  _handleSubmit = async () => {
    const { onFormSubmit } = this.props;
    if (!this._validate()) return;
    const success = await onFormSubmit(this.state);

    if (success) {
      // show loading modal
      this.setState({ visibleSpinner: true });
      await registerForNotifications();

      // Preload asset
      // await preloadRemoteAsset();

      this.setState({ visibleSpinner: false });
      Actions.main(); // need reset?
    }
  }


  render() {
    const { account, password, accountMsg, passwordMsg, visibleSpinner } = this.state;
    return (
      <ImageBackground source={require('../../../img/background/background2.png')} style={formStyle.container}>
        <ScrollView>
          <View style={{ ...formStyle.inputContainer, marginTop: 60 }}>
            <View style={styles.logo}>
              <Image source={require('../../../img/logo.png')} style={styles.logoImage} />
              {/* <Text style={styles.logoText}>黑白Pay</Text> */}
            </View>
            <View style={formStyle.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/account.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 帳號</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請輸入電話號碼"
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="default"
                returnKeyType="done"
                onChangeText={v => this._handleChange('account', v)}
                onSubmitEditing={Keyboard.dismiss}
                defaultValue={account}
              />
              <Text style={formStyle.valText}>{accountMsg}</Text>
            </View>
            <View style={formStyle.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/pwd.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 密碼</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請輸入密碼"
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="default"
                returnKeyType="done"
                onChangeText={v => this._handleChange('password', v)}
                onSubmitEditing={Keyboard.dismiss}
                defaultValue={password}
                secureTextEntry
              />
              <Text style={formStyle.valText}>{passwordMsg}</Text>
            </View>
            <LinearGradient
              colors={elementColors.buttonLinearGradient}
              style={formStyle.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <PreventDoubleClickTH
                style={formStyle.button}
                onPress={this._handleSubmit}
                underlayColor={Colors.buttonGray}
              >
                <Text style={formStyle.buttonText}>登入</Text>
              </PreventDoubleClickTH>
            </LinearGradient>
            <PreventDoubleClickTH
              style={styles.button}
              onPress={this._handleRegisterBtn}
              underlayColor={Colors.buttonGray}
            >
              <Text style={formStyle.buttonText}>註冊</Text>
            </PreventDoubleClickTH>
            <PreventDoubleClickTH
              style={{ ...styles.button, backgroundColor: 'transparent', marginTop: 0 }}
              onPress={this._handleForgetBtn}
              underlayColor="transparent"
            >
              <Text style={formStyle.buttonText}>忘記密碼</Text>
            </PreventDoubleClickTH>
          </View>
          <Spinner visible={visibleSpinner} overlayColor="rgba(0, 0, 0, 0)" indicatorStyle={{ size: 'large' }} />
        </ScrollView>
      </ImageBackground>
    );
  }
}

// export default Login;
