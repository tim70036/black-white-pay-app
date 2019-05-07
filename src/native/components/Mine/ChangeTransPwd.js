import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TouchableHighlight, TextInput } from 'react-native';
import {
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';

import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: viewportHeightPercent(2),
    paddingHorizontal: viewportWidthPercent(4),
    backgroundColor: Colors.backgroundBlack,
  },
  inputsContainer: { // no flex 1, so container will not stretch too much
    flex: 1,
    justifyContent: 'center',
    padding: viewportWidthPercent(4),
    marginVertical: viewportHeightPercent(1),
    backgroundColor: Colors.backgroundGray,
    borderRadius: 8,
  },
  inputItem: {
    // marginTop: viewportHeightPercent(4),
    marginBottom: viewportHeightPercent(3),
  },
  label: {
    color: Colors.labelGold,
  },
  inputText: {
    color: Colors.labelWhite,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingVertical: viewportHeightPercent(1),
  },
  valText: {
    color: 'red',
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 3,
  },
  buttonStyle: {
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 45,
    borderWidth: 1,
    borderColor: Colors.buttonLightGray,
    backgroundColor: Colors.buttonGray,
    borderRadius: 10,
    marginTop: viewportHeightPercent(3),
  },
  buttonText: {
    color: Colors.labelGold,
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

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
      buttonIsPressed: '',
    };
  }

  validate = () => {
    const transPwdVal = /([0-9]{6})$/g;
    const { newTransPassword, oldTransPassword, confirmPassword } = this.state;
    if (oldTransPassword.length <= 1 ) {
      this.setState({ oldTransPasswordMsg: '密碼不可為空' });
      return false;
    } else {
      this.setState({ oldTransPasswordMsg: '' });
    }
    
    if (transPwdVal.test(newTransPassword)) {
      this.setState({ newTransPasswordMsg: '' });
    } else {
      this.setState({ newTransPasswordMsg: '轉帳密碼必須為6位數字' });
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

  _change = () => {
    const { buttonIsPressed } = this.state;
    this.setState({ buttonIsPressed: !buttonIsPressed });
  }

  _handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  _handleSubmit = async () => {
    const { onFormSubmit } = this.props;
    if (this.validate()) {
      const success = await onFormSubmit(this.state);
      if (success) {
        Actions.pop();
      }
    }
  }

  render() {
    const { newTransPasswordMsg, confirmPwdMsg, oldTransPasswordMsg, buttonIsPressed } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <View style={styles.inputItem}>
            <Text style={styles.label}>舊交易密碼</Text>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder=""
              keyboardType="default"
              onChangeText={v => this._handleChange('oldTransPassword', v)}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry
            />
            <Text style={styles.valText}>{oldTransPasswordMsg}</Text>
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.label}>新交易密碼</Text>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder=""
              keyboardType="default"
              onChangeText={v => this._handleChange('newTransPassword', v)}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry
            />
            <Text style={styles.valText}>{newTransPasswordMsg}</Text>
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.label}>再次確認密碼</Text>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder=""
              keyboardType="default"
              onChangeText={v => this._handleChange('confirmPassword', v)}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry
            />
            <Text style={styles.valText}>{confirmPwdMsg}</Text>
          </View>
          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={this._handleSubmit}
            onPressIn={this._change}
            onPressOut={this._change}
            underlayColor={Colors.buttonGray}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: buttonIsPressed === true ? 'white' : 'white',
              }}
            >
              確認
            </Text>
          </TouchableHighlight>
          
        </View>
      </View>
    );
  }
}

export default ChangeTransPwd;
