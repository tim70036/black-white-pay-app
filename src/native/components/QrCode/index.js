import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import { StyleSheet, View, Text } from 'react-native';

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
  qrCodeContainer: {
    height: viewportHeightPercent(50),
    width: viewportWidthPercent(100),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundGray,
  },
  qrCode: {
    overflow: 'hidden',
  },
  text: {
    color: Colors.labelGray,
    margin: 30,
  },
});

class QrCode extends Component {
  state = {
  };

  render = () => {
    const { qrcodeData } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.qrCodeContainer}>
          <View style={styles.qrCode}>
            <QRCode
              value={JSON.stringify(qrcodeData)}
              size={200}
              bgColor="black"
              fgColor="white"
            />
          </View>
          <Text style={styles.text}>請掃描上面的 QR Code</Text>
        </View>
      </View>
      // <BaseLightbox>
      // </BaseLightbox>
    );
  };
}

export default QrCode;
