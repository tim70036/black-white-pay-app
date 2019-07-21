import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../lib/util';
import Colors from './colors';

export default {

  navbarProps: {
    hideNavBar: true,
    // panHandlers: null, // IOS drag down from top bug
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

  modalSelectorProps: {
    optionContainerStyle: {
      backgroundColor: '#CCCCCC',
      borderRadius: 10,
    },
    optionTextStyle: {
      fontSize: viewportHeightPercent(2),
    },
    cancelStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: viewportWidthPercent(90),
      height: viewportHeightPercent(5),
      borderRadius: 10,
      backgroundColor: '#CCCCCC',
    },
    cancelTextStyle: {
      color: Colors.labelLightRed,
      fontSize: viewportHeightPercent(2),
    },
    touchableActiveOpacity: 0.7,
  },
};
