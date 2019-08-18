import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import NavBar from '../NavBar';
import CarouselEntry, { slideHeight, sliderWidth, itemWidth } from '../CarouselEntry';
import ImageButton from './ImageButton';

import {
  STATUSBAR_HEIGHT,
  viewportHeight,
  viewportWidth,
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.labelBlack,
  },
  adsContainer: {
    width: '100%',
    height: slideHeight,
    alignItems: 'center',
    justifyContent: 'center',
    // height decide by content

    // borderWidth: 2,
    // borderColor: 'blue',
  },

  cardContainer: {
    height: viewportHeightPercent(12),
    paddingVertical: viewportHeightPercent(12) * 0.15,
    backgroundColor: Colors.cardLightGray,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',

    paddingHorizontal: viewportWidthPercent(5), // width 90%
  },
  thumbnail: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailImage: {
    width: viewportHeightPercent(12) * 0.7,
    height: viewportHeightPercent(12) * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 8,
    flexDirection: 'column',
    paddingLeft: viewportWidthPercent(3),
  },
  infoTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: viewportWidthPercent(2),
  },
  infoTopText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoBottom: {
    flex: 1,
    height: '30%',
    borderColor: '#B9A078',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: viewportWidthPercent(2),
    // height: viewportHeightPercent(7.4),
  },
  transparentBar: {
    height: '100%',
    width: '100%',
    resizeMode: 'center',
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: viewportHeightPercent(1), // margin between row
    width: '100%',
  },
  slider: {
    height: slideHeight,
    // resizeMode: 'contain',
  },
  pagination: {
    marginTop: -50,
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  text: {
    color: Colors.labelWhite,
    fontSize: 17,
  },

  storeCurrencyImg: {
    width: 20,
    height: 23,
    resizeMode: 'contain',
    // marginRight: viewportWidthPercent(1),
  },
  infoCurrency: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: viewportWidthPercent(2),
  },
  infoAmount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoDollars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: viewportWidthPercent(2),
  },
  contentContainer: {
    flex: 7,
    marginHorizontal: viewportWidthPercent(3),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: viewportHeightPercent(1.5),
    height: viewportHeightPercent(6),
  },
  buttons: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    marginHorizontal: viewportWidthPercent(2),
  },

  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '22%',
    paddingBottom: viewportHeightPercent(1),
  },
  icon: {
    height: viewportHeightPercent(3),
    width: viewportHeightPercent(3),
    resizeMode: 'contain',
  },

  storeContainer: {
    // backgroundColor: 'red',
  },

  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(5),
    height: viewportHeightPercent(10),
    backgroundColor: Colors.cardGray,
    borderBottomWidth: 1,
    borderBottomColor: Colors.placeholderGray,
    // marginBottom: viewportWidthPercent(3),
    marginHorizontal: viewportWidthPercent(2),
  },
  listLeft: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: viewportWidthPercent(1),
  },
  listImage: {
    height: viewportHeightPercent(6),
    width: viewportHeightPercent(6),
    resizeMode: 'contain',
  },
});

