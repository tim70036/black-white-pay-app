import React from 'react';
import {
  StyleSheet, Keyboard, TouchableHighlight, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Form, Item, Label, Input, Text, View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundBlack,
    paddingHorizontal: viewportWidthPercent(4),
    paddingVertical: viewportHeightPercent(3),
  },

  topContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: viewportWidthPercent(2),
  },

  formContainer: {
    flex: 4,
    padding: viewportWidthPercent(2),
  },

  formStyle: {
    flex: 1,
    flexDirection: 'column',
  },

  buttonStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderWidth: 1,
    borderColor: Colors.labelGold,
    borderRadius: 50,
  },

  whiteText: {
    color: 'white',
    fontSize: 20,
  },

  formInputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formTop: {
    justifyContent: 'center',
    // flex: 1,
  },

  formBottom: {
    justifyContent: 'center',
    // flex: 1,
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
    color: Colors.labelGold,
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  labelText: {
    fontSize: 18,
    color: Colors.labelGold,
    justifyContent: 'center',
  },

  valText: {
    color: 'red',
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 3,
  },

  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.backgroundBlack,
  },

  image: {
    flex: 1,
    backgroundColor: Colors.backgroundBlack,
  },

  formButton: {
    flex: 1,
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
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: 'https://gswallet.s3.ap-northeast-1.amazonaws.com/roleImg/1555080420246-logo.png' }}
            />
          </View>
        </View>
        <View style={{ height: viewportHeightPercent(2) }} />
        <View style={styles.formContainer}>
          <Form style={styles.formStyle}>
            <View style={styles.formTop}>
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
            </View>
            <View style={{ height: viewportHeightPercent(4) }} />
            <View style={styles.formBottom}>
              <View style={styles.formButton}>
                <TouchableHighlight
                  style={styles.buttonStyle}
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
                    新增
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </Form>
        </View>
      </View>
    );
  }
}

export default AddStore;
