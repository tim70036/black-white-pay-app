import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, ImageBackground  } from 'react-native';
import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';

import Colors from '../../constants/colors';
import NavBar from '../NavBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: Colors.cardGray,
  // },

  logo: {
    alignItems: 'center',
  },
  logoImage: {
    height: viewportHeightPercent(25),
    width: viewportHeightPercent(25),
    resizeMode: 'contain',
  },
  textContainer: {
    marginHorizontal: viewportWidthPercent(6),
    marginVertical: viewportHeightPercent(2),
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.labelWhite,
    lineHeight: 30,
  },
});

const About = () => {
  return (
    <ImageBackground source={require('../../../img/background/background2.png')} style={styles.container}>
      <NavBar back />
      <View style={styles.logo}>
        <Image source={require('../../../img/logo.png')} style={styles.logoImage} />
      </View>
      <ScrollView style={styles.textContainer}>
        <View style={{ height: 15 }} />
        <Text style={styles.title}>
          {'黑白Pay 是一個結合實體店家與虛擬幣支付的會員系統，\
結合最流行的虛擬貨幣與電子錢包，讓使用者只要下載APP就能夠在任何地點查詢虛擬帳戶餘額，\
使用轉帳等等功能...'}
        </Text>
        <View style={{ height: 15 }} />
        <Text style={styles.title}>
          {'任何老闆可以創建並發行自己的虛擬貨幣，還可以決定是否與其他虛擬貨幣進行流通。\
我們誠摯的歡迎各個行業的老闆來創建自己的虛擬貨幣，對產業鏈做垂直抑或是水平的整合。\
您不用另外開發一款專屬於自己的APP，透過黑白Pay即可立刻推廣自己的貨幣聯盟!'}
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default About;
