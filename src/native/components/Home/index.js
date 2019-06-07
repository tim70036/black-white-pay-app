import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';

import NavBar from '../NavBar';
import CarouselEntry, { slideHeight, sliderWidth, itemWidth } from '../CarouselEntry';
import ImageButton from './ImageButton';

import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  adsContainer: {
    flex: 25,
    resizeMode: 'contain',
    // borderWidth: 2,
    // borderColor: 'blue',
  },
  cardContainer: {
    flex: 75,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: viewportWidthPercent(5), // width 90%
    paddingBottom: viewportHeightPercent(2), // avoid too close to tab bar

    // borderWidth: 2,
    // borderColor: 'blue',
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: viewportHeightPercent(1), // margin between row
    width: '100%',
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  slider: {
    height: slideHeight,
  },
  pagination: {
    marginTop: -50,
  },
});

class Home extends Component {
  static propTypes = {
    carouselData: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        imgUrl: PropTypes.string,
      }),
    ),
  };

  static defaultProps = {
    carouselData: [],
  };

  state = {
    curEntryIndex: 1,
  }

  _renderItemWithParallax = ({ item, index }, parallaxProps) => (
    <CarouselEntry
      data={item}
      even={(index + 1) % 2 === 0}
      parallax
      parallaxProps={parallaxProps}
    />
  )

  render = () => {
    const { curEntryIndex } = this.state;
    const { carouselData } = this.props;

    return (
      <ImageBackground style={styles.container} source={require('../../../img/background/background1.png')}>
        <NavBar title="首頁" notification />
        <View style={styles.adsContainer}>
          <Carousel
            ref={(c) => { this._slider1Ref = c; }}
            data={carouselData}
            renderItem={this._renderItemWithParallax}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages
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
        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <ImageButton text="掃描" onPress={() => (Actions.qrScanner())} image={require('../../../img/home/scanner.png')} />
            <ImageButton text="付款" onPress={() => (Actions.qrCodePay())} image={require('../../../img/home/pay.png')} />
          </View>
          <View style={styles.cardRow}>
            <ImageButton text="轉帳" onPress={() => (Actions.transfer())} image={require('../../../img/home/transfer.png')} />
            <ImageButton text="收款" onPress={() => (Actions.qrCodeReceive())} image={require('../../../img/home/receive.png')} />
          </View>
          <View style={styles.cardRow}>
            <ImageButton text="兌換" onPress={() => (Actions.exchange())} image={require('../../../img/home/exchange.png')} />
            <ImageButton text="合作商家" onPress={null} image={require('../../../img/home/store.png')} />
          </View>

        </View>
      </ImageBackground>
    );
  }
}

export default Home;
