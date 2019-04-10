import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';

import {
  IS_IOS,
  viewportWidth,
  viewportWidthPercent,
  viewportHeightPercent,
} from '../lib/util';

const slideHeight = viewportHeightPercent(25); // Carousel Height (orignal: viewportHeight *  0.36)
const slideWidth = viewportWidthPercent(100);
const itemHorizontalMargin = viewportWidthPercent(1);
const entryBorderRadius = 4;

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: '#1a1917',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: '#1a1917',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    // borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderRadius: entryBorderRadius,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white',
  },
  radiusMaskEven: {
    backgroundColor: '#1a1917',
  },
});

class CarouselEntry extends Component {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      imgUrl: PropTypes.string,
    }),
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  static defaultProps ={
    data: {},
    even: false,
    parallax: true,
  }

  _rednerImage = () => {
    const {
      data: { imgUrl },
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: imgUrl }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={{ uri: imgUrl }}
        style={styles.image}
      />
    );
  }

  render = () => {
    const { data: { title, subtitle }, even } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => { alert(`You've clicked '${title}'`); }}
      >
        <View style={styles.shadow} />
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          { this._rednerImage() }
          <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default CarouselEntry;
