import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';

import Colors from '../../constants/colors';

// Sizing based on the viewport
const buttonWidth = viewportWidthPercent(42); // 44% * 2 ~= 90%
const buttonHeight = '100%'; // decided by parent
const imageWidth = 55;
const imageHeight = 55;

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
    fontSize: 16,
    color: Colors.labelLightGray,
  },
});

const ImageButton = ({ text, image, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image style={styles.image} source={image} />
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
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
