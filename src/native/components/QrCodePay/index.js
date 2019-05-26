import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  // Picker,
  PickerIOS,
} from 'react-native';
import { Picker } from 'native-base';

import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

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
    backgroundColor: Colors.backgroundGray,
  },
  pickerContainer: {
    // height: 30,
    width: viewportWidthPercent(35),
    borderRadius: viewportWidthPercent(3),
    marginTop: viewportHeightPercent(1),
    // overflow: 'hidden',
  },
  picker: {
    color: Colors.labelWhite,
    height: 30,
    backgroundColor: Colors.middleLineGray,
    width: viewportWidthPercent(35),
  },
  qrCodeContainer: {
    width: viewportWidthPercent(80),
    marginTop: viewportHeightPercent(2),
    paddingTop: viewportWidthPercent(5),
    borderRadius: viewportWidthPercent(5),
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.backgroundGray,
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
    backgroundColor: Colors.backgroundGray,
  },
  text: {
    color: Colors.labelGray,
  },
  labeltext: {
    color: Colors.labelWhite,
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
      <ImageBackground style={styles.bkContainer} source={require('../../../img/QRCodePay/QRCodePay_bk.png')}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.labeltext}>選擇幣別</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={curStoreId}
                onValueChange={itemValue => this._handleChoose(itemValue)}
                textStyle={{ color: 'white' }}
              >
                { walletsData.map((i, index) => (
                  <Picker.Item key={i} label={`${i.storeName} (${i.currencyName})`} value={i.storeId} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.qrCodeContainer}>
            <View style={styles.qrCode}>
              <QRCode
                value={JSON.stringify(qrCodeData)}
                size={200}
                bgColor={Colors.backgroundBlack}
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
