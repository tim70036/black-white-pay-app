import React from 'react';
import { Image, StyleSheet, FlatList, View, ImageBackground, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import NavBar from '../NavBar';
import ShortcutButton from './ShortcutButton';
import Colors from '../../constants/colors';
import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';

const thumbnailSize = viewportHeightPercent(12);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  profileContainer: {
    flex: 37,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  shortcutContainer: {
    flex: 63,
    flexDirection: 'column',
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

  nameText: {
    color: Colors.labelWhite,
    fontSize: 24,
    marginTop: 20,
  },
});

const FriendDetail = ({ userData, onAddFriend, onDeleteFriend }) => {
  const _handleAddFriend = async () => {
    await onAddFriend();
  };

  const _handleDeleteFriend = async () => {
    await onDeleteFriend();
  };

  const _handleTransfer = () => {
    Actions.transfer({ defaultAccount: userData.account });
  };

  return (
    <ImageBackground style={styles.container} source={require('../../../img/background/background2.png')}>
      <ImageBackground style={styles.profileContainer} imageStyle={{ resizeMode: 'stretch' }} source={require('../../../img/friendDetail/profileBackground.png')}>
        <NavBar back />
        <Image style={styles.image} source={{ uri: userData.thumbnail }} />
        <Text style={styles.nameText}>{userData.name}</Text>
      </ImageBackground>
      <View style={styles.shortcutContainer}>
        <ShortcutButton
          image={require('../../../img/friendDetail/transfer.png')}
          text="立即轉帳"
          textColor={Colors.labelWhite}
          onPress={_handleTransfer}
        />

        {userData.isFriend ? (
          <ShortcutButton
            image={require('../../../img/friendDetail/deleteFriend.png')}
            text="刪除好友"
            textColor={Colors.labelRed}
            onPress={_handleDeleteFriend}
          />
        ) : (
          <ShortcutButton
            image={require('../../../img/friendDetail/addFriend.png')}
            text="新增好友"
            textColor={Colors.labelWhite}
            onPress={_handleAddFriend}
          />
        )}

      </View>
    </ImageBackground>
  );
};

FriendDetail.propTypes = {
  onAddFriend: PropTypes.func.isRequired,
  onDeleteFriend: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    thumbnail: PropTypes.string,
    name: PropTypes.string,
    account: PropTypes.string,
    isFriend: PropTypes.bool,
  }).isRequired,
};

FriendDetail.defaultProps = {
};

export default FriendDetail;
