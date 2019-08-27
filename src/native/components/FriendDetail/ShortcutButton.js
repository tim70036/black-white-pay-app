import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';


import {
  viewportWidthPercent,
  viewportHeightPercent,
  PreventDoubleClickTO,
} from '../../lib/util';
import Colors from '../../constants/colors';

// Sizing based on the viewport
const buttonWidth = viewportWidthPercent(95);
const buttonHeight = viewportHeightPercent(10);
const imageWidth = 35;
const imageHeight = 35;

const styles = StyleSheet.create({
  container: {
    width: buttonWidth,
    height: buttonHeight,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    backgroundColor: Colors.cardLightGray,
    borderRadius: 5,
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
    fontSize: 14,
  },

  icon: {
    color: Colors.labelLightGray,
    fontSize: 16,
  },
});

const ShortcutButton = ({ image, text, textColor, onPress }) => (
  <PreventDoubleClickTO style={styles.container} onPress={onPress}>
    <View style={styles.textContainer}>
      <Image style={styles.image} source={image} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
    <View style={styles.iconContainer}>
      <Icon name="right" type="AntDesign" style={styles.icon} />
    </View>
  </PreventDoubleClickTO>
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
