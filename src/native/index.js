import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Font, Asset, Notifications, Audio } from 'expo';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Root, StyleProvider } from 'native-base';
import moment from 'moment';
import 'moment/min/locales'; // https://github.com/moment/moment/issues/4422
import {
  Router,
  Actions,
} from 'react-native-router-flux';


import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';

import getRoutes from './routes/index';
import Loading from './components/Loading';
import { appendNotifications } from '../actions/notifications';
import { IS_IOS } from './lib/util';

// Invert status bar text color
StatusBar.setBarStyle('light-content');
// Hide StatusBar on Android as it overlaps tabs
// if (Platform.OS === 'android') StatusBar.setHidden(false);

const notificationSound = new Audio.Sound();

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'transparent',
  },
});

export default class App extends React.Component {
  static propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
  }

  state = { loading: true }

  async componentDidMount() {

    // Moment locale
    moment.locale('zh-tw');

    // Asset
    await Asset.loadAsync([
      // Bg
      require('../img/background/background1.png'),
      require('../img/background/background2.png'),
      require('../img/background/background3.png'),

      // Init
      require('../img/launch.png'),
      require('../img/logo.png'),
      require('../img/mainCurrency.png'),
      require('../img/storeCurrency.png'),

      // Icon
      require('../img/storeHome/coupon.png'),
      require('../img/storeHome/game.png'),
      require('../img/storeHome/info.png'),
      require('../img/storeHome/store.png'),

      require('../img/storeList/defaultStore.png'),

      require('../img/home/exchange.png'),
      require('../img/home/pay.png'),
      require('../img/home/receive.png'),
      require('../img/home/scanner.png'),
      require('../img/home/store.png'),
      require('../img/home/transfer.png'),

      require('../img/walletList/mainCurrency_bk.png'),
      require('../img/walletList/mainButton_bk.png'),
      require('../img/walletList/content_bk.png'),
      require('../img/walletList/qrCode.png'),
      require('../img/walletList/record.png'),
      require('../img/walletList/transfer.png'),
      require('../img/walletList/exchange.png'),

      require('../img/transHistory/time.png'),
      require('../img/transHistory/target.png'),
      require('../img/transHistory/comment.png'),
      require('../img/transHistory/topbk.png'),
      require('../img/transHistory/search.png'),
      require('../img/transHistory/contentbk.png'),

      require('../img/friendList/addPerson.png'),
      require('../img/friendList/addNote.png'),
      require('../img/friendList/qrCode.png'),

      require('../img/form/account.png'),
      require('../img/form/currency.png'),
      require('../img/form/name.png'),
      require('../img/form/pwd.png'),
      require('../img/form/store.png'),
      require('../img/form/transNum.png'),
      require('../img/form/transPwd.png'),

      require('../img/addFriend/qr.png'),

      require('../img/friendDetail/profileBackground.png'),
      require('../img/friendDetail/addFriend.png'),
      require('../img/friendDetail/deleteFriend.png'),
      require('../img/friendDetail/transfer.png'),

      require('../img/addStore/ad.png'),

      require('../img/mine/about.png'),
      require('../img/mine/bg.png'),
      require('../img/mine/camera.png'),
      require('../img/mine/logout.png'),
      require('../img/mine/qrcode.png'),
      require('../img/mine/serviceAgent.png'),
      require('../img/mine/setting.png'),
      require('../img/mine/user.png'),
      require('../img/mine/version.png'),

      require('../img/personalSetting/name_icon.png'),
      require('../img/personalSetting/pwd_icon.png'),
      require('../img/personalSetting/transPwd_icon.png'),

      // Tab bar
      require('../img/tabbar/home-focus.png'),
      require('../img/tabbar/home-unfocus.png'),
      require('../img/tabbar/store-focus.png'),
      require('../img/tabbar/store-unfocus.png'),
      require('../img/tabbar/wallet.png'),
      require('../img/tabbar/friend-focus.png'),
      require('../img/tabbar/friend-unfocus.png'),
      require('../img/tabbar/person-focus.png'),
      require('../img/tabbar/person-unfocus.png'),

      // Audio
      require('../audio/notification.mp3'),
    ]);

    // Font
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotifications);

    this.setState({ loading: false });
  }

  _handleNotifications = async (receivedData) => {
    const { data, origin } = receivedData;
    const { store } = this.props;

    // Process notification
    let notificationData = data.notifications;

    // Notification is received when user using the app
    // Only IOS won't show notificaiton when user is using the app
    // So we gotta handle it
    if (origin === 'received' && IS_IOS) {
      try {
        await notificationSound.loadAsync(require('../audio/notification.mp3'));
        await notificationSound.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
    }
  }

  _authenticateUser = () => {
    const { store } = this.props;
    // If not login, reset to login/register screen
    if (!store.getState().user.authenticated) {
      // console.log(`in ${Actions.currentScene}, but not logined`);
      return false;
    }
    return true;
  };

  _goAuthScene = () => (Actions.reset('auth'));

  _refreshScene = () => (Actions.refresh({ key: Math.random() }));

  render() {
    const { loading } = this.state;
    const { store, persistor } = this.props;

    if (loading) return <Loading />;

    return (
      <Root>
        <Provider store={store}>
          <PersistGate
            loading={<Loading />}
            persistor={persistor}
          >
            <StyleProvider style={getTheme(theme)}>
              <Router sceneStyle={styles.rootContainer}>
                {getRoutes(this._authenticateUser, this._goAuthScene, this._refreshScene)}
              </Router>
            </StyleProvider>
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}
