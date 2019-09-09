import React from 'react';
import {
  Dimensions,
  Platform,
  NativeModules,
  Image,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Font, Notifications, Audio } from 'expo';
import Constants from 'expo-constants';
import { Asset } from 'expo-asset';
import { debounce } from 'lodash';
import config from '../../constants/config';

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? Constants.statusBarHeight : StatusBarManager.HEIGHT;
const IS_IOS = Platform.OS === 'ios';
const IS_ANDROID = Platform.OS === 'android';

const {
  width: viewportWidth,
  height: viewportHeight,
} = Dimensions.get('window');

const viewportWidthPercent = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const viewportHeightPercent = (percentage) => {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
};

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

const shadowOpt = {
  height: viewportHeightPercent(30),
  width: viewportWidthPercent(100),
  color: '#e38d02',
  border: 6,
  radius: 3.84,
  opacity: 0.35,
  x: 0,
  y: 0,
  style: { marginVertical: 5 },
};

const withPreventDoubleClick = (WrappedComponent) => {
  class PreventDoubleClick extends React.PureComponent {
    debouncedOnPress = () => {
      this.props.onPress && this.props.onPress();
    }

    onPress = debounce(this.debouncedOnPress, 1000, { leading: true, trailing: false });

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName || WrappedComponent.name})`;
  return PreventDoubleClick;
};

const PreventDoubleCLickB = withPreventDoubleClick(Button);

const PreventDoubleClickTH = withPreventDoubleClick(TouchableHighlight);

const PreventDoubleClickTO = withPreventDoubleClick(TouchableOpacity);

async function preloadRemoteAsset() {
  // get preload uri list
  const fetchPayload = {
    method: 'GET',
    credentials: 'include',
  };
  const apiPath = '/user/preload-uri';
  let response;
  try {
    response = await fetch( `${config.apiUrl}${apiPath}`, fetchPayload);
    response = await response.json();
    if (!response) throw Error('沒有回應');
    // get uri success, do Image.prefetch
    if (response.errCode === 0) {
      const uriOfImages = [...response.data];
      const preFetchTasks = [];
      uriOfImages.forEach((p) => {
        preFetchTasks.push(Image.prefetch(p));
      });
      await Promise.all(preFetchTasks);
    }
  } catch (error) {
    // Status
    console.log(error);
  }
}

async function preloadLocalAsset() {
  // Asset
  await Asset.loadAsync([
    // Bg
    require('../../img/background/background1.png'),
    require('../../img/background/background2.png'),
    require('../../img/background/background3.png'),

    // Init
    require('../../img/launch.png'),
    require('../../img/logo.png'),
    require('../../img/mainCurrency.png'),
    require('../../img/storeCurrency.png'),

    // Icon
    require('../../img/storeHome/coupon.png'),
    require('../../img/storeHome/game.png'),
    require('../../img/storeHome/info.png'),
    require('../../img/storeHome/store.png'),
    require('../../img/storeHome/pinkButton.png'),
    require('../../img/storeHome/purpleButton.png'),
    require('../../img/storeHome/store.png'),
    require('../../img/storeHome/wallet.png'),
    require('../../img/storeHome/location.png'),
    require('../../img/storeHome/phone.png'),
    require('../../img/storeHome/clock.png'),
    require('../../img/storeHome/list.png'),

    require('../../img/gameWalletList/list.png'),
    require('../../img/gameWalletList/recycle.png'),
    require('../../img/gameWalletList/purpleButton.png'),
    require('../../img/gameWalletList/pinkButton.png'),
    require('../../img/gameWalletList/coin.png'),
    require('../../img/gameWalletList/recycleButton.png'),

    require('../../img/storeList/defaultStore.png'),

    require('../../img/home/exchange.png'),
    require('../../img/home/pay.png'),
    require('../../img/home/receive.png'),
    require('../../img/home/scanner.png'),
    require('../../img/home/store.png'),
    require('../../img/home/transfer.png'),

    require('../../img/walletList/mainCurrency_bk.png'),
    require('../../img/walletList/mainButton_bk.png'),
    require('../../img/walletList/content_bk.png'),
    require('../../img/walletList/qrCode.png'),
    require('../../img/walletList/record.png'),
    require('../../img/walletList/transfer.png'),
    require('../../img/walletList/exchange.png'),

    require('../../img/transHistory/time.png'),
    require('../../img/transHistory/target.png'),
    require('../../img/transHistory/comment.png'),
    require('../../img/transHistory/topbk.png'),
    require('../../img/transHistory/search.png'),
    require('../../img/transHistory/contentbk.png'),

    require('../../img/friendList/addPerson.png'),
    require('../../img/friendList/addNote.png'),
    require('../../img/friendList/qrCode.png'),

    require('../../img/form/account.png'),
    require('../../img/form/currency.png'),
    require('../../img/form/name.png'),
    require('../../img/form/pwd.png'),
    require('../../img/form/store.png'),
    require('../../img/form/transNum.png'),
    require('../../img/form/transPwd.png'),

    require('../../img/addFriend/qr.png'),

    require('../../img/friendDetail/profileBackground.png'),
    require('../../img/friendDetail/addFriend.png'),
    require('../../img/friendDetail/deleteFriend.png'),
    require('../../img/friendDetail/transfer.png'),

    require('../../img/addStore/ad.png'),

    require('../../img/mine/about.png'),
    require('../../img/mine/bg.png'),
    require('../../img/mine/camera.png'),
    require('../../img/mine/logout.png'),
    require('../../img/mine/qrcode.png'),
    require('../../img/mine/serviceAgent.png'),
    require('../../img/mine/setting.png'),
    require('../../img/mine/user.png'),
    require('../../img/mine/version.png'),

    require('../../img/personalSetting/name_icon.png'),
    require('../../img/personalSetting/pwd_icon.png'),
    require('../../img/personalSetting/transPwd_icon.png'),

    // Tab bar
    require('../../img/tabbar/home-focus.png'),
    require('../../img/tabbar/home-unfocus.png'),
    require('../../img/tabbar/store-focus.png'),
    require('../../img/tabbar/store-unfocus.png'),
    require('../../img/tabbar/wallet.png'),
    require('../../img/tabbar/friend-focus.png'),
    require('../../img/tabbar/friend-unfocus.png'),
    require('../../img/tabbar/person-focus.png'),
    require('../../img/tabbar/person-unfocus.png'),

    // takeInModal
    require('../../img/takeInModal/amountContainer.png'),
    require('../../img/takeInModal/closeButton.png'),
    require('../../img/takeInModal/confirmButton.png'),
    require('../../img/takeInModal/diamond.png'),
    require('../../img/takeInModal/dot.png'),
    require('../../img/takeInModal/exchange.png'),
    require('../../img/takeInModal/flame.png'),
    require('../../img/takeInModal/gameCoin.png'),
    require('../../img/takeInModal/headBar.png'),
    require('../../img/takeInModal/infoBoard.png'),

    // Audio
    require('../../audio/notification.mp3'),
  ]);
}

export {
  IS_IOS,
  IS_ANDROID,
  STATUSBAR_HEIGHT,
  viewportWidth,
  viewportHeight,
  viewportWidthPercent,
  viewportHeightPercent,
  shadowStyle,
  shadowOpt,

  PreventDoubleCLickB,
  PreventDoubleClickTH,
  PreventDoubleClickTO,

  withPreventDoubleClick,

  preloadRemoteAsset,
  preloadLocalAsset,
};
