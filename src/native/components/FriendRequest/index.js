import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import NavBar from '../NavBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scene: {
    flex: 1,

    // test
    borderWidth: 1,
    borderColor: 'red',
  },
  tabBarIndicator: {
    backgroundColor: 'white',
  },
  tarBarLabel: {
    fontSize: 17,
  },
  tabBar: {
    backgroundColor: 'rgba(0,0,0,0)',

    // test
    borderWidth: 1,
    borderColor: 'blue',
  }
});

const FirstRoute = () => (
  <View style={styles.scene} />
);
const SecondRoute = () => (
  <View style={styles.scene} />
);


class FriendRequest extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: '待通過' },
      { key: 'second', title: '已送出' },
    ],
  };

  _renderTabBar= props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBarIndicator}
      labelStyle={styles.tarBarLabel}
      style={styles.tabBar}
    />
  );

  render = () => (
    <ImageBackground style={styles.container} source={require('../../../img/background/background2.png')}>
      <NavBar title="好友邀請" back />
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    </ImageBackground>
  );
}


export default FriendRequest;
