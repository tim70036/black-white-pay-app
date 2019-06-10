import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../lib/util';
import Colors from './colors';

export default {

  navbarProps: {
    hideNavBar: true,
    panHandlers: null, // IOS drag down from top bug
  },

  tabProps: {
    headerLayoutPreset: 'center', // Android title center
    backToInitial: true, // Back to initial screen on focused tab if tab icon was tapped.
    swipeEnabled: true,
    type: 'push',
  },

  icons: {
    style: {
      textAlign: 'center',
      // height: 30,
      fontSize: 20,
      // width: 30,
      color: Colors.barText,
    },
  },
};
