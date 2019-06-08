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

// Fixed aspect ratio 0.4 * 1
export const slideWidth = viewportWidthPercent(90);
export const slideHeight = slideWidth * 0.4;

const itemHorizontalMargin = viewportWidthPercent(5);
const entryBorderRadius = 4;

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
    // borderWidth: 1,
    // borderColor: 'yellow',
  },
  imageContainer: {
    flex: 1,
    width: slideWidth,
    height: slideHeight,

    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  imageContainerEven: {
    backgroundColor: '#1a1917',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    // borderWidth: 1,
    // borderColor: 'blue',
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
    parallax: false,
  }

  _rednerImage = () => {
    const {
      data: { image },
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: image }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={{ uri: image }}
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
        // onPress={() => { alert(`You've clicked '${title}'`); }}
      >
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          { this._rednerImage() }
        </View>
      </TouchableOpacity>
    );
  }
}

export default CarouselEntry;
