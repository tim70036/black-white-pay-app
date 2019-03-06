import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';

// Sizing based on the viewport
const buttonWidth = viewportWidthPercent(20);
const buttonHeight = viewportHeightPercent(10);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 10,
    width: buttonWidth,
    height: buttonHeight,
    borderRadius: 10,
  },
  iconContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 55,
  },
});

const IconButton = ({ iconName, iconType, iconColor }) => (
  <TouchableOpacity style={styles.container}>
    <View style={styles.iconContainer}>
      <Icon name={iconName} type={iconType} style={[styles.icon, { color: iconColor }]} />
    </View>
    <View style={styles.textContainer}>
      <Text>某個功能</Text>
    </View>
  </TouchableOpacity>
);

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  iconColor: PropTypes.string,
};

IconButton.defaultProps = {
  iconType: 'Ionicons',
  iconColor: 'black',
};

export default IconButton;
