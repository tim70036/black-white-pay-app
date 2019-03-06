import React from 'react';
import {
  Scene,
  Tabs,
  Stack,
  Drawer,
} from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import DrawerIcon from '../components/DrawerIcon';
import DashboardDrawer from '../components/DashboardDrawer';
import SwitchStoreButton from '../components/SwitchStoreButton';

import BlankContainer from '../../containers/Blank';
import BlankComponent from '../components/Blank';

import StoreHomeContainer from '../../containers/StoreHome';
import StoreHomeComponent from '../components/StoreHome';

import TransferContainer from '../../containers/Transfer';
import TransferComponent from '../components/Transfer';

const Routes = (
  <Stack key="root" hideNavBar>

    <Drawer
      hideNavBar
      key="dashboardDrawer"
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
          icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="dashboard" component={BlankContainer} Layout={BlankComponent} />
        </Stack>
      </Scene>
    </Drawer>

    <Tabs
      key="homeTabbar"
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
        <Scene key="walletHome" component={BlankContainer} Layout={BlankComponent} />
        {/* <Scene key="transfer" />
        <Scene key="transferHistory" />
        <Scene key="qrcode" />
        <Scene key="coupon" /> */}
      </Stack>

      <Stack
        title="notifyList"
        icon={() => <Icon name="book" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="notifyList" component={BlankContainer} Layout={BlankComponent} />
      </Stack>

      <Stack
        title="moreList"
        icon={() => <Icon name="contact" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="moreList" component={BlankContainer} Layout={BlankComponent} />
      </Stack>
    </Tabs>
  </Stack>
);

export default Routes;
