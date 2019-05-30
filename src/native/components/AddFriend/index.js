import React, { Component } from 'react';
import { View, Keyboard, TouchableHighlight, TextInput, Text, ImageBackground, Image, StyleSheet  } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { formStyle, elementColors } from '../../lib/styles';
import Colors from '../../constants/colors';
import { accountValidate } from '../../lib/validate';
import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';
import NavBar from '../NavBar';

const styles = StyleSheet.create({
  scanButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 143,
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: Colors.buttonGray,
    width: 143,
    height: 143,
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },

  scanText: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: viewportHeightPercent(2),
  },

  text: {
    color: Colors.labelWhite,
    fontSize: 14,
  },
});


class AddFriend extends Component {
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
    const result = accountValidate(account);

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
    if (success) {
      Actions.friendDetail();
    }
  }

  render() {
    const { accountMsg } = this.state;
    return (
      <ImageBackground source={require('../../../img/background/background2.png')} style={formStyle.container}>
        <NavBar back />
        <View style={formStyle.inputContainer}>
          <TouchableHighlight
            style={styles.scanButton}
            onPress={this._handleSubmit}
            underlayColor={Colors.buttonGray}
          >
            <Image source={require('../../../img/addFriend/qr.png')} style={styles.image} />
          </TouchableHighlight>
          <View style={styles.scanText}>
            <Text style={styles.text}>點我掃描加好友</Text>
          </View>
          <View style={formStyle.inputItem}>
            <View style={formStyle.label}>
              <Image source={require('../../../img/form/account.png')} style={formStyle.icon} />
              <Text style={formStyle.labelText}> 帳號</Text>
            </View>
            <TextInput
              style={formStyle.inputText}
              autoCapitalize="none"
              placeholder="請輸入電話號碼"
              placeholderTextColor={Colors.placeholderGray}
              keyboardType="default"
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
              <Text style={formStyle.buttonText}>搜尋</Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>
      </ImageBackground>
    );
  }
}

export default AddFriend;
