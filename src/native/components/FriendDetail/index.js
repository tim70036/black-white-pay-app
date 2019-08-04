import React, { Component } from 'react';
import { Image, StyleSheet, FlatList, View, ImageBackground, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import NavBar from '../NavBar';
import ConfirmModal from '../ConfirmModal';
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

class FriendDetail extends Component {
  static propTypes = {
    onAddFriend: PropTypes.func.isRequired,
    onDeleteFriend: PropTypes.func.isRequired,
    userData: PropTypes.shape({
      thumbnail: PropTypes.string,
      name: PropTypes.string,
      account: PropTypes.string,
      isFriend: PropTypes.bool,
    }).isRequired,
  }
  
  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
    };
  }

  _handleTransfer = () => {
    const { userData } = this.props;
    Actions.transfer({ defaultAccount: userData.account });
  };

  _handleAddFriend = async () => {
    const { onAddFriend } = this.props;
    await onAddFriend();
  };

  _handleDeleteFriend = async () => {
    this.setState({visibleModal: true});
  };

  _confirmDeleteFriend = async () => {
    const { onDeleteFriend } = this.props;
    await onDeleteFriend();
    this.setState({ visibleModal: false });
  };

  _cancelDeleteFriend = async () => {
    this.setState({ visibleModal: false });
  };

  render= () => {
    const { userData } = this.props;
    const { visibleModal } = this.state;

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
            onPress={this._handleTransfer}
          />

          {userData.isFriend ? (
            <ShortcutButton
              image={require('../../../img/friendDetail/deleteFriend.png')}
              text="刪除好友"
              textColor={Colors.labelRed}
              onPress={this._handleDeleteFriend}
            />
          ) : (
            <ShortcutButton
              image={require('../../../img/friendDetail/addFriend.png')}
              text="新增好友"
              textColor={Colors.labelWhite}
              onPress={this._handleAddFriend}
            />
          )}

        </View>
        <ConfirmModal
          confirmAction={this._confirmDeleteFriend}
          cancelAction={this._cancelDeleteFriend}
          context="確認刪除此好友嗎?"
          visibleModal={visibleModal}
        />
      </ImageBackground>
    );
  };
}

export default FriendDetail;
