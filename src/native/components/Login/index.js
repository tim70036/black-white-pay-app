import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TouchableHighlight, TextInput, Text, ImageBackground, Image, ScrollView  } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { formStyle, elementColors } from '../../lib/styles';
import Colors from '../../constants/colors';
import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';
import registerForNotifications from '../../lib/expoNotification';

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

class Login extends Component {
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
    const success = await onFormSubmit(this.state);

    if (success) {
      registerForNotifications();
      Actions.main(); // need reset?
    }
  }


  render() {
    const { account, password } = this.state;
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
                onChangeText={v => this._handleChange('account', v)}
                onSubmitEditing={Keyboard.dismiss}
                defaultValue={account}
              />
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
                onChangeText={v => this._handleChange('password', v)}
                onSubmitEditing={Keyboard.dismiss}
                defaultValue={password}
                secureTextEntry
              />
            </View>
            <LinearGradient
              colors={elementColors.buttonLinearGradient}
              style={formStyle.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <TouchableHighlight
                style={formStyle.button}
                onPress={this._handleSubmit}
                underlayColor={Colors.buttonGray}
              >
                <Text style={formStyle.buttonText}>登入</Text>
              </TouchableHighlight>
            </LinearGradient>
            <TouchableHighlight
              style={styles.button}
              onPress={this._handleRegisterBtn}
              underlayColor={Colors.buttonGray}
            >
              <Text style={formStyle.buttonText}>註冊</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: 'transparent' }}
              onPress={this._handleForgetBtn}
              underlayColor="transparent"
            >
              <Text style={formStyle.buttonText}>忘記密碼</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default Login;
