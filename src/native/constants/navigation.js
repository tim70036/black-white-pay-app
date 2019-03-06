import Colors from '../../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    headerLayoutPreset: 'center', // Android title center
    navigationBarStyle: {
      backgroundColor: 'white',
    },
    titleStyle: {
      color: Colors.textColor,
      alignSelf: 'center',
      textAlign: 'center',
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase,
    },
    backButtonTintColor: Colors.textColor,
  },

  tabProps: {
    headerLayoutPreset: 'center', // Android title center
    swipeEnabled: true,
    type: 'push',
    showLabel: false,
    activeBackgroundColor: 'rgba(255,255,255,0.1)',
    inactiveBackgroundColor: Colors.brandPrimary,
    tabBarStyle: { backgroundColor: Colors.brandPrimary },
  },

  icons: {
    style: { color: 'white', height: 30, width: 30 },
  },
};
