import React, { Component } from 'react';
import { View, Keyboard, TouchableHighlight, TextInput, Text, ImageBackground, Image  } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { formStyle, elementColors } from '../../lib/styles';
import Colors from '../../constants/colors';
import { verifyCodeValidate } from '../../lib/validate';
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
      verifyCode: '',
      verifyCodeMsg: '',
    };
  }

  _validate = () => {
    const { verifyCode } = this.state;
    const result = verifyCodeValidate(verifyCode);
    if (result.result) {
      this.setState({ verifyCodeMsg: '' });
    } else {
      this.setState({ verifyCodeMsg: result.errMsg });
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

    const success = await onFormSubmit(this.state);
    if (success) Actions.forget2();
  }

  render() {
    const { verifyCodeMsg } = this.state;
    return (
      <ImageBackground source={require('../../../img/background/background2.png')} style={formStyle.container}>
        <NavBar back />
        <View style={formStyle.inputContainer}>
          <View style={formStyle.title}>
            <Text style={formStyle.titleText}>忘記密碼</Text>
          </View>
          <View style={formStyle.inputItem}>
            <View style={formStyle.label}>
              <Image source={require('../../../img/form/pwd.png')} style={formStyle.icon} />
              <Text style={formStyle.labelText}> 驗證碼</Text>
            </View>
            <TextInput
              style={formStyle.inputText}
              autoCapitalize="none"
              placeholder="請輸入驗證碼"
              placeholderTextColor={Colors.placeholderGray}
              keyboardType="default"
              onChangeText={v => this._handleChange('verifyCode', v)}
              onSubmitEditing={Keyboard.dismiss}
            />
            <Text style={formStyle.valText}>{verifyCodeMsg}</Text>
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
              <Text style={formStyle.buttonText}>驗證</Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>
      </ImageBackground>
    );
  }
}

export default Forget;
