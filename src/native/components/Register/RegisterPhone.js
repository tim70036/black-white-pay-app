import React, { Component } from 'react';
import { View, Keyboard, TouchableHighlight, TextInput, Text, ImageBackground, Image, ScrollView  } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { formStyle, elementColors } from '../../lib/styles';
import Colors from '../../constants/colors';
import { phoneValidate } from '../../lib/validate';
import NavBar from '../NavBar';

class Register extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      accountMsg: '',
    };
  }

  _validate = () => {
    const { account } = this.state;
    const result = phoneValidate(account);
    if (result.result) {
      this.setState({ accountMsg: '' });
    } else {
      this.setState({ accountMsg: result.errMsg });
      return false;
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
    if (!this._validate()) return;

    const success = await onFormSubmit(this.state);
    if (success) Actions.registerVerifyPhone();
  }

  render() {
    const { accountMsg } = this.state;
    return (
      <ImageBackground source={require('../../../img/background/background2.png')} style={formStyle.container}>
        <ScrollView>
          <NavBar back />
          <View style={formStyle.inputContainer}>
            <View style={formStyle.title}>
              <Text style={formStyle.titleText}>註冊</Text>
            </View>
            <View style={formStyle.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/account.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 手機號碼</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="登入帳號為手機密碼"
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="phone-pad"
                returnKeyType="done"
                onChangeText={v => this._handleChange('account', v)}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={formStyle.valText}>{accountMsg}</Text>
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
                <Text style={formStyle.buttonText}>取得驗證碼</Text>
              </TouchableHighlight>
            </LinearGradient>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default Register;
