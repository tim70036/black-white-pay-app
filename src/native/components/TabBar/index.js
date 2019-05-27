import {
  View, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import ImageButton from './ImageButton';
import { STATUSBAR_HEIGHT, IS_IOS, IS_ANDROID, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';

const tabbarHeight = IS_IOS ? 55 + viewportHeightPercent(3) : 45 + viewportHeightPercent(3);


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

  walletContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: tabbarHeight * -0.3,
    height: tabbarHeight,
    width: tabbarHeight,
    // borderWidth: 2,
    // borderColor: 'red',
  },

  walletImage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    height: 85,
    width: 85,

    // // test
    // borderWidth: 2,
    // borderColor: 'yellow',
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
      home: currentScene === 'home' ? Colors.labelGold : Colors.labelLightGray,
      storeList: currentScene === 'storeList' ? Colors.labelGold : Colors.labelLightGray,
      walletList: null,
      friendList: currentScene === 'friendList' ? Colors.labelGold : Colors.labelLightGray,
      mine: currentScene === 'mine' ? Colors.labelGold : Colors.labelLightGray,
    };

    return (
      <View style={styles.container}>
        <View style={[styles.sideContainer, { justifyContent: 'center' }]}>
          <ImageButton text="首頁" onPress={() => (this._changeScene('home'))} image={iconImages.home} textColor={textColors.home} />
          <ImageButton text="商店" onPress={() => (this._changeScene('storeList'))} image={iconImages.storeList} textColor={textColors.storeList} />
        </View>
        <TouchableOpacity style={styles.walletContainer} onPress={() => (this._changeScene('walletList'))}>
          <Image style={styles.walletImage} source={iconImages.walletList} />
        </TouchableOpacity>
        <View style={[styles.sideContainer, { justifyContent: 'center' }]}>
          <ImageButton text="朋友" onPress={() => (this._changeScene('friendList'))} image={iconImages.friendList} textColor={textColors.friendList} />
          <ImageButton text="我的" onPress={() => (this._changeScene('mine'))} image={iconImages.mine} textColor={textColors.mine} />
        </View>
      </View>
    );
  }
};


export default TabBar;
