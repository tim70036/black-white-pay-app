
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../lib/util';
import Colors from './colors';

export default {
  navbarProps: {
    headerLayoutPreset: 'center', // Android title center
    navigationBarStyle: {
      backgroundColor: Colors.barBackground,
      height: 55,
      // elevation: 0, // For IOS bug
      borderBottomWidth: 0, // For IOS bug
    },
    titleStyle: {
      color: Colors.barText,
      alignSelf: 'center',
      textAlign: 'center',
      letterSpacing: 2,
      fontSize: 20,
    },
    backButtonTintColor: Colors.barText,
  },

  tabProps: {
    headerLayoutPreset: 'center', // Android title center
    backToInitial: true, // Back to initial screen on focused tab if tab icon was tapped.
    swipeEnabled: true,
    type: 'push',
    showLabel: true,
    activeBackgroundColor: Colors.barBackgroundFocus,
    activeTintColor: Colors.barText,
    // Override the tabbar styles
    tabBarStyle: {

      height: 65,
      backgroundColor: Colors.barBackground,

      
    },
    // Override the style for an individual tab of the tabbar
    tabStyle: {
    },
    // Overrides the styles for the tab label
    labelStyle: {
      marginBottom: 5,
      color: Colors.barText,
    },
  },

  icons: {
    style: {
      textAlign: 'center',
      height: 30,
      fontSize: 29,
      width: 30,
      color: Colors.barText,
    },
  },
};
