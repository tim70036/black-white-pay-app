
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../lib/util';
import Colors from './colors';

export default {

  navbarProps: {
    headerLayoutPreset: 'center', // Android title center
    hideNavBar: true,
    navigationBarStyle: {
      backgroundColor: 'rgba(255,255,255,0)',
      height: 55,
      // elevation: 0, // For IOS bug
      borderBottomWidth: 0, // For IOS bug
    },
    titleStyle: {
      color: Colors.barText,
      alignSelf: 'center',
      marginTop: -30, // Fuck RNRF navbar transparent
      textAlign: 'center',
      letterSpacing: 2,
      fontSize: 18,
    },
    backButtonTintColor: Colors.barText,
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
