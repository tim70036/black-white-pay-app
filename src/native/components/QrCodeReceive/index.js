import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import { Button } from 'native-base';

import BaseLightbox from '../BaseLightbox';
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountInput: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: viewportHeightPercent(12.5),
  },
  textinput: {
    color: Colors.labelGray,
    borderBottomWidth: 1,
    borderBottomColor: Colors.labelWhite,
    width: viewportWidthPercent(35),
  },
  labeltext: {
    color: Colors.labelWhite,
  },
  inputButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: viewportWidthPercent(30),
  },
  qrCodeContainer: {
    height: viewportHeightPercent(50),
    width: viewportWidthPercent(100),
    marginTop: viewportHeightPercent(2),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundGray,
  },
  qrCode: {
    overflow: 'hidden',
    borderWidth: 2,
    // borderColor: 'white',
  },
  text: {
    color: Colors.labelGray,
    // margin: 30,
  },
  valText: {
    color: 'red',
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 3,
  },
});

class QrCodeReceive extends Component {
  static propTypes = {
    account: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      qrCodeData: {
        type: 'receive',
        amount: '',
        account: props.account,
        storeId: -1,
      },
      amount: '',
      amountMsg: '',
    };
  }

  _handleChange = (name, val) => {
    console.log(val);
    this.setState({
      [name]: val,
    });
  }

  _handleRerender = () => {
    const { qrCodeData, amount } = this.state;
    const amountVal = /^\d+$/g;
    if (amountVal.test(amount)) {
      this.setState({ amountMsg: '' });
    } else {
      this.setState({ amountMsg: '收款數量必須為數字' });
      return false;
    }

    const newQrCodeData = { ...qrCodeData };
    newQrCodeData.amount = parseInt(amount, 10);
    this.setState({ amount: parseInt(amount, 10).toString() });
    this.setState({ qrCodeData: newQrCodeData });
  }

  render = () => {
    const { qrCodeData, amountMsg, amount } = this.state;
    let showSize;
    let color;
    let notifyString1;
    let notifyString2;
    if (qrCodeData.amount === '' || qrCodeData.amount === 0) {
      color = Colors.backgroundGray;
      showSize = 0;
      notifyString1 = '請輸入收款數量';
      notifyString2 = '收款數量不可為0';
    } else {
      color = Colors.labelWhite;
      showSize = 200;
      notifyString1 = '請掃描上面的 QR Code';
      notifyString2 = '';
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.amountInput}>
            <Text style={styles.labeltext}>輸入收款數量</Text>
            <TextInput
              style={styles.textinput}
              autoCapitalize="none"
              placeholder=""
              keyboardType="numeric"
              onChangeText={v => this._handleChange('amount', v)}
              onSubmitEditing={Keyboard.dsmiss}
              value={amount}
            />
            <Text style={styles.valText}>{amountMsg}</Text>
          </View>
          <View style={styles.inputButton}>
            <Button block onPress={this._handleRerender} style={styles.button}>
              <Text style={styles.labeltext}>產生QRcode</Text>
            </Button>
          </View>
        </View>
        <View style={styles.qrCodeContainer}>
          <View style={[styles.qrCode, { borderColor: color }]}>
            <QRCode
              value={JSON.stringify(qrCodeData)}
              size={showSize}
              bgColor="black"
              fgColor="white"
            />
          </View>
          <Text style={[styles.text, { marginTop: 30 }]}>{notifyString1}</Text>
          <Text style={styles.text}>{notifyString2}</Text>
        </View>
      </View>
      // <BaseLightbox>
      // </BaseLightbox>
    );
  };
}

export default QrCodeReceive;
