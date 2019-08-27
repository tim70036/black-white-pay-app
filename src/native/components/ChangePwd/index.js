import React, { Component } from 'react';
import { View, Keyboard, TextInput, Text, ImageBackground, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { formStyle, elementColors } from '../../lib/styles';
import { PreventDoubleClickTH } from '../../lib/util';
import Colors from '../../constants/colors';
import { pwdValidate } from '../../lib/validate';
import NavBar from '../NavBar';

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
      confirmPassword: '',

      oldPasswordMsg: '',
      newPasswordMsg: '',
      confirmPwdMsg: '',
    };
  }

  _validate = () => {
    const { newPassword, oldPassword, confirmPassword } = this.state;
    const result = pwdValidate(newPassword);

    if (oldPassword.length < 1) {
      this.setState({ oldPasswordMsg: '密碼不可為空' });
      return false;
    } else {
      this.setState({ oldPasswordMsg: '' });
    }

    if (result.result) {
      this.setState({ newPasswordMsg: '' });
    } else {
      this.setState({ newPasswordMsg: result.errorMsg });
      return false;
    }

    if (newPassword === oldPassword) {
      this.setState({ newPasswordMsg: '新密碼不可與舊密碼重複' });
      return false;
    }

    if (newPassword !== confirmPassword) {
      this.setState({ confirmPwdMsg: '密碼不符' });
      return false;
    } else {
      this.setState({ confirmPwdMsg: '' });
    }

    return true;
  }

  _handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  _handleSubmit = async () => {
    const { onFormSubmit } = this.props;

    if (this._validate()) {
      const success = await onFormSubmit(this.state);
      if (success) {
        Actions.pop();
      }
    }
  }

  render() {
    const { newPasswordMsg, confirmPwdMsg, oldPasswordMsg } = this.state;
    return (
      <ImageBackground source={require('../../../img/background/background2.png')} style={formStyle.container}>
        <ScrollView>
          <NavBar back />
          <View style={formStyle.inputContainer}>
            <View style={formStyle.title}>
              <Text style={formStyle.titleText}>更改密碼</Text>
            </View>
            <View style={formStyle.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/pwd.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 舊密碼</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請輸入舊密碼"
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="default"
                returnKeyType="done"
                onChangeText={v => this._handleChange('oldPassword', v)}
                onSubmitEditing={Keyboard.dismiss}
                secureTextEntry
              />
              <Text style={formStyle.valText}>{oldPasswordMsg}</Text>
            </View>
            <View style={formStyle.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/pwd.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 新密碼</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請輸入新密碼"
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="default"
                returnKeyType="done"
                onChangeText={v => this._handleChange('newPassword', v)}
                onSubmitEditing={Keyboard.dismiss}
                secureTextEntry
              />
              <Text style={formStyle.valText}>{newPasswordMsg}</Text>
            </View>
            <View style={formStyle.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/pwd.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 再次確認密碼</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請再次輸入新密碼"
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="default"
                returnKeyType="done"
                onChangeText={v => this._handleChange('confirmPassword', v)}
                onSubmitEditing={Keyboard.dismiss}
                secureTextEntry
              />
              <Text style={formStyle.valText}>{confirmPwdMsg}</Text>
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
                <Text style={formStyle.buttonText}>確認</Text>
              </PreventDoubleClickTH>
            </LinearGradient>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default ChangePwd;
