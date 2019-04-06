import React from 'react';
import {
  Scene,
  Tabs,
  Stack,
  Drawer,
  Lightbox,
  Modal,
  ActionConst,
} from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import requireAuth from '../lib/authHOC';

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

const Routes = (
  <Modal key="modal" hideNavBar>
    <Lightbox key="main" hideNavBar>

      <Stack key="main" hideNavBar>

        <Tabs
          key="main"
          {...DefaultProps.tabProps}
        >
          <Stack
            title="首頁"
            icon={() => <Icon name="planet" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key="home" component={requireAuth(HomeContainer)} Layout={HomeComponent} />
          </Stack>

          <Stack
            title="商店"
            icon={() => <Icon name="book" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key="storeList" component={requireAuth(ChooseStoreContainer)} Layout={ChooseStoreComponent} />
          </Stack>

          <Stack
            title="我的錢包"
            icon={() => <Icon name="book" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key="walletList" component={requireAuth(WalletHomeContainer)} Layout={WalletHomeComponent} />
          </Stack>

          <Stack
            title="通知"
            icon={() => <Icon name="book" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key="notifyList" component={requireAuth(notifyListContainer)} Layout={notifyListComponent} />
          </Stack>

          <Stack
            title="設定"
            icon={() => <Icon name="contact" {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key="moreList" component={requireAuth(TransHistoryContainer)} Layout={TransHistoryComponent} />
          </Stack>
        </Tabs>


        {/* Specific Function Page */}
        <Stack
          key="transfer"
          title="轉帳"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={requireAuth(TransferContainer)} Layout={TransferComponent} />
        </Stack>

        <Stack
          key="transHistory"
          title="轉帳紀錄"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={requireAuth(TransHistoryContainer)} Layout={TransHistoryComponent} />
        </Stack>

        <Stack
          key="coupons"
          title="優惠券"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={requireAuth(qrScannerContainer)} Layout={qrScannerComponent} />
        </Stack>
      </Stack>

      { /* Lightbox components will lay over the screen, allowing transparency */ }
      <Scene key="qrCode" component={requireAuth(qrCodeContainer)} Layout={qrCodeComponent} />
    </Lightbox>

    {/* Auth Screen */}
    <Stack key="auth" hideNavBar>
      <Scene key="init" component={InitContainer} Layout={InitComponent} />
      <Scene key="login" component={LoginContainer} Layout={LoginComponent} />
      <Stack key="register" hideNavBar>
        <Scene key="register1" component={RegisterContainer} Layout={RegisterComponent1} />
        <Scene key="register2" component={RegisterContainer} Layout={RegisterComponent2} />
        <Scene key="register3" component={RegisterContainer} Layout={RegisterComponent3} />
        <Scene key="register4" component={RegisterContainer} Layout={RegisterComponent4} />
      </Stack>
    </Stack>
  </Modal>
);

export default Routes;
