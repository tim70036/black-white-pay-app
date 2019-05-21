import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Notifications, Font } from 'expo';
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

import Colors from './constants/colors';


// Invert status bar text color
StatusBar.setBarStyle('light-content');
// Hide StatusBar on Android as it overlaps tabs
// if (Platform.OS === 'android') StatusBar.setHidden(false);


const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'transparent',
    zIndex: -1000,
  },
});

export default class App extends React.Component {
  static propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
  }

  state = { loading: true }

  async componentWillMount() {

    // Moment locale
    moment.locale('zh-TW');

    // Font
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });

    this.setState({ loading: false });
  }

  _handleNotifications = (receivedData) => {
    const { data, origin } = receivedData;
    const { store } = this.props;

    // Process notification
    let notificationData = data.notifications;
    notificationData = notificationData.map(item => ({ ...item, hasRead: false }));

    // Into redux
    store.dispatch(appendNotifications(notificationData));
  }

  _authenticateUser = () => {
    const { store } = this.props;
    // If not login, reset to login/register screen
    if (!store.getState().user.authenticated) {
      console.log(`in ${Actions.currentScene}, but not logined`);
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


