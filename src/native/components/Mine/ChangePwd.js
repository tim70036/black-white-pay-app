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
      buttonIsPressed: '',
    };
  }

  validate = () => {
    const passwordVal = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    const { newPassword, oldPassword, confirmPassword } = this.state;
    if (oldPassword.length <= 1 ) {
      this.setState({ oldPasswordMsg: '密碼不可為空' });
      return false;
    } else {
      this.setState({ oldPasswordMsg: '' });
    }
    
    if (passwordVal.test(newPassword)) {
      this.setState({ newPasswordMsg: '' });
    } else {
      this.setState({ newPasswordMsg: '密碼至少為八碼，需包含字元和數字' });
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
    const { newPasswordMsg, confirmPwdMsg, oldPasswordMsg, buttonIsPressed } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <View style={styles.inputItem}>
            <Text style={styles.label}>舊密碼</Text>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder=""
              keyboardType="default"
              onChangeText={v => this._handleChange('oldPassword', v)}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry
            />
            <Text style={styles.valText}>{oldPasswordMsg}</Text>
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.label}>新密碼</Text>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder=""
              keyboardType="default"
              onChangeText={v => this._handleChange('newPassword', v)}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry
            />
            <Text style={styles.valText}>{newPasswordMsg}</Text>
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

export default ChangePwd;
