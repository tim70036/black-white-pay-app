import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';

import Colors from '../../constants/colors';

// Sizing based on the viewport
const buttonWidth = viewportWidthPercent(20);
const buttonHeight = viewportHeightPercent(10);

const styles = StyleSheet.create({
  container: {
    width: buttonWidth,
    height: buttonHeight,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: viewportHeightPercent(2),
    fontSize: 14,
    color: Colors.labelGray,
  },
  icon: {
    fontSize: viewportHeightPercent(5),
    color: Colors.labelGold,
  },
});

const IconButton = ({ iconText, iconName, iconType, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Icon name={iconName} type={iconType} style={styles.icon} />
    <Text style={styles.text}>{iconText}</Text>
  </TouchableOpacity>
);

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  iconText: PropTypes.string,
  onPress: PropTypes.func,
};

IconButton.defaultProps = {
  iconType: 'Ionicons',
  iconText: '某個功能',
  onPress: null,
};

export default IconButton;
