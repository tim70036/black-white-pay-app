import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';

import NavBar from '../NavBar';
import CarouselEntry, { sliderWidth, itemWidth } from '../CarouselEntry';
import IconButton from './IconButton';
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
    flex: 35,
    marginTop: viewportHeightPercent(5),
  },
  shortcutsContainer: {
    flex: 65,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: viewportHeightPercent(10),
  },
  shortcutsCard: {

    ...shadowStyle,

    height: viewportHeightPercent(30),
    width: viewportWidthPercent(94),
    flexDirection: 'column',
    backgroundColor: Colors.backgroundGray,
    borderRadius: 8,
  },
  shortcutsCardRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  slider: {
    height: viewportHeightPercent(25),
    overflow: 'visible', // for custom animations
  },
  paginationContainer: {
    marginTop: -1 * viewportHeightPercent(3),
  },
  sliderContentContainer: {
    paddingVertical: 0, // for custom animation
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    borderColor: 'white',
    borderWidth: 5,
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
        <NavBar title="首頁" back notification />
        <View style={styles.adsContainer}>
          <View style={styles.slider}>
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
              // inactiveSlideShift={20}
              // containerCustomStyle={styles.slider}
              // contentContainerCustomStyle={styles.sliderContentContainer}
              loop
              loopClonesPerSide={2}
              autoplay
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => { this.setState({ curEntryIndex: index }); }}
            />
          </View>
          <View style={styles.paginationContainer}>
            <Pagination
              dotsLength={carouselData.length}
              activeDotIndex={curEntryIndex}
              // containerStyle={styles.paginationContainer}
              dotColor={'rgba(255, 255, 255, 0.92)'}
              dotStyle={styles.paginationDot}
              inactiveDotColor={'white'}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this._slider1Ref}
              tappableDots={!!this._slider1Ref}
            />
          </View>
          
        </View>
        <View style={styles.shortcutsContainer}>
          <View style={styles.shortcutsCard}>
            <View style={styles.shortcutsCardRow}>
              <IconButton iconText="活動" iconColor="#D79D44" iconName="megaphone" iconType="Foundation" />
              <IconButton onPress={() => (Actions.qrScanner())} iconColor="#D79D44" iconText="掃描" iconName="qrcode-scan" iconType="MaterialCommunityIcons" />
              <IconButton onPress={() => (Actions.qrCodePay())} iconColor="#D79D44" iconText="付款" iconName="qrcode" iconType="AntDesign" />
              <IconButton iconText="收款" iconColor="#D79D44" iconName="download" iconType="AntDesign" />
            </View>
            <View style={styles.shortcutsCardRow}>
              <IconButton iconText="關於我們" iconColor="#D79D44" iconName="info-with-circle" iconType="Entypo" />
              <IconButton iconText="合作商家" iconColor="#D79D44" iconName="store" iconType="MaterialCommunityIcons" />
              <IconButton iconText="捐錢啦" iconColor="#D79D44" iconName="heart-half-full" iconType="MaterialCommunityIcons" />
              <IconButton onPress={this._userLogout} iconColor="#D79D44" iconText="登出" iconName="logout" iconType="MaterialCommunityIcons" />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Home;
