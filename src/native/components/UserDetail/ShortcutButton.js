import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';


import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';
import Colors from '../../constants/colors';

// Sizing based on the viewport
const buttonWidth = viewportWidthPercent(95);
const buttonHeight = viewportHeightPercent(12);
const imageWidth = 40;
const imageHeight = 40;

const styles = StyleSheet.create({
  container: {
    width: buttonWidth,
    height: buttonHeight,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    backgroundColor: Colors.cardGray,
    marginVertical: 5,
    paddingHorizontal: viewportWidthPercent(5),

    // test
    // borderWidth: 1,
    // borderColor: 'red',
  },

  textContainer: {
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  image: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: 'contain',
  },

  text: {
    marginHorizontal: 14,
    fontSize: 16,
  },

  icon: {
    color: Colors.labelLightGray,
    fontSize: 18,
  },
});

const ShortcutButton = ({ image, text, textColor, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.textContainer}>
      <Image style={styles.image} source={image} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
    <View style={styles.iconContainer}>
      <Icon name="right" type="AntDesign" style={styles.icon} />
    </View>
  </TouchableOpacity>
);

ShortcutButton.propTypes = {
  image: PropTypes.number.isRequired,
  text: PropTypes.string,
  textColor: PropTypes.string,
  onPress: PropTypes.func,
};

ShortcutButton.defaultProps = {
  text: '',
  textColor: Colors.labelLightGray,
  onPress: null,
};

export default ShortcutButton;
