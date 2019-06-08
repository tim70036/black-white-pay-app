import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Picker,
  Image,
} from 'react-native';
import { Picker as IosPicker, Icon } from 'native-base';

import NavBar from '../NavBar';
import { formStyle } from '../../lib/styles';
import { viewportWidthPercent, viewportHeightPercent, IS_IOS } from '../../lib/util';
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
    paddingVertical: viewportWidthPercent(10),
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: viewportHeightPercent(14),
    width: viewportWidthPercent(80),
    borderRadius: viewportWidthPercent(5),
    backgroundColor: Colors.cardLightGray,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: viewportWidthPercent(50),
	height: '50%',
	backgroundColor: Colors.placeholderGray,
	// borderWidth: 1,
	// borderColor: 'red',
  },
  picker: {
    flex: 1,
	color: Colors.labelWhite,
	height: viewportHeightPercent(7),
	backgroundColor: Colors.placeholderGray,
  },
  iospicker: {
	flex: 1,
	height: viewportHeightPercent(7),
    backgroundColor: Colors.placeholderGray,
  },
  qrCodeContainer: {
    width: viewportWidthPercent(80),
    marginTop: viewportHeightPercent(2),
    paddingTop: viewportWidthPercent(5),
    borderRadius: viewportWidthPercent(5),
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.cardLightGray,
  },
  qrCode: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.labelWhite,
  },
  emptySpace: {
    backgroundColor: Colors.labelWhite,
  },
  QRtextContainer: {
    height: viewportHeightPercent(10),
    width: viewportWidthPercent(80),
    borderRadius: viewportWidthPercent(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardLightGray,
  },
  text: {
    color: Colors.labelLightGray,
  },
  labeltext: {
    color: Colors.labelWhite,
  },
  icon: {
	fontSize: 25,
	// borderWidth: 1,
	// borderColor: 'blue',
  },
});

class QrCodePay extends Component {
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
    };
  }

  _handleChoose = async (storeId) => {
    const { onChoose } = this.props;
    await onChoose(storeId);
  }

  render = () => {
    const { walletsData, account, curStoreId } = this.props;
    const qrCodeData = {
      type: 'pay',
      amount: '',
      account: account,
      storeId: curStoreId,
    };

    return (
      <ImageBackground style={styles.bkContainer} source={require('../../../img/background/background2.png')}>
        <NavBar title="付款" back />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.pickerContainer}>
              {
                IS_IOS ? (
                  <IosPicker
                    iosHeader="請選擇幣別"
                    iosIcon={<Image style={{ height: 9, width: 16, resizeMode: 'contain' }} source={require('../../../img/form/trianglePicker.png')} />}
                    mode="dropdown"
                    style={styles.iospicker}
                    textStyle={{ color: Colors.labelWhite }}
                    itemStyle={{
                      marginLeft: 0,
                      paddingLeft: 10,
                    }}
                    selectedValue={curStoreId}
                    onValueChange={itemValue => this._handleChoose(itemValue)}
                  >
                    { walletsData.map((i, index) => (
                      <IosPicker.Item key={i} label={`${i.storeName} (${i.currencyName})`} value={i.storeId} />
                    ))}
                  </IosPicker>

                ) : (
                  <Picker
                    style={styles.picker}
                    selectedValue={curStoreId}
                    onValueChange={itemValue => this._handleChoose(itemValue)}
                    prompt="請選擇幣別"
                  >
                    { walletsData.map((i, index) => (
                      <Picker.Item key={i} label={`${i.storeName} (${i.currencyName})`} value={i.storeId} />
                    ))}
                  </Picker>
                )
              }
              <Icon name="md-arrow-dropdown" type="Ionicons" style={[styles.icon, { color: 'white', marginRight: 5 }]} />
            </View>
          </View>
          <View style={styles.qrCodeContainer}>
            <View style={styles.qrCode}>
              <QRCode
                value={JSON.stringify(qrCodeData)}
                size={200}
                bgColor="#090909"
                fgColor={Colors.labelWhite}
              />
            </View>
            <View style={styles.QRtextContainer}>
              <Text style={[styles.text, { marginTop: 20 }]}>請掃描上面的 QR Code</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };
}

export default QrCodePay;
