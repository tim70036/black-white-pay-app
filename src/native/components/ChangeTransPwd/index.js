import React, { Component } from 'react';
import { View, Keyboard, TextInput, Text, ImageBackground, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { formStyle, elementColors } from '../../lib/styles';
import { PreventDoubleClickTH } from '../../lib/util';
import Colors from '../../constants/colors';
import { transPwdValidate } from '../../lib/validate';
import NavBar from '../NavBar';

class ChangeTransPwd extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      oldTransPassword: '',
      newTransPassword: '',
      confirmPassword: '',

      oldTransPasswordMsg: '',
      newTransPasswordMsg: '',
      confirmPwdMsg: '',
    };
  }

  _validate = () => {
    const { newTransPassword, oldTransPassword, confirmPassword } = this.state;
    const result = transPwdValidate(newTransPassword);
    if (oldTransPassword.length < 1 ) {
      this.setState({ oldTransPasswordMsg: '密碼不可為空' });
      return false;
    } else {
      this.setState({ oldTransPasswordMsg: '' });
    }

    if (result.result) {
      this.setState({ newTransPasswordMsg: '' });
    } else {
      this.setState({ newTransPasswordMsg: result.errMsg });
      return false;
    }

    if (newTransPassword === oldTransPassword) {
      this.setState({ newTransPasswordMsg: '新密碼不可與舊密碼重複' });
      return false;
    }

    if (newTransPassword !== confirmPassword) {
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
    const { newTransPasswordMsg, confirmPwdMsg, oldTransPasswordMsg } = this.state;
    return (
      <ImageBackground source={require('../../../img/background/background2.png')} style={formStyle.container}>
        <ScrollView>
          <NavBar back />
          <View style={formStyle.inputContainer}>
            <View style={formStyle.title}>
              <Text style={formStyle.titleText}>更改交易密碼</Text>
            </View>
            <View style={formStyle.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/transPwd.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 舊交易密碼</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請輸入舊交易密碼"
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="default"
                returnKeyType="done"
                onChangeText={v => this._handleChange('oldTransPassword', v)}
                onSubmitEditing={Keyboard.dismiss}
                secureTextEntry
              />
              <Text style={formStyle.valText}>{oldTransPasswordMsg}</Text>
            </View>
            <View style={formStyle.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/transPwd.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 新交易密碼</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請輸入新交易密碼"
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="default"
                returnKeyType="done"
                onChangeText={v => this._handleChange('newTransPassword', v)}
                onSubmitEditing={Keyboard.dismiss}
                secureTextEntry
              />
              <Text style={formStyle.valText}>{newTransPasswordMsg}</Text>
            </View>
            <View style={formStyle.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/transPwd.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 再次確認密碼</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請再次輸入新交易密碼"
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

export default ChangeTransPwd;
