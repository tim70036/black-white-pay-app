import React, { Component } from 'react';
import {
  Scene,
  Tabs,
  Stack,
  Lightbox,
  Modal,
} from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/default';

import spinnerHOC from '../lib/spinnerHOC';

import Colors from '../constants/colors';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import RegisterContainer from '../../containers/Register';
import RegisterPhoneComponent from '../components/Register/RegisterPhone';
import RegisterPwdComponent from '../components/Register/RegisterPwd';
import RegisterNameComponent from '../components/Register/RegisterName';
import RegisterVerifyPhoneComponent from '../components/Register/VerifyPhone';

import ForgetContainer from '../../containers/Forget';
import ForgetComponent1 from '../components/Forget/Forget1';
import ForgetComponent2 from '../components/Forget/Forget2';
import ForgetVerifyPhoneComponent from '../components/Forget/VerifyPhone';

import StoreListContainer from '../../containers/StoreList';
import StoreListComponent from '../components/StoreList';

import AddStoreContainer from '../../containers/AddStore';
import AddStoreComponent from '../components/AddStore';

import HomeContainer from '../../containers/Home';
import HomeComponent from '../components/Home';

import StoreHomeContainer from '../../containers/StoreHome';
import StoreHomeComponent from '../components/StoreHome';

import WalletListContainer from '../../containers/WalletList';
import WalletListComponent from '../components/WalletList';

import FriendListContainer from '../../containers/FriendList';
import FriendListComponent from '../components/FriendList';

import notifyListContainer from '../../containers/Notification';
import notifyListComponent from '../components/Notification';

import ExchangeContainer from '../../containers/Exchange';
import ExchangeComponent from '../components/Exchange';

import TransferContainer from '../../containers/Transfer';
import TransferComponent from '../components/Transfer';

import TransHistoryContainer from '../../containers/TransHistory';
import TransHistoryComponent from '../components/TransHistory';

import qrCodePayContainer from '../../containers/QrCodePay';
import qrCodePayComponent from '../components/QrCodePay';

import qrScannerContainer from '../../containers/QrScanner';
import qrScannerComponent from '../components/QrScanner';

import qrCodeReceiveContainer from '../../containers/QrCodeReceive';
import qrCodeReceiveComponent from '../components/QrCodeReceive';

import QrCodeFriendContainer from '../../containers/QrCodeFriend';
import QrCodeFriendComponent from '../components/QrCodeFriend';


import MineContainer from '../../containers/Mine';
import MineComponent from '../components/Mine';
import PersonalSettingComponent from '../components/PersonalSetting';
import ChangeNameComponent from '../components/ChangeName';
import ChangePwdComponent from '../components/ChangePwd';
import ChangeTransPwdComponent from '../components/ChangeTransPwd';
import PrivacyComponent from '../components/Privacy';
import AboutComponent from '../components/About';

import FriendRequestContainer from '../../containers/FriendRequest';
import FriendRequestComponent from '../components/FriendRequest';

import AddFriendContainer from '../../containers/AddFriend';
import AddFriendComponent from '../components/AddFriend';

import FriendDetailContainer from '../../containers/FriendDetail';
import FriendDetailComponent from '../components/FriendDetail';

import GameWalletListContainer from '../../containers/GameWalletList';
import GameWalletListComponent from '../components/GameWalletList';

import TabBar from '../components/TabBar';

