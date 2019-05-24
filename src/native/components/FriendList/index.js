import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';

import NavBar from '../NavBar';
import ImageButton from './ImageButton';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  cardContainer: {
    flex: 34,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(2),

    // borderWidth: 2,
    // borderColor: 'red',
  },

  friendContainer: {
    flex: 66,

    // borderWidth: 2,
    // borderColor: 'red',
  },

  card: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: viewportWidthPercent(5),
    paddingVertical: viewportHeightPercent(1),

    backgroundColor: Colors.gray,
    borderRadius: 16,
  },

});

const shortCutData = [
  { text: '新增好友', onPress: null, textColor: Colors.white, image: require('../../../img/icon/addPerson.png') },
  { text: '好友邀請', onPress: null, textColor: Colors.white, image: require('../../../img/icon/addNote.png') },
  { text: '我的QR', onPress: null, textColor: Colors.white, image: require('../../../img/icon/qrCode.png') },
];

const FriendList = () => {
  const _renderSeparator = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ height: 1, width: '100%', backgroundColor: '#3d3937' }} />
    </View>
  );

  const _renderItem = ({ item }) => (
    <ImageButton text={item.text} textColor={item.textColor} image={item.image} onPress={item.onPress} />
  );

  return (
    <ImageBackground style={styles.container} source={require('../../../img/background/background2.png')}>
      <NavBar title="好友列表" />
      <View style={styles.cardContainer}>
        <FlatList
          contentContainerStyle={styles.card}
          data={shortCutData}
          ItemSeparatorComponent={_renderSeparator}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.friendContainer}>

      </View>
    </ImageBackground>
  );
};

FriendList.propTypes = {
};

FriendList.defaultProps = {
};

export default FriendList;
