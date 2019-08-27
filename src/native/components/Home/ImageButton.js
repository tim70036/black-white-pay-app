import React from 'react';
import {
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
import Colors from '../../constants/colors';

// Sizing based on the viewport
const buttonWidth = viewportWidthPercent(42); // 44% * 2 ~= 90%
const buttonHeight = '100%'; // decided by parent
const imageWidth = 38;
const imageHeight = 38;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    width: buttonWidth,
    height: buttonHeight,
    backgroundColor: 'rgba(42,42,42,0.6)',
    borderRadius: 26,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: 'contain',
  },
  text: {
    marginTop: viewportHeightPercent(3),
    fontSize: 14,
    color: Colors.labelLightGray,
  },
});

const ImageButton = ({ text, image, onPress }) => (
  <PreventDoubleClickTO style={styles.container} onPress={onPress}>
    <Image style={styles.image} source={image} />
    <Text style={styles.text}>{text}</Text>
  </PreventDoubleClickTO>
);

ImageButton.propTypes = {
  text: PropTypes.string,
  image: PropTypes.number,
  onPress: PropTypes.func,
};

ImageButton.defaultProps = {
  text: '',
  image: null,
  onPress: null,
};

export default ImageButton;
