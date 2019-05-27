import React, { Component } from 'react';
import { View, Keyboard, TouchableHighlight, TextInput, Text, ImageBackground, Image  } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { formStyle, elementColors } from '../../lib/styles';
import Colors from '../../constants/colors';
import { pwdValidate, transPwdValidate } from '../../lib/validate';
import NavBar from '../NavBar';

class Forget extends Component {
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
    };
  }

  _validate = () => {
    const { password, confirmPassword, transPwd, confirmTransPwd } = this.state;
    const pwdResult = pwdValidate(password);
    const transPwdResult = transPwdValidate(transPwd);

    if (pwdResult.result) {
      this.setState({ passwordMsg: '' });
    } else {
      this.setState({ passwordMsg: pwdResult.errMsg });
      return false;
    }

    if (password === confirmPassword) {
      this.setState({ confirmPwdMsg: '' });
    } else {
      this.setState({ confirmPwdMsg: '密碼不符' });
      return false;
    }

    if (transPwdResult.result) {
      this.setState({ transPwdMsg: '' });
    } else {
      this.setState({ transPwdMsg: transPwdResult.errMsg });
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

  render() {
    const { passwordMsg, confirmPwdMsg, transPwdMsg, confirmTransPwdMsg } = this.state;
    return (
      <ImageBackground source={require('../../../img/background/background2.png')} style={formStyle.container}>
        <NavBar back />
        <View style={formStyle.inputContainer}>
          <View style={formStyle.title}>
            <Text style={formStyle.titleText}>重設密碼</Text>
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
              secureTextEntry
            />
            <Text style={formStyle.valText}>{passwordMsg}</Text>
          </View>
          <View style={formStyle.inputItem}>
            <View style={formStyle.label}>
              <Image source={require('../../../img/form/pwd.png')} style={formStyle.icon} />
              <Text style={formStyle.labelText}> 再次確認密碼</Text>
            </View>
            <TextInput
              style={formStyle.inputText}
              autoCapitalize="none"
              placeholder="請再次輸入密碼"
              placeholderTextColor={Colors.placeholderGray}
              keyboardType="default"
              onChangeText={v => this._handleChange('confirmPassword', v)}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry
            />
            <Text style={formStyle.valText}>{confirmPwdMsg}</Text>
          </View>
          <View style={formStyle.inputItem}>
            <View style={formStyle.label}>
              <Image source={require('../../../img/form/transPwd.png')} style={formStyle.icon} />
              <Text style={formStyle.labelText}> 交易密碼</Text>
            </View>
            <TextInput
              style={formStyle.inputText}
              autoCapitalize="none"
              placeholder="請輸入交易密碼"
              placeholderTextColor={Colors.placeholderGray}
              keyboardType="default"
              onChangeText={v => this._handleChange('transPwd', v)}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry
            />
            <Text style={formStyle.valText}>{transPwdMsg}</Text>
          </View>
          <View style={formStyle.inputItem}>
            <View style={formStyle.label}>
              <Image source={require('../../../img/form/transPwd.png')} style={formStyle.icon} />
              <Text style={formStyle.labelText}> 再次確認交易密碼</Text>
            </View>
            <TextInput
              style={formStyle.inputText}
              autoCapitalize="none"
              placeholder="請再次輸入交易密碼"
              placeholderTextColor={Colors.placeholderGray}
              keyboardType="default"
              onChangeText={v => this._handleChange('confirmTransPwd', v)}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry
            />
            <Text style={formStyle.valText}>{confirmTransPwdMsg}</Text>
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
              <Text style={formStyle.buttonText}>確認送出</Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>
      </ImageBackground>
    );
  }
}

export default Forget;