class StoreHome extends Component {
  static propTypes = {
    getGameWalletsData: PropTypes.func.isRequired,
    carouselData: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
      }),
    ),
    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }).isRequired,

    store: PropTypes.shape({
      storeId: PropTypes.number,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      comment: PropTypes.string,
    }).isRequired,

    wallet: PropTypes.shape({
      currencyName: PropTypes.string,
      availBalance: PropTypes.number,
      currencySrc: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    carouselData: [],
  };

  state = {
    curEntryIndex: 1,
  }

  _renderCarouselItem = ({ item, index }, parallaxProps) => (
    <CarouselEntry
      data={item}
      even={(index + 1) % 2 === 0}
    />
  )

  _handleGameWalletList = async () => {
    const { getGameWalletsData } = this.props;
    await getGameWalletsData();
    Actions.gameWalletList();
  }

  _handleAddStore = () => {
    Actions.addStore();
  }

  render = () => {
    const { curEntryIndex } = this.state;
    const { user, carouselData, store, wallet } = this.props;
    const uri = wallet.currencySrc !== '' ? ({ uri: wallet.currencySrc }) : (require('../../../img/storeCurrency.png'));
    return (
      <View style={styles.container}>
        <NavBar title={store.name} back />
        <View style={styles.cardContainer}>
          <View style={styles.thumbnail}>
            <Image
              style={styles.thumbnailImage}
              source={{ uri: user.thumbnail }}
            />
          </View>
          <View style={styles.info}>
            <View style={styles.infoTop}>
              <View style={styles.infoTopText}>
                <Text style={styles.text}>{user.name}</Text>
                <View style={{ width: viewportWidthPercent(1) }} />
                <Text style={{ ...styles.text, fontSize: 13 }}>{store.comment}</Text>
              </View>
            </View>
            <View style={styles.infoBottom}>
              {/* <ImageBackground style={styles.transparentBar} source={require('../../../img/storeHome/bar.png')}> */}
                <View style={styles.infoCurrency}>
                  <Text style={{ ...styles.text, fontSize: 13 }}>{wallet.currencyName}</Text>
                </View>
                <View style={styles.infoAmount}>
                  <View style={styles.infoDollars}>
                    <Text style={{ ...styles.text, fontWeight: 'bold', fontSize: 13, color: '#FFD43D' }}>
                      {wallet.availBalance}
                    </Text>
                    <View style={{ width: viewportWidthPercent(1) }} />
                    <Image source={uri} style={styles.storeCurrencyImg} />
                  </View>
                </View>
              {/* </ImageBackground> */}
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.buttonContainer}>
            <ImageBackground style={styles.buttons} source={require('../../../img/storeHome/purpleButton.png')}>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={this._handleGameWalletList}
              >
                <Image style={styles.icon} source={require('../../../img/storeHome/wallet.png')} />
                <View style={{ width: 10 }} />
                <Text style={{ ...styles.text, fontSize: 13, color: '#75051C' }}>遊戲錢包</Text>
              </TouchableOpacity>
            </ImageBackground>
            <ImageBackground style={styles.buttons} source={require('../../../img/storeHome/pinkButton.png')}>
              <TouchableOpacity style={styles.buttonContent}>
                <Image style={styles.icon} source={require('../../../img/storeHome/list.png')} />
                <View style={{ width: 10 }} />
                <Text style={{ ...styles.text, fontSize: 13, color: '#332954' }}>遊戲列表</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <View style={styles.adsContainer}>
            <Carousel
              ref={(c) => { this._slider1Ref = c; }}
              data={carouselData}
              renderItem={this._renderCarouselItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              firstItem={1}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              containerCustomStyle={styles.slider}
              loop
              loopClonesPerSide={2}
              autoplay
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => { this.setState({ curEntryIndex: index }); }}
            />
            <Pagination
              dotsLength={carouselData.length}
              activeDotIndex={curEntryIndex}
              containerStyle={styles.pagination}
              dotColor="rgba(255, 255, 255, 0.92)"
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this._slider1Ref}
              tappableDots={!!this._slider1Ref}
            />
          </View>

          <View style={styles.storeContainer}>
            <View style={styles.listContainer}>
              <View style={styles.listLeft}>
                <Text style={styles.text}>文心路四段112巷2弄32號</Text>
              </View>
              <View style={styles.listRight}>
                <Image source={require('../../../img/storeHome/location.png')} style={styles.listImage} />
              </View>
            </View>
            <View style={styles.listContainer}>
              <View style={styles.listLeft}>
                <Text style={styles.text}>0970779896</Text>
              </View>
              <View style={styles.listRight}>
                <Image source={require('../../../img/storeHome/phone.png')} style={styles.listImage} />
              </View>
            </View>
            <View style={styles.listContainer}>
              <View style={styles.listLeft}>
                <Text style={styles.text}>09:00-21:00</Text>
              </View>
              <View style={styles.listRight}>
                <Image source={require('../../../img/storeHome/clock.png')} style={styles.listImage} />
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <ImageButton text="遊戲" image={require('../../../img/storeHome/game.png')} />
            <ImageButton text="優惠券" image={require('../../../img/storeHome/coupon.png')} />
          </View>
          <View style={styles.cardRow}>
            <ImageButton text="聯絡店家" image={require('../../../img/storeHome/store.png')} />
            <ImageButton text="關於" image={require('../../../img/storeHome/info.png')} />
          </View>
        </View> */}
      </View>
    );
  }
}

export default StoreHome;
