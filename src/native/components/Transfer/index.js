import React, { Component } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: viewportHeightPercent(3),
    paddingHorizontal: viewportWidthPercent(4),
    backgroundColor: '#191919',
  },
  inputsContainer: { // no flex 1, so container will not stretch too much
    flex: 1,
    justifyContent: 'center',
    padding: viewportWidthPercent(4),
    marginVertical: viewportHeightPercent(2),
    backgroundColor: '#242625',
    borderRadius: 8,
  },
  inputItem: {
    // marginTop: viewportHeightPercent(4),
    marginBottom: viewportHeightPercent(3),
  },
  label: {
    color: '#A87B44',
  },
  button: {
    backgroundColor: '#242625',
    marginVertical: viewportHeightPercent(3),
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#AA7F48',
  },
  buttonText: {
    color: '#AA7F48',
  },
  inputText: {
    color: '#DDDDDD',
  },
});

class Transfer extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      accountTo: '',
      amount: 0,
      transPwd: '',
      comment: '',
    };
  }

  _handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  _handleSubmit = async () => {
    const { onFormSubmit } = this.props;
    const success = await onFormSubmit(this.state);
    if (success) {
      Actions.pop();
    }
  }

  render = () => (
    <View style={styles.container}>
      <Form style={styles.inputsContainer}>
        <Item stackedLabel style={styles.inputItem}>
          <Label style={styles.label}>轉入帳號</Label>
          <Input
            style={styles.inputText}
            autoCapitalize="none"
            placeholder=""
            keyboardType="default"
            onChangeText={v => this._handleChange('accountTo', v)}
            onSubmitEditing={Keyboard.dismiss}
          />
        </Item>
        <Item stackedLabel style={styles.inputItem}>
          <Label style={styles.label}>轉帳數量</Label>
          <Input
            style={styles.inputText}
            autoCapitalize="none"
            placeholder=""
            keyboardType="numeric"
            onChangeText={v => this._handleChange('amount', v)}
            onSubmitEditing={Keyboard.dsmiss}
          />
        </Item>
        <Item stackedLabel style={styles.inputItem}>
          <Label style={styles.label}>個人轉帳密碼</Label>
          <Input
            style={styles.inputText}
            autoCapitalize="none"
            placeholder=""
            keyboardType="default"
            onChangeText={v => this._handleChange('transPwd', v)}
            onSubmitEditing={Keyboard.dismiss}
          />
        </Item>
        <Item stackedLabel style={styles.inputItem}>
          <Label style={styles.label}>備註</Label>
          <Input
            style={styles.inputText}
            autoCapitalize="none"
            placeholder=""
            keyboardType="default"
            onChangeText={v => this._handleChange('comment', v)}
            onSubmitEditing={Keyboard.dismiss}
          />
        </Item>
        <Button block onPress={this._handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>確認轉帳</Text>
        </Button>
      </Form>
    </View>
  );
}

export default Transfer;
