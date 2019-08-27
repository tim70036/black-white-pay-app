import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TextInput, Text, ImageBackground, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';
import { formStyle, elementColors } from '../../lib/styles';
import { PreventDoubleClickTH } from '../../lib/util';
import Colors from '../../constants/colors';
import { nameValidate } from '../../lib/validate';
import NavBar from '../NavBar';

// import '@expo/vector-icons';


const styles = StyleSheet.create({
  checkBox: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  checkboxText: {
    color: Colors.labelWhite,
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
      <ImageBackground source={require('../../../img/background/background2.png')} style={formStyle.container}>
        <ScrollView>
          <NavBar back />
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
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="default"
                returnKeyType="done"
                onChangeText={v => this._handleChange('name', v)}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={formStyle.valText}>{nameMsg}</Text>
            </View>
            <View style={formStyle.inputItem}>
              <View style={styles.checkBox}>
                <CheckBox
                  containerStyle={{ marginHorizontal: 0, paddingHorizontal: 0 }}
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

export default Register;
