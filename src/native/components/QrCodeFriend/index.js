import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Picker,
} from 'react-native';
import { Picker as IosPicker } from 'native-base';
import NavBar from '../NavBar';
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
    // height: 30,
    width: viewportWidthPercent(35),
    borderRadius: viewportWidthPercent(3),
    marginTop: viewportHeightPercent(1),
    // overflow: 'hidden',
  },
  picker: {
    color: Colors.labelWhite,
    height: 30,
    backgroundColor: Colors.placeholderGray,
    width: viewportWidthPercent(35),
  },
  iospicker: {
    height: 30,
    backgroundColor: Colors.placeholderGray,
    width: viewportWidthPercent(35),
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
});

class QrCodeFriend extends Component {
  static propTypes = {
    account: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render = () => {
    const { account } = this.props;
    const qrCodeData = {
      type: 'friend',
      account: account,
    };

    return (
      <ImageBackground style={styles.bkContainer} source={require('../../../img/background/background2.png')}>
        <NavBar title="我的QR" back />
        <View style={styles.container}>
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
              <Text style={[styles.text, { marginTop: 20 }]}>掃描我的 QR Code來加入好友</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };
}

export default QrCodeFriend;
