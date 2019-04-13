import React from 'react';
// import PropTypes from 'prop-types';
import { Image, StyleSheet, FlatList, View } from 'react-native';
import {
  Container, Card, CardItem, Body, Text, Header,
} from 'native-base';
import PropTypes from 'prop-types';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';

const thumbnailSize = 50;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  card: {
    flexDirection: 'row',
    paddingVertical: 12,
  },

  cardItemRight: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  cardItemLeft: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  text: {
    fontSize: 15,
    color: Colors.labelWhite,
  },

  footerText: {
    fontSize: 10,
    marginTop: 10,
    color: Colors.labelGray,
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
    <View style={styles.container}>
      <FlatList
        data={notificationData}
        ItemSeparatorComponent={_renderSeparator}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};


export default Notification;
