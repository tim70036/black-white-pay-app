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
const buttonWidth = viewportWidthPercent(88);
const buttonHeight = viewportHeightPercent(10);
export const thumbnailSize = viewportHeightPercent(7);

const styles = StyleSheet.create({
  container: {
    width: buttonWidth,
    height: buttonHeight,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

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
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginHorizontal: viewportWidthPercent(4),
    fontSize: 15,
  },

  icon: {
    color: Colors.labelWhite,
    fontSize: 16,
  },
});

const FriendButton = ({ image, text, textColor, onPress }) => (
  <PreventDoubleClickTO style={styles.container} onPress={onPress}>
    <View style={styles.textContainer}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
    <View style={styles.iconContainer}>
      <Icon name="right" type="AntDesign" style={styles.icon} />
    </View>
  </PreventDoubleClickTO>
);

FriendButton.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string,
  textColor: PropTypes.string,
  onPress: PropTypes.func,
};

FriendButton.defaultProps = {
  text: '',
  textColor: Colors.labelLightGray,
  onPress: null,
};

export default FriendButton;
