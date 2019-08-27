import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Icon } from 'native-base';
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
  icon: {
    fontSize: 25,
  },
  text: {
    color: '#717171',
  },
});

const IconButton = ({ iconName, iconType, iconColor, text, onPress }) => (
  <PreventDoubleClickTO style={styles.container} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Icon name={iconName} type={iconType} style={[styles.icon, { color: iconColor }]} />
    </View>
    <View style={styles.textContainer}>
      <Text style={{ color: iconColor }}>{text}</Text>
    </View>
  </PreventDoubleClickTO>
);

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  iconColor: PropTypes.string,
  text: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

IconButton.defaultProps = {
  iconType: 'Ionicons',
  iconColor: 'black',
  text: '',
};

export default IconButton;
