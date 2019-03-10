import React from 'react';
import {
  Scene,
  Tabs,
  Stack,
  Drawer,
  Lightbox,
} from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

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

import StoreHomeContainer from '../../containers/StoreHome';
import StoreHomeComponent from '../components/StoreHome';

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

import couponsContainer from '../../containers/Coupons';
import couponsComponent from '../components/Coupons';

const Routes = (
  <Lightbox key="lightbox" hideNavBar>

    <Stack key="root" hideNavBar>

      {/* Init Screen */}
      <Stack hideNavBar>
        <Scene key="init" component={InitContainer} Layout={InitComponent} />
        <Scene key="login" component={LoginContainer} Layout={LoginComponent} />
        <Stack key="register" hideNavBar>
          <Scene key="register1" component={RegisterContainer} Layout={RegisterComponent1} />
          <Scene key="register2" component={RegisterContainer} Layout={RegisterComponent2} />
          <Scene key="register3" component={RegisterContainer} Layout={RegisterComponent3} />
          <Scene key="register4" component={RegisterContainer} Layout={RegisterComponent4} />
        </Stack>
      </Stack>

      <Drawer
        hideNavBar
        key="chooseStoreDrawer"
        onExit={() => {
          console.log('Drawer closed');
        }}
        onEnter={() => {
          console.log('Drawer opened');
        }}
        contentComponent={DashboardDrawer}
        drawerIcon={DrawerIcon}
        drawerWidth={300}
        {...DefaultProps.navbarProps}
      >
        <Scene hideNavBar>
          <Stack
            title={AppConfig.appName.toUpperCase()}
            {...DefaultProps.navbarProps}
          >
            <Scene key="chooseStore" component={ChooseStoreContainer} Layout={ChooseStoreComponent} />
            <Scene key="addStore" component={AddStoreContainer} Layout={AddStoreComponent} />
          </Stack>
        </Scene>
      </Drawer>

      {/* Each Store */}
      <Tabs
        key="storeTabbar"
        renderLeftButton={SwitchStoreButton}
        {...DefaultProps.tabProps}
      >
        <Stack
          title="storeHome"
          icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="storeHome" component={StoreHomeContainer} Layout={StoreHomeComponent} />
        </Stack>

        <Stack
          title="gameList"
          icon={() => <Icon name="book" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="gameList" component={TransferContainer} Layout={TransferComponent} />
        </Stack>

        <Stack
          title="walletHome"
          icon={() => <Icon name="book" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="walletHome" component={WalletHomeContainer} Layout={WalletHomeComponent} />
        </Stack>

        <Stack
          title="notifyList"
          icon={() => <Icon name="book" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="notifyList" component={notifyListContainer} Layout={notifyListComponent} />
        </Stack>

        <Stack
          title="moreList"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="moreList" component={TransHistoryContainer} Layout={TransHistoryComponent} />
        </Stack>
      </Tabs>

      {/* Specific Function Page */}
      <Stack
        key="transfer"
        title="轉帳"
        {...DefaultProps.navbarProps}
        back
      >
        <Scene component={TransferContainer} Layout={TransferComponent} />
      </Stack>

      <Stack
        key="transHistory"
        title="轉帳紀錄"
        {...DefaultProps.navbarProps}
        back
      >
        <Scene component={TransHistoryContainer} Layout={TransHistoryComponent} />
      </Stack>

      <Stack
        key="coupons"
        title="優惠券"
        {...DefaultProps.navbarProps}
        back
      >
        <Scene component={couponsContainer} Layout={couponsComponent} />
      </Stack>
    </Stack>

    { /* Lightbox components will lay over the screen, allowing transparency */ }
    <Scene key="qrCode" component={qrCodeContainer} Layout={qrCodeComponent} />
  </Lightbox>
);

export default Routes;
