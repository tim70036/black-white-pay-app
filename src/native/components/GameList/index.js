import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';
import NavBar from '../NavBar';
import CarouselEntry, { slideHeight, sliderWidth, itemWidth } from '../CarouselEntry';
import TakeInModal from './TakeInModal';

import {
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
  gameCardContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    marginBottom: viewportHeightPercent(1.5),
    // height: viewportHeightPercent(18),
    width: '50%',
  },
  gameCard: {
    // flex: 1,
    height: viewportHeightPercent(23),
    width: viewportWidthPercent(43),
    borderRadius: 5,
    // resizeMode: 'contain',
    marginHorizontal: viewportWidthPercent(2),
    marginVertical: viewportHeightPercent(1.5),
    resizeMode: 'contain',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  gameCardContent: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
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

class GameList extends Component {
  static propTypes = {
    userTakeIn: PropTypes.func.isRequired,
    getWalletsList: PropTypes.func.isRequired,
    updateUserCurWallet: PropTypes.func.isRequired,
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
      sessionId: PropTypes.string,
    }).isRequired,

    store: PropTypes.shape({
      storeId: PropTypes.number,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      comment: PropTypes.string,
    }).isRequired,

    wallets: PropTypes.arrayOf(
      PropTypes.shape({
        storeId: PropTypes.number,
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
        storeName: PropTypes.string,
        exchangeRate: PropTypes.number,
        currencySrc: PropTypes.string,
      }),
    ).isRequired,

    curWallet: PropTypes.shape({
      currencyName: PropTypes.string,
      availBalance: PropTypes.number,
      currencySrc: PropTypes.string,
    }).isRequired,

    gameList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        code: PropTypes.string,
        provider: PropTypes.string,
        imageSrc: PropTypes.string,
      }),
    ),

    gameListLeft: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        code: PropTypes.string,
        provider: PropTypes.string,
        imageSrc: PropTypes.string,
      }),
    ),

    gameListRight: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        code: PropTypes.string,
        provider: PropTypes.string,
        imageSrc: PropTypes.string,
      }),
    ),
  };

  static defaultProps = {
    carouselData: [],
    gameList: [],
    gameListLeft: [],
    gameListRight: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      curEntryIndex: 1,
      showLength: 4,
      selectedGameIdx: -1,
    };
  }

  _isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => layoutMeasurement.height + contentOffset.y >= contentSize.height - 20

  _renderCarouselItem = ({ item, index }, parallaxProps) => (
    <CarouselEntry
      data={item}
      even={(index + 1) % 2 === 0}
    />
  )

  _handleGameWalletList = async () => {
    Actions.gameWalletList();
  }

  _dismissModal = () => {
    this.setState({ visibleModal: false });
  }

  render = () => {
    const { curEntryIndex, showLength, visibleModal, selectedGameIdx } = this.state;
    const { user, carouselData, store, curWallet, gameListLeft, gameListRight, userTakeIn, getWalletsList, updateUserCurWallet, gameList } = this.props;
    const gameListLeftPartial = gameListLeft.slice(0, showLength);
    const gameListRightPartial = gameListRight.slice(0, showLength);
    const uri = curWallet.currencySrc !== '' ? ({ uri: curWallet.currencySrc }) : (require('../../../img/storeCurrency.png'));
    return (
      <View style={styles.container}>
        <NavBar title="遊戲列表" back />
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
                  <Text style={{ ...styles.text, fontSize: 13 }}>{curWallet.currencyName}</Text>
                </View>
                <View style={styles.infoAmount}>
                  <View style={styles.infoDollars}>
                    <Text style={{ ...styles.text, fontWeight: 'bold', fontSize: 13, color: '#FFD43D' }}>
                      {curWallet.availBalance}
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
              <TouchableOpacity style={{...styles.buttonContent }}>
                <Image style={styles.icon} source={require('../../../img/storeHome/list.png')} />
                <View style={{ width: 10 }} />
                <Text style={{ ...styles.text, fontSize: 13, color: '#332954' }}>全部回收</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (this._isCloseToBottom(nativeEvent)) {
                this.setState({ showLength: showLength + 3 });
              }
            }}
          >
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
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <View style={styles.gameCardContainer}>
                {
                  gameListLeftPartial.map((item, idx) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.setState({ selectedGameIdx: item.id, visibleModal: true })}
                        key={item.id}
                      >
                        <ImageBackground style={styles.gameCard} imageStyle={{ borderRadius: 15 }} source={{ uri: item.imageSrc }} />
                      </TouchableOpacity>
                    );
                  })
                }
              </View>
              <View style={styles.gameCardContainer}>
                {
                  gameListRightPartial.map((item, idx) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.setState({ selectedGameIdx: item.id, visibleModal: true })}
                        key={item.id}
                      >
                        <ImageBackground style={styles.gameCard} imageStyle={{ borderRadius: 15 }} source={{ uri: item.imageSrc }} />
                      </TouchableOpacity>
                    );
                  })
                }
              </View>
            </View>
          </ScrollView>
          <TakeInModal
            userTakeIn={userTakeIn}
            getWalletsList={getWalletsList}
            updateUserCurWallet={updateUserCurWallet}
            dismissModal={this._dismissModal}
            visibleModal={visibleModal}
            gameList={gameList}
            curWallet={curWallet}
            selectedGameIdx={selectedGameIdx}
          />
        </View>
      </View>
    );
  }
}

export default GameList;
