import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';

import NavBar from '../NavBar';
import CarouselEntry, { slideHeight, sliderWidth, itemWidth } from '../CarouselEntry';
import ImageButton from './ImageButton';
import Colors from '../../constants/colors';

import {
  shadowStyle,
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
    // padding

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

  _userLogout = async () => {
    const { userLogout } = this.props;

    const success = await userLogout();
    if (success) {
      Actions.reset('auth');
    }
  };

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
            dotColor={'rgba(255, 255, 255, 0.92)'}
            inactiveDotColor={'white'}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={this._slider1Ref}
            tappableDots={!!this._slider1Ref}
          />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <ImageButton text="掃描" image={require('../../../img/icon/scanner.png')} />
            <ImageButton text="付款" image={require('../../../img/icon/pay.png')} />
          </View>
          <View style={styles.cardRow}>
            <ImageButton text="轉帳" image={require('../../../img/icon/transfer.png')} />
            <ImageButton text="收款" image={require('../../../img/icon/receive.png')} />
          </View>
          <View style={styles.cardRow}>
            <ImageButton text="轉換" image={require('../../../img/icon/exchange.png')} />
            <ImageButton text="合作商家" image={require('../../../img/icon/store.png')} />
          </View>

        </View>
      </ImageBackground>
    );
  }
}

export default Home;
