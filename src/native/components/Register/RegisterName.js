import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TouchableHighlight, TextInput, Text, ImageBackground, Image  } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';
import { formStyle, elementColors } from '../../lib/styles';
import Colors from '../../constants/colors';
import { nameValidate } from '../../lib/validate';

import '@expo/vector-icons';


const styles = StyleSheet.create({
  checkBox: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'red',
  },

  checkboxText: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'center',
    justifyContent: 'center',
  },

});

class Register extends Component {
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

      checked: false,
      checkedMsg: '',
    };
  }

  _validate = () => {
    const { name, checked } = this.state;
    const result = nameValidate(name);

    if (result.result) {
      this.setState({ nameMsg: '' });
    } else {
      this.setState({ nameMsg: result.errMsg });
      return false;
    }

    if (checked) {
      this.setState({ checkedMsg: '' });
    } else {
      this.setState({ checkedMsg: '請先同意放飛協議' });
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

    await onFormSubmit(this.state);
    Actions.registerName();
  }

  _handleSubmit = async () => {
    const { onFormSubmit } = this.props;
    if (!this._validate()) return;

    await onFormSubmit(this.state);
    Actions.login();
  }

  _onPressPrivacy = () => {
    Actions.privacy();
  }

  render() {
    const { checked, nameMsg, checkedMsg } = this.state;
    return (
      <ImageBackground source={require('../../../img/bg.png')} style={formStyle.bgImage}>
        <View style={formStyle.container}>
          <View style={formStyle.inputContainer}>
            <View style={formStyle.title}>
              <Text style={formStyle.titleText}>註冊</Text>
            </View>
            <View style={formStyle.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/pwd.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 暱稱</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請輸入暱稱"
                placeholderTextColor={elementColors.placeholderTextColor}
                keyboardType="default"
                onChangeText={v => this._handleChange('name', v)}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={formStyle.valText}>{nameMsg}</Text>
            </View>
            <View style={formStyle.inputItem}>
              <View style={styles.checkBox}>
                <CheckBox
                  containerStyle={{ /* backgroundColor: 'green',*/ marginHorizontal: 0, paddingHorizontal: 0 }}
                  checked={checked}
                  checkedColor="#B9A078"
                  uncheckedColor="#B9A078"
                  onPress={() => this.setState({ checked: !checked })}
                />
                <Text style={styles.checkboxText}>我已詳讀並同意遵守 </Text>
                <Text
                  style={{
                    ...styles.checkboxText,
                    color: '#E4954D',
                    textDecorationLine: 'underline',
                  }}
                  onPress={this._onPressPrivacy}
                >
                  放飛協議
                </Text>
              </View>
              <Text style={formStyle.valText}>{checkedMsg}</Text>
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
                underlayColor={Colors.gray}
              >
                <Text style={formStyle.buttonText}>確認</Text>
              </TouchableHighlight>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Register;
