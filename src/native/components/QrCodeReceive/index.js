import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  Picker,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo';
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import { amountValidate } from '../../lib/validate';
import NavBar from '../NavBar';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  bkContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: viewportHeightPercent(5),
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: viewportHeightPercent(20),
    width: viewportWidthPercent(80),
    borderRadius: viewportWidthPercent(5),
    backgroundColor: Colors.gray,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: viewportHeightPercent(2),
  },
  currencyInput: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pickerContainer: {
    height: 30,
    width: viewportWidthPercent(35),
    borderRadius: viewportWidthPercent(3),
    overflow: 'hidden',
  },
  picker: {
    color: 'white',
    height: 30,
    backgroundColor: Colors.middleLineGray,
    width: viewportWidthPercent(35),
  },
  amountInput: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textinput: {
    color: Colors.lightGray,
    height: 30,
    backgroundColor: Colors.middleLineGray,
    width: viewportWidthPercent(35),
    borderRadius: viewportWidthPercent(3),
    paddingLeft: viewportWidthPercent(3),
    paddingBottom: 0,
  },
  labeltext: {
    color: Colors.white,
  },
  inputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: viewportHeightPercent(5) / 2,
    height: viewportHeightPercent(5),
    width: viewportWidthPercent(70),
  },
  qrCodeContainer: {
    height: viewportHeightPercent(40),
    width: viewportWidthPercent(80),
    marginTop: viewportHeightPercent(2),
    paddingTop: viewportWidthPercent(5),
    borderRadius: viewportWidthPercent(5),
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.gray,
  },
  emptySpace: {
    backgroundColor: Colors.middleLineGray,
  },
  qrCode: {
    overflow: 'hidden',
    borderWidth: 2,
  },
  QRtextContainer: {
    height: viewportHeightPercent(10),
    width: viewportWidthPercent(80),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray,
    borderRadius: viewportWidthPercent(5),
  },
  text: {
    color: Colors.lightGray,
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
    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ).isRequired,
    curStoreId: PropTypes.number.isRequired,
    onChoose: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      qrCodeData: {
        type: 'receive',
        amount: '',
        account: '',
        storeId: '',
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

  _handleChoose = async (storeId) => {
    console.log(storeId);
    const { onChoose } = this.props;
    await onChoose(storeId);
  }

  _handleRerender = () => {
    const { account, curStoreId } = this.props;
    const { qrCodeData, amount } = this.state;
    const amountResult = amountValidate(amount);

    if (amountResult.result) {
      this.setState({ amountMsg: '' });
    } else {
      this.setState({ amountMsg: amountResult.errMsg });
      return false;
    }

    const newQrCodeData = {
      ...qrCodeData,
      account: account,
      storeId: curStoreId,
    };
    newQrCodeData.amount = parseInt(amount, 10);
    this.setState({ amount: parseInt(amount, 10).toString() });
    this.setState({ qrCodeData: newQrCodeData });
  }

  render = () => {
    const { walletsData, curStoreId } = this.props;
    const { amountMsg, amount, qrCodeData } = this.state;
    let showQRSize;
    let showEmptySize;
    let QrboderWidth;
    let color;
    let notifyString1;
    let notifyString2;
    if (qrCodeData.amount === '' || qrCodeData.amount === 0) {
      color = Colors.middleLineGray;
      showEmptySize = 200;
      showQRSize = 0;
      QrboderWidth = 0;
      notifyString1 = '請輸入收款數量';
      notifyString2 = '收款數量不可為0';
    } else {
      color = Colors.labelWhite;
      showEmptySize = 0;
      showQRSize = 200;
      QrboderWidth = 1;
      notifyString1 = '請掃描上面的 QR Code';
      notifyString2 = '';
    }

    return (
      <ImageBackground style={styles.bkContainer} source={require('../../../img/QRCodeReceive/QRCodeReceive_bk.png')}>
        <NavBar title="收款" back />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <View style={styles.currencyInput}>
                <Text style={styles.labeltext}>選擇幣別</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    style={styles.picker}
                    selectedValue={curStoreId}
                    onValueChange={itemValue => this._handleChoose(itemValue)}
                  >
                    { walletsData.map((i, index) => (
                      <Picker.Item key={i} label={`${i.storeName} (${i.currencyName})`} value={i.storeId} />
                    ))}
                  </Picker>
                </View>
              </View>
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
            </View>
            <View style={styles.inputButton}>
              <TouchableOpacity onPress={() => (this._handleRerender())}>
                <LinearGradient
                  colors={['#F3D3A0', '#C4A574', '#967848']}
                  style={styles.button}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.labeltext}>產生QRcode</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.qrCodeContainer}>
            <View style={[styles.emptySpace, { height: showEmptySize, width: showEmptySize }]} />
            <View style={[styles.qrCode, { borderColor: color, borderWidth: QrboderWidth }]}>
              <QRCode
                value={JSON.stringify(qrCodeData)}
                size={showQRSize}
                bgColor={Colors.backgroundBlack}
                fgColor={Colors.labelWhite}
              />
            </View>
            <View style={styles.QRtextContainer}>
              <Text style={[styles.text, { marginTop: 20 }]}>{notifyString1}</Text>
              <Text style={styles.text}>{notifyString2}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };
}

export default QrCodeReceive;
