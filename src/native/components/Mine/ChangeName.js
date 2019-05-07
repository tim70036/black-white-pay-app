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

class ChangeName extends Component {
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
    };
  }

  validate = () => {
    const { name } = this.state
    
    if (name.length >= 1 && name.length <= 5) {
      this.setState({ nameMsg: '' });
    } else {
      this.setState({ nameMsg: '暱稱長度最長為六，最短為一' });
      return false;
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
    const { nameMsg, buttonIsPressed } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <View style={styles.inputItem}>
            <Text style={styles.label}>新暱稱</Text>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder=""
              keyboardType="default"
              onChangeText={v => this._handleChange('name', v)}
              onSubmitEditing={Keyboard.dismiss}
            />
            <Text style={styles.valText}>{nameMsg}</Text>
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

export default ChangeName;
