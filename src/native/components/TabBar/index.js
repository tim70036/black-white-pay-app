import {
  View, StyleSheet,
} from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import ImageButton from './ImageButton';
import { STATUSBAR_HEIGHT, IS_IOS, IS_ANDROID, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';

const tabbarHeight = 65 + viewportHeightPercent(1);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: tabbarHeight,
    backgroundColor: 'rgba(39, 38, 38, 0.9)',
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

    // // test
    // borderWidth: 2,
    // borderColor: 'red',
  },
});

class TabBar extends Component {

  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      // Should be the same as scene name
      currentScene: 'home',
    };
  }

  _changeScene = (sceneKey) => {
    Actions[sceneKey]();
    this.setState({
      currentScene: sceneKey,
    });
  }

  render() {
    const { currentScene } = this.state;

    const iconImages = {
      home: currentScene === 'home' ? require('../../../img/tabbar/home-focus.png') : require('../../../img/tabbar/home-unfocus.png'),
      storeList: currentScene === 'storeList' ? require('../../../img/tabbar/store-focus.png') : require('../../../img/tabbar/store-unfocus.png'),
      walletList: require('../../../img/tabbar/wallet.png'),
      friendList: currentScene === 'friendList' ? require('../../../img/tabbar/friend-focus.png') : require('../../../img/tabbar/friend-unfocus.png'),
      mine: currentScene === 'mine' ? require('../../../img/tabbar/person-focus.png') : require('../../../img/tabbar/person-unfocus.png'),
    };

    const textColors = {
      home: currentScene === 'home' ? Colors.gold : Colors.lightGray,
      storeList: currentScene === 'storeList' ? Colors.gold : Colors.lightGray,
      walletList: null,
      friendList: currentScene === 'friendList' ? Colors.gold : Colors.lightGray,
      mine: currentScene === 'mine' ? Colors.gold : Colors.lightGray,
    };

    return (
      <View style={styles.container}>
        <View style={[styles.sideContainer, { justifyContent: 'flex-end' }]}>
          <ImageButton text="首頁" onPress={() => (this._changeScene('home'))} image={iconImages.home} textColor={textColors.home} />
          <ImageButton text="商店" onPress={() => (this._changeScene('storeList'))} image={iconImages.storeList} textColor={textColors.storeList} />
        </View>
        <View style={styles.centerContainer}>
          <ImageButton text="" onPress={() => (this._changeScene('walletList'))} image={iconImages.walletList} textColor={textColors.walletList} />
        </View>
        <View style={[styles.sideContainer, { justifyContent: 'flex-start' }]}>
          <ImageButton text="朋友" onPress={() => (this._changeScene('friendList'))} image={iconImages.friendList} textColor={textColors.friendList} />
          <ImageButton text="我的" onPress={() => (this._changeScene('mine'))} image={iconImages.mine} textColor={textColors.mine} />
        </View>
      </View>
    );
  }
};


export default TabBar;
