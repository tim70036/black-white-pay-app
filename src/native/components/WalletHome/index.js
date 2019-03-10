import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Container, Content, Text, H1, H2, H3, Header, Card, CardItem, Body, Icon, View, Button, Col, Row, Grid,
} from 'native-base';

import {
  StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image,
} from 'react-native';

import IconButton from './IconButton';


const styles = StyleSheet.create({

  layoutContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  topContainer: {
    flex: 3,
  },

  bottomContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardItem: {
    flex: 1,
    flexDirection: 'row',
  },

  button: {
    flex: 1,
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topIcon: {
    flex: 1,
  },

  topText: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 40,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  image: {
    width: '100%',
    height: '50%',
  },

});


const WalletHome = () => (

  <View padder style={styles.layoutContainer}>
    <Card style={styles.topContainer}>
      <CardItem style={styles.cardItem}>
        <View style={styles.topIcon}>
          <Image
            style={styles.image}
            source={require('../../../images/app-icon.png')}
          />
        </View>
        <View style={styles.topText}>
          <Text style={styles.text}>8787</Text>
        </View>
      </CardItem>
    </Card>


    <Card style={styles.bottomContainer}>
      <View style={styles.buttonContainer}>
        <IconButton title="轉帳" onPress={() => Actions.transfer()} />
        <IconButton title="轉帳紀錄" onPress={() => Actions.transHistory()} />
      </View>

      <View style={styles.buttonContainer}>
        <IconButton title="QR Code" onPress={() => Actions.qrCode()} />
        <IconButton title="優惠券" onPress={() => Actions.coupons()} />
      </View>
    </Card>

  </View>
);

export default WalletHome;
