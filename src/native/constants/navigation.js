
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../lib/util';
import Colors from './colors';

export default {
  navbarProps: {
    headerLayoutPreset: 'center', // Android title center
    navigationBarStyle: {
      backgroundColor: Colors.barBackground,
      height: 55,
    },
    titleStyle: {
      color: Colors.labelGold,
      alignSelf: 'center',
      textAlign: 'center',
      letterSpacing: 2,
      fontSize: 20,
    },
    backButtonTintColor: Colors.labelGold,
  },

  tabProps: {
    headerLayoutPreset: 'center', // Android title center
    swipeEnabled: true,
    type: 'push',
    showLabel: true,
    activeBackgroundColor: Colors.barBackgroundFocus,
    activeTintColor: Colors.labelGold,
    // Override the tabbar styles
    tabBarStyle: {
      borderColor: 'red',
      height: 65,
      backgroundColor: Colors.barBackground,
    },
    // Override the style for an individual tab of the tabbar
    tabStyle: {
    },
    // Overrides the styles for the tab label
    labelStyle: {
      marginBottom: 5,
    },
  },

  icons: {
    style: {
      textAlign: 'center',
      height: 30,
      fontSize: 29,
      width: 30,
      color: Colors.labelGray,
    },
  },
};
