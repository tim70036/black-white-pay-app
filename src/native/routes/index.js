import React from 'react';
import { Scene, Tabs, Stack, Drawer } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import DrawerIcon from '../components/DrawerIcon';
import DashboardDrawer from '../components/DashboardDrawer';
import SwitchStoreButton from '../components/SwitchStoreButton';

import BlankContainer from '../../containers/Blank';
import BlankComponent from '../components/Blank';

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
          <Scene key="dashboard" component={BlankComponent} layout={BlankContainer} />
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
        <Scene key="storeHome" component={BlankComponent} layout={BlankContainer} />
      </Stack>

      <Stack
        title="gameList"
        icon={() => <Icon name="book" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="gameList" component={BlankComponent} layout={BlankContainer} />
      </Stack>

      <Stack
        title="walletHome"
        icon={() => <Icon name="book" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="walletHome" component={BlankComponent} layout={BlankContainer} />
      </Stack>

      <Stack
        title="messageList"
        icon={() => <Icon name="book" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="messageList" component={BlankComponent} layout={BlankContainer} />
      </Stack>

      <Stack
        title="moreList"
        icon={() => <Icon name="contact" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="moreList" component={BlankComponent} layout={BlankContainer} />
      </Stack>
    </Tabs>
  </Stack>
);

export default Routes;
