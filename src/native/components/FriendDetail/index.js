import React from 'react';
import { Image, StyleSheet, FlatList, View, ImageBackground, Text } from 'react-native';
import PropTypes from 'prop-types';

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
  }
});

const FriendDetail = ({ userData, onAddFriend, onDeleteFriend}) => {

  const _handleAddFriend = async () => {
    //userData.account
  };

  const _handleDeleteFriend = async () => {

  };

  const _handleTransfer = () => {

  };

  return (
    <ImageBackground style={styles.container} source={require('../../../img/background/background2.png')}>
      <ImageBackground style={styles.profileContainer} imageStyle={{ resizeMode: 'stretch' }} source={require('../../../img/userDetail/profileBackground.png')}>
        <NavBar back />
        <Image style={styles.image} source={{ uri: userData.thumbnail }} />
        <Text style={styles.nameText}>{userData.name}</Text>
      </ImageBackground>
      <View style={styles.shortcutContainer}>
        <ShortcutButton
          image={require('../../../img/userDetail/transfer.png')}
          text="立即轉帳"
          textColor={Colors.labelWhite}
        />

        {userData.isFriend ? (
          <ShortcutButton
            image={require('../../../img/userDetail/addFriend.png')}
            text="刪除好友"
            textColor={Colors.labelWhite}
          />
        ) : (
          <ShortcutButton
            image={require('../../../img/userDetail/addFriend.png')}
            text="新增好友"
            textColor={Colors.labelWhite}
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
