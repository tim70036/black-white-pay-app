import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import BaseLightbox from '../BaseLightbox';

class QrCode extends Component {
  state = {
  };

  render = () => {
    const { qrcodeData } = this.props;

    return (
      <BaseLightbox>
        <QRCode
          style={{ overflow: 'hidden' }}
          value={qrcodeData.text}
          size={200}
          bgColor="black"
          fgColor="white"
        />
      </BaseLightbox>
    );
  };
}

export default QrCode;