const getRoutes = (authenticate, goAuth, refresh) => (
  <Modal key="modal" hideNavBar>
    <Lightbox key="main" hideNavBar>

      <Stack key="main" hideNavBar>
        <Tabs
          key="main"
          {...DefaultProps.tabProps}
          tabBarComponent={TabBar}
        >
          <Stack
            key="home"
            {...DefaultProps.navbarProps}
          >
            <Scene component={spinnerHOC(HomeContainer)} Layout={HomeComponent} on={authenticate} failure={goAuth} />
          </Stack>

          <Stack
            key="storeList"
            {...DefaultProps.navbarProps}
          >
            <Scene component={spinnerHOC(StoreListContainer)} Layout={StoreListComponent} on={authenticate} failure={goAuth} success={refresh} />
            <Scene key="storeHome" hideTabBar="true" component={StoreHomeContainer} Layout={StoreHomeComponent} on={authenticate} failure={goAuth} />
            <Scene key="gameWalletList" component={spinnerHOC(GameWalletListContainer)} Layout={GameWalletListComponent} on={authenticate} failure={goAuth} success={refresh} />
          </Stack>

          <Stack
            key="walletList"
            {...DefaultProps.navbarProps}
          >
            <Scene component={spinnerHOC(WalletListContainer)} Layout={WalletListComponent} on={authenticate} failure={goAuth} success={refresh} />
          </Stack>

          <Stack
            key="friendList"
            {...DefaultProps.navbarProps}
          >
            <Scene component={spinnerHOC(FriendListContainer)} Layout={FriendListComponent} on={authenticate} failure={goAuth} success={refresh} />
          </Stack>


          <Stack
            key="mine"
            {...DefaultProps.navbarProps}
          >
            <Scene component={spinnerHOC(MineContainer)} Layout={MineComponent} on={authenticate} failure={goAuth} />
          </Stack>
        </Tabs>


        {/* Specific Function Page */}
        <Stack
          key="addStore"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(AddStoreContainer)} Layout={AddStoreComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="notifyList"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(notifyListContainer)} Layout={notifyListComponent} on={authenticate} failure={goAuth} success={refresh} />
        </Stack>

        <Stack
          key="exchange"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(ExchangeContainer)} Layout={ExchangeComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="transfer"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(TransferContainer)} Layout={TransferComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="transHistory"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(TransHistoryContainer)} Layout={TransHistoryComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="personalSetting"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(MineContainer)} Layout={PersonalSettingComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="changeName"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(MineContainer)} Layout={ChangeNameComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="changeTransPwd"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(MineContainer)} Layout={ChangeTransPwdComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="changePwd"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(MineContainer)} Layout={ChangePwdComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="privacy"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(MineContainer)} Layout={PrivacyComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="about"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(MineContainer)} Layout={AboutComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="qrCodePay"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(qrCodePayContainer)} Layout={qrCodePayComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="qrScanner"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(qrScannerContainer)} Layout={qrScannerComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="qrCodeReceive"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(qrCodeReceiveContainer)} Layout={qrCodeReceiveComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="qrCodeFriend"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(QrCodeFriendContainer)} Layout={QrCodeFriendComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="addFriend"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(AddFriendContainer)} Layout={AddFriendComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="friendRequest"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(FriendRequestContainer)} Layout={FriendRequestComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="friendDetail"
          {...DefaultProps.navbarProps}
        >
          <Scene component={spinnerHOC(FriendDetailContainer)} Layout={FriendDetailComponent} on={authenticate} failure={goAuth} />
        </Stack>

      </Stack>

      { /* Lightbox components will lay over the screen, allowing transparency */ }
      {/* <Scene key="qrCode" component={qrCodeContainer} Layout={qrCodeComponent} on={authenticate} failure={goAuth} /> */}
    </Lightbox>

    {/* Auth Screen */}
    <Stack key="auth" hideNavBar>
      <Scene key="login" component={spinnerHOC(LoginContainer)} Layout={LoginComponent} />
      <Stack key="register" hideNavBar>
        <Scene key="registerPhone" component={spinnerHOC(RegisterContainer)} Layout={RegisterPhoneComponent} />
        <Scene key="registerVerifyPhone" component={spinnerHOC(RegisterContainer)} Layout={RegisterVerifyPhoneComponent} />
        <Scene key="registerPwd" component={RegisterContainer} Layout={RegisterPwdComponent} />
        <Scene key="registerName" component={RegisterContainer} Layout={RegisterNameComponent} />
        <Scene key="privacy" title="隱私權政策" component={PrivacyComponent} />
      </Stack>
      <Stack key="forget" hideNavBar>
        <Scene key="forget1" component={spinnerHOC(ForgetContainer)} Layout={ForgetComponent1} />
        <Scene key="forgetVerifyPhone" component={spinnerHOC(ForgetContainer)} Layout={ForgetVerifyPhoneComponent} />
        <Scene key="forget2" component={spinnerHOC(ForgetContainer)} Layout={ForgetComponent2} />
      </Stack>
    </Stack>
  </Modal>
);

export default getRoutes;
