import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TextInput } from 'react-native';
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
import Colors from '../../constants/colors';
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
    backgroundColor: Colors.backgroundBlack,
  },
  inputsContainer: { // no flex 1, so container will not stretch too much
    flex: 1,
    justifyContent: 'center',
    padding: viewportWidthPercent(4),
    marginVertical: viewportHeightPercent(2),
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
  button: {
    backgroundColor: Colors.backgroundGray,
    marginVertical: viewportHeightPercent(3),
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.labelGold,
  },
  buttonText: {
    color: Colors.labelGold,
  },
  inputText: {
    color: Colors.labelWhite,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginTop: viewportHeightPercent(2),
  },
  valText: {
    color: 'red',
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 3,
  },
});

class Transfer extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    defaultAccount: PropTypes.string.isRequired,
    defaultAmount: PropTypes.number.isRequired,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      accountTo: props.defaultAccount,
      amount: (props.defaultAmount === 0) ? '' : props.defaultAmount,
      transPwd: '',
      comment: '',
      accountMsg: '',
      amountMsg: '',
      transPwdMsg: '',
    };
  }

  // async componentDidMount() {
  //   const { defaultAccount, defaultAmount } = this.props;
  //   this.validate(defaultAccount, 'accountTo');
  //   this.validate(defaultAmount, 'amount');
  // }

  validate = () => {
    const accountVal = /^[a-z0-9]+$/ig;
    const amountVal = /^\d+$/g;
    const passwordVal = /^[a-z0-9]+$/ig;
    const { accountTo, amount, transPwd } = this.state;
    if (accountVal.test(accountTo)) {
      this.setState({ accountMsg: '' });
    } else {
      this.setState({ accountMsg: '轉入帳號必須為英文及數字' });
      return false;
    }

    if (amountVal.test(amount)) {
      this.setState({ amountMsg: '' });
    } else {
      this.setState({ amountMsg: '轉帳數量必須為數字' });
      return false;
    }

    if (parseInt(amount, 10) !== 0) {
      this.setState({ amountMsg: '' });
      this.setState({ amount: parseInt(amount, 10).toString() });
    } else {
      this.setState({ amountMsg: '轉帳數量不可為0' });
      return false;
    }

    if (passwordVal.test(transPwd)) {
      this.setState({ transPwdMsg: '' });
    } else {
      this.setState({ transPwdMsg: '轉帳密碼必須為英文及數字' });
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
    if (this.validate()) {
      const success = await onFormSubmit(this.state);
      if (success) {
        Actions.pop();
      }
    }
  }

  render = () => {
    const { accountTo, amount } = this.state;
    const { accountMsg, amountMsg, transPwdMsg } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <View style={styles.inputItem}>
            <Text style={styles.label}>轉入帳號</Text>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder=""
              keyboardType="default"
              onChangeText={v => this._handleChange('accountTo', v)}
              onSubmitEditing={Keyboard.dismiss}
              value={accountTo}
            />
            <Text style={styles.valText}>{accountMsg}</Text>
          </View>
          <View stackedLabel style={styles.inputItem}>
            <Text style={styles.label}>轉帳數量</Text>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder=""
              keyboardType="numeric"
              onChangeText={v => this._handleChange('amount', v)}
              onSubmitEditing={Keyboard.dsmiss}
              value={amount}
            />
            <Text style={styles.valText}>{amountMsg}</Text>
          </View>
          <View stackedLabel style={styles.inputItem}>
            <Text style={styles.label}>個人轉帳密碼</Text>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder=""
              keyboardType="default"
              onChangeText={v => this._handleChange('transPwd', v)}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry
            />
            <Text style={styles.valText}>{transPwdMsg}</Text>
          </View>
          <View stackedLabel style={styles.inputItem}>
            <Text style={styles.label}>備註</Text>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder=""
              keyboardType="default"
              onChangeText={v => this._handleChange('comment', v)}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <Button block onPress={this._handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>確認轉帳</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Transfer;
