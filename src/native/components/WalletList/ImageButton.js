import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import {
  viewportWidthPercent,
  viewportHeightPercent,
  PreventDoubleClickTO,
} from '../../lib/util';

// Sizing based on the viewport
const buttonWidth = viewportWidthPercent(20);
const buttonHeight = viewportHeightPercent(10);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // margin: 10,
    width: buttonWidth,
    height: buttonHeight,
    borderRadius: 10,
    justifyContent: 'center',
  },
  iconContainer: {
    // flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: viewportWidthPercent(2),
  },
  textContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: viewportWidthPercent(8),
    height: viewportWidthPercent(8),
    resizeMode: 'contain',
  },
});

const imglib = {
  qrCode: require('../../../img/walletList/qrCode.png'),
  record: require('../../../img/walletList/record.png'),
  transfer: require('../../../img/walletList/transfer.png'),
  exchange: require('../../../img/walletList/exchange.png'),
};

const ImageButton = ({ imgType, text, onPress, textColor }) => (
  <PreventDoubleClickTO style={styles.container} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Image source={imglib[imgType]} style={styles.img} />
    </View>
    <View style={styles.textContainer}>
      <Text style={{ color: textColor }}>{text}</Text>
    </View>
  </PreventDoubleClickTO>
);

ImageButton.propTypes = {
  imgType: PropTypes.string.isRequired,
  text: PropTypes.string,
  textColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

ImageButton.defaultProps = {
  text: '',
  textColor: 'white',
};

export default ImageButton;
