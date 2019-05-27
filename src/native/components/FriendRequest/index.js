import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, FlatList, Image, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PropTypes from 'prop-types';

import NavBar from '../NavBar';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';

const thumbnailSize = viewportHeightPercent(7);
const cardWidth = viewportWidthPercent(100);
const cardHeight = viewportHeightPercent(10);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scene: {
    flex: 1,
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
    // borderWidth: 1,
    // borderColor: 'blue',
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(5), // Same as FriendList's friendContainer

    width: cardWidth,
    height: cardHeight,
    
    backgroundColor: Colors.cardGray,

    // borderWidth: 1,
    // borderColor: 'blue',
  },
  cardItemLeft: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardItemRight: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  image: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: viewportWidthPercent(4),
    fontSize: 15,
    color: Colors.labelWhite,
  },
});

const InvitationCard = ({ thumbnail, name, account}) => (
  <View style={styles.card}>
    <View style={styles.cardItemLeft}>
      <Image style={styles.image} source={thumbnail} />
      <Text style={styles.text}>{name}</Text>
    </View>
    <View style={styles.cardItemRight}>
    </View>
  </View>
);

const RequestCard = () => (
  <View style={styles.card}>

  </View>
);

class FriendRequest extends Component {
  static propTypes = {
    carouselData: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        imgUrl: PropTypes.string,
      }),
    ),
  };

  static defaultProps = {
    carouselData: [],
  };

  state = {
    index: 0,
    routes: [
      { key: 'firstRoute', title: '待通過' },
      { key: 'secondRoute', title: '已送出' },
    ],
  };

  _renderInvitation = ({ item }) => (
    <InvitationCard thumbnail={item.thumbnail} name={item.name} account={item.account} />
  );

  _renderRequest = ({ item }) => (
    <RequestCard />
  );

  _renderTabBar= props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBarIndicator}
      labelStyle={styles.tarBarLabel}
      style={styles.tabBar}
    />
  );

  _renderScene = ({ route }) => {
    const { invitationData, requestData } = this.props;
    switch (route.key) {
      case 'firstRoute':
        return (
          <View style={styles.scene}>
            <FlatList
              data={invitationData}
              renderItem={this._renderInvitation}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
      case 'secondRoute':
        return (
          <View style={styles.scene}>
            <FlatList
              data={invitationData}
              renderItem={this._renderRequest}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
      default:
        return null;
    }
  };

  render = () => (
    <ImageBackground style={styles.container} source={require('../../../img/background/background2.png')}>
      <NavBar title="好友邀請" back />
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    </ImageBackground>
  );
}


export default FriendRequest;
