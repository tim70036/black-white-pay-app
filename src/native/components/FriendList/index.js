import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, ImageBackground, FlatList } from 'react-native';

import NavBar from '../NavBar';
import ShortcutButton from './ShortcutButton';
import FriendButton, { thumbnailSize } from './FriendButton';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';


// Short cut left padding = 2% + 5%
// Friend left padding = 5%
// To align the right arrow, make the button width == 93% - left padding
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(2),

    marginBottom: 20, // avoid friendlist too close

    // borderWidth: 2,
    // borderColor: 'red',
  },

  friendContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: viewportWidthPercent(5),

    // paddingVertical: 20,

    // borderWidth: 2,
    // borderColor: 'red',
  },

  card: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',

    paddingHorizontal: viewportWidthPercent(5),
    paddingVertical: viewportHeightPercent(1),

    backgroundColor: Colors.cardGray,
    borderRadius: 20,
  },

});

const shortCutData = [
  { text: '新增好友', onPress: null, textColor: Colors.labelWhite, image: require('../../../img/friendList/addPerson.png') },
  { text: '好友邀請', onPress: () => (Actions.friendRequest()), textColor: Colors.labelWhite, image: require('../../../img/friendList/addNote.png') },
  { text: '我的QR', onPress: null, textColor: Colors.labelWhite, image: require('../../../img/friendList/qrCode.png') },
];

const FriendList = ({ friendData }) => {
  const _renderShortcutSeparator = () => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ height: 1, width: '100%', backgroundColor: '#3d3937' }} />
    </View>
  );

  const _renderFriendSeparator = () => (
    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingLeft: thumbnailSize }}>
      <View style={{ height: 1, width: '100%', backgroundColor: '#3d3937' }} />
    </View>
  );

  const _renderShortcut = ({ item }) => (
    <ShortcutButton
      text={item.text}
      textColor={item.textColor}
      image={item.image}
      onPress={item.onPress}
    />
  );

  const _renderFriend = ({ item }) => {
    const userData = { ...item, isFriend: true };
    return (
      <FriendButton
        text={item.name}
        textColor={Colors.labelWhite}
        image={item.thumbnail}
        onPress={() => (Actions.userDetail({ userData: userData }))}
      />
    );
  }

  return (
    <ImageBackground style={styles.container} source={require('../../../img/background/background2.png')}>
      <NavBar title="好友列表" />
      <View style={styles.cardContainer}>
        <FlatList
          contentContainerStyle={styles.card}
          data={shortCutData}
          ItemSeparatorComponent={_renderShortcutSeparator}
          renderItem={_renderShortcut}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.friendContainer}>
        <FlatList
          data={friendData}
          ItemSeparatorComponent={_renderFriendSeparator}
          renderItem={_renderFriend}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
};

FriendList.propTypes = {
  friendData: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail: PropTypes.number,
      name: PropTypes.string,
      account: PropTypes.string,
    }),
  ),
};

FriendList.defaultProps = {
  friendData: [],
};

export default FriendList;
