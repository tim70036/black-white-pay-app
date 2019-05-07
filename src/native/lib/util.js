import {
  Dimensions,
  Platform,
  NativeModules,
} from 'react-native';
import { Constants } from 'expo';

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? Constants.statusBarHeight : StatusBarManager.HEIGHT;
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

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

const shadowOpt = {
  height: viewportHeightPercent(30),
  width: viewportWidthPercent(100),
  color: '#e38d02',
  border: 6,
  radius: 3.84,
  opacity: 0.35,
  x: 0,
  y: 0,
  style: { marginVertical: 5 },
};

export {
  IS_IOS,
  IS_ANDROID,
  STATUSBAR_HEIGHT,
  viewportWidth,
  viewportHeight,
  viewportWidthPercent,
  viewportHeightPercent,
  shadowStyle,
  shadowOpt,
};
