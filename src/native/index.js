import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { Notifications, Font } from 'expo';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Root, StyleProvider } from 'native-base';

import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';

import Routes from './routes/index';
import Loading from './components/Loading';
import { appendNotifications } from '../actions/notifications';

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);

export default class App extends React.Component {
  static propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
  }

  state = { loading: true }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });

    this.setState({ loading: false });
  }

  componentDidMount() {
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotifications);
  }

  _handleNotifications = (notification) => {
    const { data, origin } = notification;
    const { store } = this.props;
    console.log(notification);

    // store.dispatch(appendNotifications(data));
  }

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
              <Router>
                {Routes}
              </Router>
            </StyleProvider>
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}
