import {
  Dimensions,
  Platform,
} from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const IS_ANDROID = Platform.OS === 'android';

const {
  width: viewportWidth,
  height: viewportHeight,
} = Dimensions.get('window');

const viewportWidthPercent = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const viewportHeightPercent = (percentage) => {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
};

export {
  IS_IOS,
  IS_ANDROID,
  viewportWidth,
  viewportHeight,
  viewportWidthPercent,
  viewportHeightPercent,
};
