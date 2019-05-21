import {
  View, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import ImageButton from './ImageButton';
import { STATUSBAR_HEIGHT, IS_IOS, IS_ANDROID, viewportWidthPercent, viewportHeightPercent } from '../lib/util';

const tabbarHeight = 65 + viewportHeightPercent(1);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: tabbarHeight,
    backgroundColor: 'rgba(39, 38, 38, 0.9)', // rgba () may be better?
  },
  sideContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    

    // test
    // borderWidth: 2,
    // borderColor: 'blue',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',

    height: tabbarHeight * 2,
    marginTop: tabbarHeight * -1,
    paddingTop: tabbarHeight * 0.9,

    // borderWidth: 2,
    // borderColor: 'yellow',
  },

  image: {

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor: 'rgba(38, 39, 39, 0.1)', // rgba () may be better?
    // // test
    // borderWidth: 2,
    // borderColor: 'red',
  }

});

class TabBar extends Component {

  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.sideContainer, {justifyContent: 'flex-end'} ]}>
          <ImageButton text="首頁" onPress={() => (Actions.home())} image={require('../../img/tabbar/home-focus.png')}/>
          <ImageButton text="商店" onPress={() => (Actions.storeList())} image={require('../../img/tabbar/store-unfocus.png')}/>
        </View>
        <View style={styles.centerContainer}>
            {/* <TouchableOpacity style={styles.image} >
                <Image source={require('../../img/tabbar/wallet3.png')} />
            </TouchableOpacity> */}
            <ImageButton text="" onPress={() => (Actions.walletList())} image={require('../../img/tabbar/wallet3.png')}/>
        </View>
        <View style={[styles.sideContainer, {justifyContent: 'flex-start'} ]}>
          <ImageButton text="朋友" onPress={() => (Actions.notifyList())} image={require('../../img/tabbar/friend-unfocus.png')}/>
          <ImageButton text="我的" onPress={() => (Actions.mine())} image={require('../../img/tabbar/person-unfocus.png')}/>
        </View>
      </View>
    );
  }
};


export default TabBar;
