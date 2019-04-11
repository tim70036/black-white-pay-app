import React from 'react';
import {
  StyleSheet, Keyboard, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Form, Item, Label, Input, Text, View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1A1B1B',
  },
  emptySpace: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 2,
  },

  formStyle: {
    flexDirection: 'column',
    flex: 1,
  },

  buttonStyle: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 45,
    borderWidth: 1,
    borderColor: '#AA8049',
    borderRadius: 50,
  },

  whiteText: {
    color: 'white',
    fontSize: 20,
  },

  formInputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: viewportHeightPercent(5),
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

  text: {
    color: '#AA8049',
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  labelText: {
    fontSize: 18,
    color: '#AA8049',
    justifyContent: 'center',
  },

  valText: {
    color: 'red',
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 3,
  },

});

class AddStore extends React.Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      bindCode: '',
      bindCodeValidate: false,
      bindCodeMsg: '',
      buttonIsPressed: '',
    };
  }

  validate = (text, type) => {
    const bindCodeVal = /([0-9]{6})$/g;
    if (type === 'bindCode') {
      if (bindCodeVal.test(text)) {
        this.setState({ bindCodeValidate: true, bindCodeMsg: '' });
        this._handleChange('bindCode', text);
      } else {
        this.setState({ bindCodeValidate: false, bindCodeMsg: '綁定碼需為6位數' });
      }
    }
  }

  _handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  _handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state);
    Actions.pop();
  }

  _change = () => {
    const { buttonIsPressed } = this.state;
    this.setState({ buttonIsPressed: !buttonIsPressed });
  }

  render() {
    const { buttonIsPressed, bindCodeMsg } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={{ height: 60 }} />
          <View style={{ flex: 1 }} />
          <Form style={styles.formStyle}>
            <Item stackedLabel style={styles.formInputContainer}>
              <Label style={styles.labelText}>店家代碼</Label>
              <View style={styles.textInputContainer}>
                <Input
                  style={styles.textInputStyle}
                  autoCapitalize="none"
                  placeholderTextColor="white"
                  keyboardType="default"
                  onChangeText={v => this.validate(v, 'bindCode')}
                  onSubmitEditing={Keyboard.dismiss}
                  secureTextEntry
                />
              </View>
            </Item>
            <Text style={styles.valText}>{bindCodeMsg}</Text>
            <View style={{ height: 50 }} />
            <View padder style={styles.formButton}>
              <TouchableHighlight
                style={{
                  ...styles.buttonStyle,
                }}
                onPress={this._handleSubmit}
                onPressIn={this._change}
                onPressOut={this._change}
                underlayColor="#AA8049"
              >
                <Text
                  style={{
                    ...styles.text,
                    color: buttonIsPressed === true ? 'white' : '#AA8049',
                  }}
                >
                  新增
                </Text>
              </TouchableHighlight>
            </View>
          </Form>
          <View style={{ flex: 1 }} />
        </View>
      </View>
    );
  }
}

export default AddStore;
