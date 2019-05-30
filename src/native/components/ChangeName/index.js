import React, { Component } from 'react';
import { View, Keyboard, TouchableHighlight, TextInput, Text, ImageBackground, Image  } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { formStyle, elementColors } from '../../lib/styles';
import Colors from '../../constants/colors';
import { nameValidate } from '../../lib/validate';
import NavBar from '../NavBar';

class ChangeName extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameMsg: '',
    };
  }

  _validate = () => {
    const { name } = this.state;
    const result = nameValidate(name);

    if (result.result) {
      this.setState({ nameMsg: '' });
    } else {
      this.setState({ nameMsg: result.errMsg });
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
    if (success) {
      Actions.pop();
    }
  }

  render() {
    const { nameMsg } = this.state;
    return (
      <ImageBackground source={require('../../../img/background/background2.png')} style={formStyle.container}>
        <NavBar back />
        <View style={formStyle.inputContainer}>
          <View style={formStyle.title}>
            <Text style={formStyle.titleText}>更改暱稱</Text>
          </View>
          <View style={formStyle.inputItem}>
            <View style={formStyle.label}>
              <Image source={require('../../../img/form/name.png')} style={formStyle.icon} />
              <Text style={formStyle.labelText}> 新暱稱</Text>
            </View>
            <TextInput
              style={formStyle.inputText}
              autoCapitalize="none"
              placeholder="請輸入新暱稱"
              placeholderTextColor={Colors.placeholderGray}
              keyboardType="default"
              onChangeText={v => this._handleChange('name', v)}
              onSubmitEditing={Keyboard.dismiss}
            />
            <Text style={formStyle.valText}>{nameMsg}</Text>
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
              <Text style={formStyle.buttonText}>確認</Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>
      </ImageBackground>
    );
  }
}

export default ChangeName;
