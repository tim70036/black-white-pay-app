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
      nameValidate: false,
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
    const { nameValidate, checked } = this.state;
    if (checked && nameValidate) {
      await onFormSubmit(this.state);
      Actions.login();
    }
  }

  _change = () => {
    const { buttonIsPressed } = this.state;
    this.setState({ buttonIsPressed: !buttonIsPressed });
  }

  validate = (text, type) => {

    if (type === 'name') {
      if (text.length >= 1 && text.length <= 5) {
        this.setState({ nameValidate: true, nameMsg: '' });
        this._handleChange('name', text);
      } else {
        this.setState({ nameValidate: false, nameMsg: '暱稱長度最長為六，最短為一' });
      }
    }
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
                    onChangeText={v => this.validate(v, 'name')}
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
              <CheckBox
                style={styles.checkBoxStyle}
                title="我已詳讀並同意遵守放飛協議"
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
