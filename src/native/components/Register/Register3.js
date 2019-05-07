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
import { CheckBox } from 'react-native-elements';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
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
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 6,
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
    flex: 1,
  },
  formMiddle: {
    flex: 1,
  },
  formBottom: {
    flex: 1,
  },
  formInputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: viewportHeightPercent(5),
  },

  checkBoxStyle: {
    width: '100%',
    color: 'green',
    backgroundColor: 'black',
    borderWidth: 10,
  },

  checkboxText: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  logoStyle: {
    color: Colors.labelGold,
    fontSize: 40,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 18,
    color: Colors.labelGold,
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

class Register extends React.Component {
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

      buttonIsPressed: false,
      checked: false,
      checkedMsg: '',
    };
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
    Actions.login();
  }

  _onPressPrivacy = () => {
    Actions.privacy();
  };

  _change = () => {
    const { buttonIsPressed } = this.state;
    this.setState({ buttonIsPressed: !buttonIsPressed });
  }

  _validate = () => {
    const { name, checked } = this.state; 

    if (name.length >= 1 && name.length <= 6) {
      this.setState({ nameMsg: '' });
    } else {
      this.setState({ nameMsg: '暱稱長度最長為六，最短為一' });
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

  render() {
    const { buttonIsPressed, checked, nameMsg, checkedMsg } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.logoStyle}> LOGO </Text>
        </View>
        <View style={styles.formContainer}>
          <Form style={styles.formStyle}>
            <View style={styles.formTop}>
              <Item stackedLabel style={styles.formInputContainer}>
                <Label style={styles.labelText}> 暱稱 </Label>
                <View style={styles.textInputContainer}>
                  <Input
                    style={styles.textInputStyle}
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    keyboardType="default"
                    onChangeText={v => this._handleChange('name', v)}
                    onSubmitEditing={Keyboard.dismiss}
                    onBlur={this._handleBlur}
                  />
                  <Icon style={styles.iconStyle} name="user" />
                </View>
                <View style={{ height: 20 }} />
              </Item>
              <Text style={styles.valText}>{nameMsg}</Text>
            </View>
            <View style={{ height: 50 }} />
            <View style={styles.formMiddle}>
              <View>
                <CheckBox
                  style={styles.checkBoxStyle}
                  // title="我已詳讀並同意遵守放飛協議"
                  checked={checked}
                  checkedColor="white"
                  containerStyle={{
                    backgroundColor: Colors.backgroundBlack,
                    borderWidth: 0,
                  }}
                  textStyle={{
                    color: 'white',
                    fontSize: 15,
                  }}
                  onPress={() => this.setState({ checked: !checked })}
                />
                <Text style={styles.checkboxText}>我已詳讀並同意遵守 </Text>
                <Text
                  style={{ 
                    ...styles.checkboxText,
                    color: 'red',
                    textDecorationLine: 'underline',
                  }}
                  onPress={this.onPressPrivacy}
                >
                  放飛協議
                </Text>
              </View>
              <Text style={styles.valText}>{checkedMsg}</Text>
            </View>
            <View padder style={styles.formBottom}>
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
                  確認註冊
                </Text>
              </TouchableHighlight>
            </View>
          </Form>
        </View>
      </View>

    );
  }
}

export default Register;
