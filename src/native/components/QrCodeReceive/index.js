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
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Picker as IosPicker, Icon } from 'native-base';
import { viewportWidthPercent, viewportHeightPercent, IS_IOS } from '../../lib/util';
import { amountValidate } from '../../lib/validate';
import NavBar from '../NavBar';
import Colors from '../../constants/colors';
import { formStyle, elementColors } from '../../lib/styles';

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
    // height: viewportHeightPercent(22),
    width: viewportWidthPercent(80),
    borderRadius: viewportWidthPercent(5),
    backgroundColor: Colors.cardLightGray,
    paddingVertical: viewportHeightPercent(2),
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: viewportHeightPercent(9),
    marginTop: viewportHeightPercent(1),
  },
  currencyInput: {
    flex: 1,
    flexDirection: 'column',
  },
  currencyInputText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: viewportWidthPercent(6),
  },
  dot: {
    height: viewportHeightPercent(1),
    width: viewportHeightPercent(1),
    borderRadius: viewportHeightPercent(1) / 2,
    marginRight: viewportHeightPercent(1),
  },
  middleLine: {
    height: viewportHeightPercent(4),
    width: 1,
    backgroundColor: Colors.placeholderGray,
  },
  pickerContainer: {
    height: 35,
    width: '80%',
    marginLeft: '20%',
    overflow: 'hidden',
  },
  picker: {
    color: 'white',
    height: 35,
    backgroundColor: Colors.cardLightGray,
    width: '100%',
  },
  iospicker: {
    height: 35,
    backgroundColor: Colors.cardLightGray,
    width: '100%',
  },
  amountInput: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: viewportWidthPercent(5),
  },
  textinput: {
    color: Colors.labelWhite,
    fontSize: 15,
    height: 35,
    backgroundColor: Colors.cardLightGray,
    width: '100%',
    borderRadius: viewportWidthPercent(1),
    paddingLeft: viewportWidthPercent(3),
  },
  labeltext: {
    color: Colors.labelWhite,
    marginVertical: 2,
    marginLeft: 4,
  },
  inputButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  qrCodeContainer: {
    // height: viewportHeightPercent(40),
    width: viewportWidthPercent(80),
    marginTop: viewportHeightPercent(2),
    paddingTop: viewportWidthPercent(5),
    borderRadius: viewportWidthPercent(5),
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.cardLightGray,
  },
  emptySpace: {
    backgroundColor: Colors.cardGray,
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
  },
  text: {
    color: Colors.labelLightGray,
  },
  valText: {
    color: Colors.labelRed,
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 3,
  },
  linearGradient: {
    marginTop: 5,
    width: '60%',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    height: viewportHeightPercent(5),
    borderRadius: 36.5,

    shadowColor: '#D3BD99',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.44,
    shadowRadius: 37,
    elevation: 14,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36.5,
  },
  buttonText: {
    color: Colors.labelWhite,
    fontSize: 16,
  },
  icon: {
    fontSize: 25,
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
    this.setState({
      [name]: val,
    });
  }

  _handleChoose = async (storeId) => {
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
      amount: amount,
    };
    this.setState({ amount: amount, qrCodeData: newQrCodeData });
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
      color = Colors.placeholderGray;
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
      <ImageBackground style={styles.bkContainer} source={require('../../../img/background/background2.png')}>
        <ScrollView>
          <NavBar title="收款" back />
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <View style={styles.input}>
                <View style={styles.currencyInput}>
                  <View style={styles.currencyInputText}>
                    <View style={[styles.dot, { backgroundColor: '#FF7F34' }]} />
                    <Text style={styles.labeltext}>選擇幣別</Text>
                    <Icon name="md-arrow-dropdown" type="Ionicons" style={[styles.icon, { color: 'white', marginLeft: 15 }]} />
                  </View>
                  <View style={styles.pickerContainer}>
                    {
                      IS_IOS ? (
                        <IosPicker
                          mode="dropdown"
                          style={styles.iospicker}
                          textStyle={{ color: Colors.labelWhite, fontSize: 15 }}
                          itemStyle={{
                            marginLeft: 0,
                            paddingLeft: 10,
                          }}
                          selectedValue={curStoreId}
                          onValueChange={itemValue => this._handleChoose(itemValue)}
                        >
                          { walletsData.map((i, index) => (
                            <IosPicker.Item key={i} label={`${i.currencyName}`} value={i.storeId} />
                          ))}
                        </IosPicker>
                      ) : (
                        <Picker
                          style={styles.picker}
                          selectedValue={curStoreId}
                          activeItemTextStyle={{ fontSize: 15 }}
                          onValueChange={itemValue => this._handleChoose(itemValue)}
                        >
                          { walletsData.map((i, index) => (
                            <Picker.Item key={i} label={`${i.currencyName}`} value={i.storeId} />
                          ))}
                        </Picker>
                      )
                    }
                  </View>
                </View>
                <View style={[styles.middleLine, { height: viewportHeightPercent(8) }]} />
                <View style={styles.currencyInput}>
                  <View style={styles.currencyInputText}>
                    <View style={[styles.dot, { backgroundColor: '#3AF8D2' }]} />
                    <Text style={styles.labeltext}>輸入收款數量</Text>
                  </View>
                  <View style={styles.amountInput}>
                    <TextInput
                      style={styles.textinput}
                      autoCapitalize="none"
                      placeholder="輸入收款數量"
                      placeholderTextColor={Colors.placeholderGray}
                      keyboardType="number-pad"
                      onChangeText={v => this._handleChange('amount', v)}
                      onSubmitEditing={Keyboard.dsmiss}
                      value={amount}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.valTextContainer}>
                <Text style={styles.valText}>{amountMsg}</Text>
              </View>
              <View style={styles.inputButton}>
                <LinearGradient
                  colors={elementColors.buttonLinearGradient}
                  style={styles.linearGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this._handleRerender}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.buttonText}>產生QRcode</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
            <View style={styles.qrCodeContainer}>
              <View style={[styles.emptySpace, { height: showEmptySize, width: showEmptySize }]} />
              <View style={[styles.qrCode, { borderColor: color, borderWidth: QrboderWidth }]}>
                <QRCode
                  value={JSON.stringify(qrCodeData)}
                  size={showQRSize}
                  bgColor="#090909"
                  fgColor={Colors.labelWhite}
                />
              </View>
              <View style={styles.QRtextContainer}>
                <Text style={styles.text}>{notifyString1}</Text>
                <Text style={styles.text}>{notifyString2}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  };
}

export default QrCodeReceive;
