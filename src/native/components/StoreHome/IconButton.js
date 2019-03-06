import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Icon } from 'native-base';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

// Sizing based on the viewport
const buttonWidth = wp(20);
const buttonHeight = viewportHeight * 0.1;

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
    fontSize: 60,
    color: '#32db64',
  },
});

const IconButton = () => (
  <TouchableOpacity style={styles.container}>
    <View style={styles.iconContainer}>
      <Icon name="navigate" style={styles.icon} />
    </View>
    <View style={styles.textContainer}>
      <Text>某個功能</Text>
    </View>
  </TouchableOpacity>
);

export default IconButton;
