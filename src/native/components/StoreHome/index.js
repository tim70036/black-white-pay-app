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
    width: '100%',
    // height decide by content

    // borderWidth: 2,
    // borderColor: 'blue',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: viewportWidthPercent(5), // width 90%
    paddingBottom: viewportHeightPercent(10), // avoid too close to tab bar

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
    marginTop: -30,
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
});

class StoreHome extends Component {
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

  _renderCarouselItem = ({ item, index }, parallaxProps) => (
    <CarouselEntry
      data={item}
      even={(index + 1) % 2 === 0}
    />
  )

  render = () => {
    const { curEntryIndex } = this.state;
    const { carouselData } = this.props;

    return (
      <ImageBackground style={styles.container} source={require('../../../img/background/background2.png')}>
        <NavBar title="商店" back />
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
        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <ImageButton text="遊戲" image={require('../../../img/storeHome/game.png')} />
            <ImageButton text="優惠券" image={require('../../../img/storeHome/coupon.png')} />
          </View>
          <View style={styles.cardRow}>
            <ImageButton text="聯絡店家" image={require('../../../img/storeHome/store.png')} />
            <ImageButton text="關於" image={require('../../../img/storeHome/info.png')} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default StoreHome;
