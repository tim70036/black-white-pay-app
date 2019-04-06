
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../lib/util';

const Colors = {
  barLabelWhite: '#dddddd',
  barLabelGold: '#aa8048',
  barBackground: '#262727',
};

export default {
  navbarProps: {
    headerLayoutPreset: 'center', // Android title center
    navigationBarStyle: {
      backgroundColor: Colors.barBackground,
      height: 60,
    },
    titleStyle: {
      color: Colors.barLabelGold,
      alignSelf: 'center',
      textAlign: 'center',
      letterSpacing: 2,
      fontSize: 20,
    },
    backButtonTintColor: Colors.barLabelGold,
  },

  tabProps: {
    headerLayoutPreset: 'center', // Android title center
    swipeEnabled: true,
    type: 'push',
    showLabel: true,
    activeBackgroundColor: Colors.barBackground,
    inactiveBackgroundColor: Colors.barBackground,
    // Override the tabbar styles
    tabBarStyle: {
      paddingTop: 15,
      paddingBottom: 10,
      backgroundColor: Colors.barBackground,
    },
    // Override the style for an individual tab of the tabbar
    tabStyle: {
      justifyContent: 'flex-start',
      textAlign: 'center', 
    },
    // Overrides the styles for the tab label
    labelStyle: {
      color: Colors.barLabelWhite,
      
    },
  },

  icons: {
    style: { color: Colors.barLabelWhite, height: 30, width: 30, textAlign: 'center', },
  },
};
