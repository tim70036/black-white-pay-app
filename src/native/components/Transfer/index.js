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
    borderBottomWidth: 2,
    borderBottomColor: 'white',
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
      accountTo: '',
      amount: 0,
      transPwd: '',
      comment: '',
      accountValidate: false,
      accountMsg: '',
      amountValidate: false,
      amountMsg: '',
      transPwdValidate: false,
      transPwdMsg: '',
    };
  }

  async componentDidMount() {
    const { defaultAccount, defaultAmount } = this.props;
    this.validate(defaultAccount, 'accountTo');
    this.validate(defaultAmount, 'amount');
  }

  validate = (text, type) => {
    const accountVal = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    const amountVal = /^\d+$/g;
    const passwordVal = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    if (type === 'accountTo') {
      if (accountVal.test(text)) {
        this.setState({ accountValidate: true, accountMsg: '' });
        this._handleChange('accountTo', text);
      } else {
        this.setState({ accountValidate: false, accountMsg: '轉入帳號必須為英文及數字' });
      }
    } else if (type === 'amount') {
      console.log('1111111111');
      if (amountVal.test(text)) {
        console.log('2222222222');
        this.setState({ amountValidate: true, amountMsg: '' });
        this._handleChange('amount', text);
      } else {
        console.log('3333333333');
        this.setState({ amountValidate: false, amountMsg: '轉帳數量必須為數字' });
      }
    } else if (type === 'transPwd') {
      if (passwordVal.test(text)) {
        this._handleChange('transPwd', text);
        this.setState({ transPwdValidate: true, transPwdMsg: '' });
      } else {
        this.setState({ transPwdValidate: false, transPwdMsg: '轉帳密碼必須為英文及數字' });
      }
    }
  }

  _handleChange = (name, val) => {
    console.log(val);
    this.setState({
      [name]: val,
    });
  }

  _handleSubmit = async () => {
    const { onFormSubmit } = this.props;
    const { accountValidate, amountValidate, transPwdValidate } = this.state;
    if (accountValidate && amountValidate && transPwdValidate) {
      const success = await onFormSubmit(this.state);
      if (success) {
        Actions.pop();
      }
    }
  }

  render = () => {
    const { defaultAccount, defaultAmount } = this.props;
    const defaultAmountShow = (defaultAmount === 0) ? '' : defaultAmount;
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
              onChangeText={v => this.validate(v, 'accountTo')}
              onSubmitEditing={Keyboard.dismiss}
              value={defaultAccount}
            />
          </View>
          <View stackedLabel style={styles.inputItem}>
            <Text style={styles.label}>轉帳數量</Text>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder=""
              keyboardType="numeric"
              onChangeText={v => this.validate(v, 'amount')}
              onSubmitEditing={Keyboard.dsmiss}
              value={defaultAmountShow}
            />
          </View>
          <View stackedLabel style={styles.inputItem}>
            <Text style={styles.label}>個人轉帳密碼</Text>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder=""
              keyboardType="default"
              onChangeText={v => this.validate(v, 'transPwd')}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry
            />
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
