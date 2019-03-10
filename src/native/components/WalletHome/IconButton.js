import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';


// Sizing based on the viewport
const buttonWidth = viewportWidthPercent(20);
const buttonHeight = viewportHeightPercent(10);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    width: buttonWidth,
    height: buttonHeight,
  },
  iconContainer: {
    flex: 3,
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

  image: {
    width: '100%',
    height: '90%',
    padding: 5,
  },

  text: {
    textAlign: 'center',
    fontSize: 10,
  },
});

const IconButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require('../../../images/app-icon.png')}
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.text}>{title}</Text>
    </View>
  </TouchableOpacity>
);

IconButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

IconButton.defaultProps = {
};

export default IconButton;
