import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import CarouselEntry, { sliderWidth, itemWidth } from './CarouselEntry';
import IconButton from './IconButton';
import Colors from '../../constants/colors';

import {
  IS_IOS,
  viewportWidth,
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundBlack,
  },
  adsContainer: {
    flex: 1,
    marginTop: viewportHeightPercent(5),
  },
  shortcutsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    
  },
  shortcutsCard: {
    height: viewportHeightPercent(28),
    flexDirection: 'column',
    marginTop: viewportHeightPercent(5),
    backgroundColor: Colors.backgroundGray,
  },
  shortcutsCardRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  slider: {
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 0, // for custom animation
  },
  paginationContainer: {
    marginTop: -30,
    paddingVertical: 1,
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
      <View style={styles.container}>
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
            // inactiveSlideShift={20}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
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
            containerStyle={styles.paginationContainer}
            dotColor={'rgba(255, 255, 255, 0.92)'}
            dotStyle={styles.paginationDot}
            inactiveDotColor={'white'}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={this._slider1Ref}
            tappableDots={!!this._slider1Ref}
          />
        </View>
        <View style={styles.shortcutsContainer}>
          <View style={styles.shortcutsCard}>
            <View style={styles.shortcutsCardRow}>
              <IconButton iconName="musical-notes" iconColor={Colors.labelGold} />
              <IconButton iconName="cloud" iconType="MaterialIcons" iconColor={Colors.labelGold} />
              <IconButton iconName="mail" iconColor={Colors.labelGold} />
              <IconButton iconName="cards-spade" iconType="MaterialCommunityIcons" iconColor={Colors.labelGold} />
            </View>
            <View style={styles.shortcutsCardRow}>
              <IconButton iconName="musical-notes" iconColor={Colors.labelGold} />
              <IconButton iconName="cloud" iconType="MaterialIcons" iconColor={Colors.labelGold} />
              <IconButton iconName="mail" iconColor={Colors.labelGold} />
              <IconButton iconName="cards-spade" iconType="MaterialCommunityIcons" iconColor={Colors.labelGold} />
            </View>
              
          </View>
        </View>
      </View>
    );
  }
}

export default StoreHome;
