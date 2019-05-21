import React from 'react';
// import PropTypes from 'prop-types';
import { Image, StyleSheet, FlatList, View, ImageBackground } from 'react-native';
import {
  Container, Card, CardItem, Body, Text, Header,
} from 'native-base';
import PropTypes from 'prop-types';

import NavBar from '../NavBar';
import Colors from '../../constants/colors';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const thumbnailSize = 50;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  card: {
    flexDirection: 'row',
    paddingVertical: 25,
    paddingHorizontal: 20,
    // borderWidth: 2,
    // borderColor: 'red',
  },

  cardItemRight: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // borderWidth: 2,
    // borderColor: 'red',
  },

  cardItemLeft: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // borderWidth: 2,
    // borderColor: 'red',
  },

  text: {
    fontSize: 15,
    color: Colors.labelWhite,
  },

  footerText: {
    fontSize: 10,
    marginTop: 10,
    color: Colors.gold,
  },

  image: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

const Notification = ({ notificationData }) => {

  const _renderSeparator = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <View style={{ height: 1, width: '100%', backgroundColor: '#3d3937' }} />
    </View>
  );

  const _renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardItemLeft}>
        <Image
          style={styles.image}
          source={{ uri: item.thumbnail }}
        />
      </View>
      <View style={styles.cardItemRight}>
        <Text style={styles.text}>{item.content}</Text>
        <Text style={styles.footerText}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground style={styles.container} source={require('../../../img/background/background2.png')}>
      <NavBar title="通知" back />
      <FlatList
        data={notificationData}
        ItemSeparatorComponent={_renderSeparator}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </ImageBackground>
  );
};


export default Notification;
