import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselEntry, { sliderWidth, itemWidth } from './CarouselEntry';
import IconButton from './IconButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  adsContainer: {
    flex: 2,
  },
  shortcutsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
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
            inactiveDotColor={'#1a1917'}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={this._slider1Ref}
            tappableDots={!!this._slider1Ref}
          />
        </View>
        <View style={styles.shortcutsContainer}>
          <IconButton />
          <IconButton />
          <IconButton />
          <IconButton />
        </View>
      </View>
    );
  }
}

export default StoreHome;
