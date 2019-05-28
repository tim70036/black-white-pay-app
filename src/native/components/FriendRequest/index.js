import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import PropTypes from 'prop-types';

import NavBar from '../NavBar';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';

const thumbnailSize = viewportHeightPercent(7);
const cardWidth = viewportWidthPercent(100);
const cardHeight = viewportHeightPercent(11);
const buttonWidth = viewportWidthPercent(15);
const buttonHeight = buttonWidth / 2;

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
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  image: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    marginHorizontal: viewportWidthPercent(4),
    fontSize: 15,
    color: Colors.labelWhite,
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: buttonWidth,
    height: buttonHeight,
    borderRadius: buttonHeight / 2,

    backgroundColor: '#00cfb7',
  },
  denyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: buttonWidth,
    height: buttonHeight,
    borderRadius: buttonHeight / 2,

    backgroundColor: '#ff486c',
    marginLeft: viewportWidthPercent(4), // avoid button too close to each other
  },
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: buttonWidth * 1.4, // this button is slightly wider
    height: buttonHeight,
    borderRadius: buttonHeight / 2,

    backgroundColor: '#b9a078',
  },
  buttonText: {
    fontSize: 13,
    color: Colors.labelWhite,
  },
});


const _renderInvitation = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardItemLeft}>
      <Image style={styles.image} source={item.thumbnail} />
      <Text style={styles.nameText}>{item.name}</Text>
    </View>
    <View style={styles.cardItemRight}>
      <TouchableOpacity style={styles.acceptButton}>
        <Text style={styles.buttonText}>同意</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.denyButton}>
        <Text style={styles.buttonText}>拒絕</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const _renderRequest = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardItemLeft}>
      <Image style={styles.image} source={item.thumbnail} />
      <Text style={styles.nameText}>{item.name}</Text>
    </View>
    <View style={styles.cardItemRight}>
      <TouchableOpacity style={styles.requestButton}>
        <Text style={styles.buttonText}>取消邀請</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const FirstRoute = ({ invitationData }) => (
  <View style={styles.scene}>
    <FlatList
      data={invitationData}
      renderItem={_renderInvitation}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);

const SecondRoute = ({ requestData }) => (
  <View style={styles.scene}>
    <FlatList
      data={requestData}
      renderItem={_renderRequest}
      keyExtractor={(item, index) => index.toString()}
    />
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

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'firstRoute', title: '待通過' },
        { key: 'secondRoute', title: '已送出' },
      ],
    };
  }

  _onIndexChange = (index) => {
    this.setState({ index: index });
  }

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
        return <FirstRoute invitationData={invitationData} />;
      case 'secondRoute':
        return <SecondRoute requestData={requestData} />;
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
        onIndexChange={this._onIndexChange}
      />
    </ImageBackground>
  );
}


export default FriendRequest;
