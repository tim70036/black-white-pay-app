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
const buttonWidth = viewportWidthPercent(16);
const buttonHeight = 60;
const imageHeight = buttonHeight * 0.43;
const imageWidth = buttonHeight * 0.43;

const styles = StyleSheet.create({
  container: {
    width: buttonWidth,
    height: buttonHeight,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    // test
    // borderWidth: 2,
    // borderColor: 'red',
  },

  image: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: imageHeight,
    width: imageWidth,
    resizeMode: 'contain',

    // // test
    // borderWidth: 2,
    // borderColor: 'red',
  },

  text: {
    marginTop: 3,
    fontSize: 11,
  },
});

const ImageButton = ({ image, text, textColor, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image style={styles.image} source={image} />
    <Text style={[styles.text, { color: textColor }]}>{text}</Text>
  </TouchableOpacity>
);

ImageButton.propTypes = {
  image: PropTypes.number.isRequired,
  text: PropTypes.string,
  textColor: PropTypes.string,
  onPress: PropTypes.func,
};

ImageButton.defaultProps = {
  text: '',
  textColor: Colors.labelLightGray,
  onPress: null,
};

export default ImageButton;
