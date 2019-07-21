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
  TouchableOpacity,
} from 'react-native';
import { Picker as IosPicker, Icon } from 'native-base';
import ModalSelector from 'react-native-modal-selector';
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
    height: viewportHeightPercent(7),
    width: viewportWidthPercent(80),
    borderRadius: viewportWidthPercent(5),
    backgroundColor: Colors.cardLightGray,
  },
  currencyInputText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: viewportHeightPercent(1),
    width: viewportHeightPercent(1),
    borderRadius: viewportHeightPercent(1) / 2,
    marginRight: viewportHeightPercent(1),
  },
  pickerContainer: {
    width: viewportWidthPercent(25),
    height: 35,
    backgroundColor: Colors.cardLightGray,
  },
  picker: {
    flexDirection: 'row',
    color: Colors.labelWhite,
    height: 35,
    width: '100%',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 20,
    color: Colors.labelWhite,
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
    borderWidth: 5,
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
    marginVertical: 2,
    marginLeft: 4,
  },
  icon: {
    fontSize: 25,
  },
  qrCodeRefreshContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: viewportHeightPercent(2),
    paddingVertical: viewportWidthPercent(5),
    width: viewportWidthPercent(80),
    backgroundColor: Colors.cardLightGray,
    borderRadius: viewportWidthPercent(5),
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
      currencyName: '請選擇幣別',
    };
    const { walletsData, curStoreId } = this.props;
    walletsData.map((obj) => {
      if (obj.storeId === curStoreId) {
        this.state.currencyName = obj.currencyName;
      }
    });
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
    const { currencyName } = this.state;

    return (
      <ImageBackground style={styles.bkContainer} source={require('../../../img/background/background2.png')}>
        <NavBar title="付款" back />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.currencyInputText}>
              <View style={[styles.dot, { backgroundColor: '#3AF8D2' }]} />
              <ModalSelector
                cancelText="取消"
                data={walletsData}
                keyExtractor={item => item.storeId}
                labelExtractor={item => item.currencyName}
                selectTextStyle={{ color: Colors.labelWhite }}
                selectStyle={{ borderWidth: 0 }}
                optionContainerStyle={{ backgroundColor: '#CCCCCC' }}
                cancelContainerStyle={{ backgroundColor: '#CCCCCC' }}
                touchableActiveOpacity={0.7}
                onChange={(item) => {
                  this._handleChoose(item.storeId);
                  this.setState({ currencyName: item.currencyName });
                }}
              >
                <View style={styles.picker}>
                  <Text style={styles.pickerText}>{currencyName}</Text>
                  <Icon name="md-arrow-dropdown" type="Ionicons" style={[styles.icon, { color: 'white', marginLeft: 10 }]} />
                </View>
              </ModalSelector>
            </View>
          </View>
          <View style={styles.qrCodeContainer}>
            <View style={styles.qrCode}>
              <QRCode
                value={JSON.stringify(qrCodeData)}
                size={200}
                bgColor="black"
                fgColor={Colors.labelWhite}
              />
            </View>
            <View style={styles.QRtextContainer}>
              <Text style={[styles.text, { marginTop: 20 }]}>請掃描上面的 QR Code</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.qrCodeRefreshContainer} onPress={console.log()}>
            <Icon name="md-refresh" type="Ionicons" style={[styles.icon, { color: Colors.labelGold, marginRight: 15 }]} />
            <Text style={[styles.text, { color: Colors.labelGold }]}>刷新二維碼</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };
}

export default QrCodePay;
