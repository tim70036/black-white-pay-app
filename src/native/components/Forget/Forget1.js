import React from 'react';
import {
  StyleSheet, Keyboard, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Form, Item, Label, Input, Text, View,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: Colors.backgroundBlack,
    paddingHorizontal: viewportWidthPercent(4),
    paddingVertical: viewportHeightPercent(3),
  },

  topContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  formContainer: {
    flex: 7,
    justifyContent: 'center',
    padding: viewportWidthPercent(4),
    marginVertical: viewportHeightPercent(2),
  },

  formStyle: {
    flexDirection: 'column',
    flex: 1,
  },

  formTop: {
    justifyContent: 'center',
    flex: 3,
  },

  formButton: {
    flex: 1,
  },

  formInputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: viewportHeightPercent(5),
  },

  logoStyle: {
    color: Colors.labelGold,
    fontSize: 40,
    fontWeight: 'bold',
  },

  labelText: {
    fontSize: 18,
    color: Colors.labelGold,
    justifyContent: 'center',
  },

  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 35,
  },

  textInputStyle: {
    height: '100%',
    color: 'white',
  },

  iconStyle: {
    color: Colors.labelGold,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
  },

  buttonStyle: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 45,
    borderWidth: 1,
    borderColor: Colors.labelGold,
    borderRadius: 50,
  },

  text: {
    color: Colors.labelGold,
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  valText: {
    color: 'red',
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 3,
  },
});

class Forget extends React.Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',

      accountValidate: false,
      accountMsg: '',
      buttonIsPressed: '',
    };
  }

  validate = (text, type) => {
    const phoneVal = /((?=(09))[0-9]{10})$/g;
    if (type === 'account') {
      if (phoneVal.test(text)) {
        this.setState({ accountValidate: true, accountMsg: '' });
        this._handleChange('account', text);
      } else {
        this.setState({ accountValidate: false, accountMsg: '帳號必須為電話號碼' });
      }
    }
  }

  _handleChange = (key, val) => {
    this.setState({
      [key]: val,
    });
  }

  _handleSubmit = async () => {
    const { onFormSubmit } = this.props;
    const { accountValidate } = this.state;

    if (!accountValidate) return;

    let success = await onFormSubmit(this.state);
    if (success) Actions.forgetVerifyPhone();
  }

  _change = () => {
    const { buttonIsPressed } = this.state;
    this.setState({ buttonIsPressed: !buttonIsPressed });
  }

  render = () => {
    const { buttonIsPressed, accountMsg } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.logoStyle}> LOGO </Text>
        </View>
        <View style={styles.formContainer}>
          <Form style={styles.formStyle}>
            <View style={styles.formTop}>
              <Item stackedLabel style={styles.formInputContainer}>
                <Label style={styles.labelText}> 帳號 </Label>
                <View style={styles.textInputContainer}>
                  <Input
                    style={styles.textInputStyle}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    keyboardType="default"
                    onChangeText={v => this.validate(v, 'account')}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  <Icon style={styles.iconStyle} name="user" />
                </View>
              </Item>
              <Text style={styles.valText}>{accountMsg}</Text>
            </View>

            <View style={{ height: 50 }} />
            <View padder style={styles.formButton}>
              <TouchableHighlight
                style={{
                  ...styles.buttonStyle,
                }}
                onPress={this._handleSubmit}
                onPressIn={this._change}
                onPressOut={this._change}
                underlayColor={Colors.labelGold}
              >
                <Text
                  style={{
                    ...styles.text,
                    color: buttonIsPressed === true ? 'white' : Colors.labelGold,
                  }}
                >
                  取得驗證碼
                </Text>
              </TouchableHighlight>
            </View>
          </Form>
        </View>
      </View>

    );
  }
}

export default Forget;
