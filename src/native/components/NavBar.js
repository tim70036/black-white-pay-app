import {
  View, Image, StatusBar, TouchableOpacity, Text
 } from 'react-native';
import React, { Component } from 'react';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import DefaultProps from '../constants/navigation';
import { STATUSBAR_HEIGHT, IS_IOS, IS_ANDROID, viewportWidthPercent, viewportHeightPercent } from '../lib/util';
import Colors from '../constants/colors';

const navbarHeight = 55;

const styles = {
  container: {
    flexDirection: 'row',

    marginTop: STATUSBAR_HEIGHT,
    height: navbarHeight,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  buttonContainer: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'red',
  },
  titleContainer: {
    flex: 55,
    justifyContent: 'center',
    alignItems: 'center',

    // borderWidth: 2,
    // borderColor: 'red',
  },
  title: {
    color: Colors.white,
    letterSpacing: 2,
    fontSize: 19,
  },
  icon: {
    color: Colors.white,
    fontSize: 28,
  },

};

const NavBar = ({ title, back, notification }) => (
  <View style={styles.container}>
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => (Actions.pop())}>
        {back? (<Icon name="left" type="AntDesign" style={styles.icon} />) : null}
      </TouchableOpacity>
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => (Actions.notifyList())}>
        {notification? (<Icon name="bell" type="MaterialCommunityIcons" style={styles.icon} />) : null}
      </TouchableOpacity>
    </View>
  </View>
);

NavBar.propTypes = {
  title: PropTypes.string,
  back: PropTypes.bool,
  notification: PropTypes.bool,
};

NavBar.defaultProps = {
  title: '',
  back: false,
  notification: false,
};

export default NavBar;
