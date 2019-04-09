import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Router,
  Scene,
  Tabs,
  Stack,
  Drawer,
  Lightbox,
  Modal,
  Actions,
} from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import spinnerHOC from '../lib/spinnerHOC';

import DrawerIcon from '../components/DrawerIcon';
import DashboardDrawer from '../components/DashboardDrawer';
import SwitchStoreButton from '../components/SwitchStoreButton';

import InitContainer from '../../containers/Init';
import InitComponent from '../components/Init';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import RegisterContainer from '../../containers/Register';
import RegisterComponent1 from '../components/Register/Register1';
import RegisterComponent2 from '../components/Register/Register2';
import RegisterComponent3 from '../components/Register/Register3';
import RegisterComponent4 from '../components/Register/Register4';

import ChooseStoreContainer from '../../containers/ChooseStore/ChooseStore';
import ChooseStoreComponent from '../components/ChooseStore/ChooseStore';

import AddStoreContainer from '../../containers/ChooseStore/AddStore';
import AddStoreComponent from '../components/ChooseStore/AddStore';

import HomeContainer from '../../containers/Home';
import HomeComponent from '../components/Home';

import WalletHomeContainer from '../../containers/WalletHome';
import WalletHomeComponent from '../components/WalletHome';

import notifyListContainer from '../../containers/Notification';
import notifyListComponent from '../components/Notification';

import TransferContainer from '../../containers/Transfer';
import TransferComponent from '../components/Transfer';

import TransHistoryContainer from '../../containers/TransHistory';
import TransHistoryComponent from '../components/TransHistory';

import qrCodeContainer from '../../containers/QrCode';
import qrCodeComponent from '../components/QrCode';

import qrScannerContainer from '../../containers/QrScanner';
import qrScannerComponent from '../components/QrScanner';

import couponsContainer from '../../containers/Coupons';
import couponsComponent from '../components/Coupons';

const renderTabIcons = ({ title, focused }) => {
  switch (title) {
    case '首頁': {
      return <Icon name="home" type="SimpleLineIcons" style={[{ ...DefaultProps.icons.style }, (focused) ? { color: '#aa8048' } : null ]} />;
    }
    case '商店': {
      return <Icon name="grid" type="SimpleLineIcons" style={[{ ...DefaultProps.icons.style }, (focused) ? { color: '#aa8048' } : null ]} />;
    }
    case '我的錢包': {
      return <Icon name="wallet" type="SimpleLineIcons" style={[{ ...DefaultProps.icons.style }, (focused) ? { color: '#aa8048' } : null ]} />;
    }
    case '通知': {
      return <Icon name="bell" type="SimpleLineIcons" style={[{ ...DefaultProps.icons.style }, (focused) ? { color: '#aa8048' } : null ]} />;
    }
    case '設定': {
      return <Icon name="settings" type="SimpleLineIcons" style={[{ ...DefaultProps.icons.style }, (focused) ? { color: '#aa8048' } : null ]} />;
    }
    default: return <Icon name="planet" {...DefaultProps.icons} />;
  }
};

const getRoutes = (authenticate, goAuth) => (
  <Modal key="modal" hideNavBar>
    <Lightbox key="main" hideNavBar>

      <Stack key="main" hideNavBar>
        <Tabs
          key="main"
          {...DefaultProps.tabProps}
        >
          <Stack
            key="home"
            title="首頁"
            icon={renderTabIcons}
            {...DefaultProps.navbarProps}
          >
            <Scene component={spinnerHOC(HomeContainer)} Layout={HomeComponent} on={authenticate} failure={goAuth} />
          </Stack>

          <Stack
            key="storeList"
            title="商店"
            icon={renderTabIcons}
            {...DefaultProps.navbarProps}
          >
            <Scene component={spinnerHOC(ChooseStoreContainer)} Layout={ChooseStoreComponent} on={authenticate} failure={goAuth} />
          </Stack>

          <Stack
            key="walletList"
            title="我的錢包"
            icon={renderTabIcons}
            {...DefaultProps.navbarProps}
          >
            <Scene component={spinnerHOC(WalletHomeContainer)} Layout={WalletHomeComponent} on={authenticate} failure={goAuth} />
          </Stack>

          <Stack
            key="notifyList"
            title="通知"
            icon={renderTabIcons}
            {...DefaultProps.navbarProps}
          >
            <Scene component={spinnerHOC(notifyListContainer)} Layout={notifyListComponent} on={authenticate} failure={goAuth} />
          </Stack>

          <Stack
            key="moreList"
            title="設定"
            icon={renderTabIcons}
            {...DefaultProps.navbarProps}
          >
            <Scene component={spinnerHOC(TransHistoryContainer)} Layout={TransHistoryComponent} on={authenticate} failure={goAuth} />
          </Stack>
        </Tabs>


        {/* Specific Function Page */}
        <Stack
          key="transfer"
          title="轉帳"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(TransferContainer)} Layout={TransferComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="transHistory"
          title="轉帳紀錄"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(TransHistoryContainer)} Layout={TransHistoryComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="coupons"
          title="優惠券"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(qrScannerContainer)} Layout={qrScannerComponent} on={authenticate} failure={goAuth} />
        </Stack>
      </Stack>

      { /* Lightbox components will lay over the screen, allowing transparency */ }
      <Scene key="qrCode" component={spinnerHOC(qrCodeContainer)} Layout={qrCodeComponent} on={authenticate} failure={goAuth} />
    </Lightbox>

    {/* Auth Screen */}
    <Stack key="auth" hideNavBar>
      <Scene key="init" component={InitContainer} Layout={InitComponent} />
      <Scene key="login" component={spinnerHOC(LoginContainer)} Layout={LoginComponent} />
      <Stack key="register" hideNavBar>
        <Scene key="register1" component={RegisterContainer} Layout={RegisterComponent1} />
        <Scene key="register2" component={RegisterContainer} Layout={RegisterComponent2} />
        <Scene key="register3" component={RegisterContainer} Layout={RegisterComponent3} />
        <Scene key="register4" component={spinnerHOC(RegisterContainer)} Layout={RegisterComponent4} />
      </Stack>
    </Stack>
  </Modal>
);

export default getRoutes;
