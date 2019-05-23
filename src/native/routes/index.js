import React, { Component } from 'react';
import {
  Scene,
  Tabs,
  Stack,
  Lightbox,
  Modal,
} from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';

import spinnerHOC from '../lib/spinnerHOC';

import Colors from '../constants/colors';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import RegisterContainer from '../../containers/Register';
import RegisterComponent1 from '../components/Register/Register1';
import RegisterComponent2 from '../components/Register/Register2';
import RegisterComponent3 from '../components/Register/Register3';
import RegisterVerifyPhoneComponent from '../components/Register/VerifyPhone';

import ForgetContainer from '../../containers/Forget';
import ForgetComponent1 from '../components/Forget/Forget1';
import ForgetComponent2 from '../components/Forget/Forget2';
import ForgetVerifyPhoneComponent from '../components/Forget/VerifyPhone';

import StoreListContainer from '../../containers/StoreList/StoreList';
import StoreListComponent from '../components/StoreList/StoreList';

import AddStoreContainer from '../../containers/StoreList/AddStore';
import AddStoreComponent from '../components/StoreList/AddStore';

import HomeContainer from '../../containers/Home';
import HomeComponent from '../components/Home';

import StoreHomeContainer from '../../containers/StoreHome';
import StoreHomeComponent from '../components/StoreHome';

import WalletListContainer from '../../containers/WalletList';
import WalletListComponent from '../components/WalletList';

import notifyListContainer from '../../containers/Notification';
import notifyListComponent from '../components/Notification';

import ExchangeContainer from '../../containers/Exchange';
import ExchangeComponent from '../components/Exchange';

import TransferContainer from '../../containers/Transfer';
import TransferComponent from '../components/Transfer';

import TransHistoryContainer from '../../containers/TransHistory';
import TransHistoryComponent from '../components/TransHistory';

import qrCodePayContainer from '../../containers/QrCodePay';
import qrCodeComponent from '../components/QrCode';

import qrScannerContainer from '../../containers/QrScanner';
import qrScannerComponent from '../components/QrScanner';

import qrCodeReceiveContainer from '../../containers/QrCodeReceive';
import qrCodeReceiveComponent from '../components/QrCodeReceive';

import MineContainer from '../../containers/Mine';
import MineComponent from '../components/Mine';
import PersonalSettingComponent from '../components/Mine/PersonalSetting';
import ChangeThumbnailComponent from '../components/Mine/ChangeThumbnail';
import ChangeNameComponent from '../components/Mine/ChangeName';
import ChangePwdComponent from '../components/Mine/ChangePwd';
import ChangeTransPwdComponent from '../components/Mine/ChangeTransPwd';
import PrivacyComponent from '../components/Mine/Privacy';

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
            <Scene key="storeHome" component={StoreHomeContainer} Layout={StoreHomeComponent} on={authenticate} failure={goAuth} />
          </Stack>

          <Stack
            key="walletList"
            title="我的錢包"
            {...DefaultProps.navbarProps}
          >
            <Scene component={spinnerHOC(WalletListContainer)} Layout={WalletListComponent} on={authenticate} failure={goAuth} success={refresh} />
          </Stack>


          <Stack
            key="mine"
            title="我的"
            {...DefaultProps.navbarProps}
          >
            <Scene component={spinnerHOC(MineContainer)} Layout={MineComponent} on={authenticate} failure={goAuth} />
          </Stack>
        </Tabs>


        {/* Specific Function Page */}
        <Stack
          key="addStore"
          title="新增商店"
          {...DefaultProps.navbarProps}
          back
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
          title="兌換"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(ExchangeContainer)} Layout={ExchangeComponent} on={authenticate} failure={goAuth} />
        </Stack>

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
          key="personalSetting"
          title="設定"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(MineContainer)} Layout={PersonalSettingComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          hideNavBar
          key="changeThumbnail"
          title="更改照片"
          // {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(MineContainer)} Layout={ChangeThumbnailComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="changeName"
          title="更改暱稱"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(MineContainer)} Layout={ChangeNameComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="changeTransPwd"
          title="更改交易密碼"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(MineContainer)} Layout={ChangeTransPwdComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="changePwd"
          title="更改密碼"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(MineContainer)} Layout={ChangePwdComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="privacy"
          title="隱私權政策"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(MineContainer)} Layout={PrivacyComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="qrCodePay"
          title="付款"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(qrCodePayContainer)} Layout={qrCodeComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="qrScanner"
          title="掃描"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(qrScannerContainer)} Layout={qrScannerComponent} on={authenticate} failure={goAuth} />
        </Stack>

        <Stack
          key="qrCodeReceive"
          title="收款"
          {...DefaultProps.navbarProps}
          back
        >
          <Scene component={spinnerHOC(qrCodeReceiveContainer)} Layout={qrCodeReceiveComponent} on={authenticate} failure={goAuth} />
        </Stack>
      </Stack>

      { /* Lightbox components will lay over the screen, allowing transparency */ }
      {/* <Scene key="qrCode" component={qrCodeContainer} Layout={qrCodeComponent} on={authenticate} failure={goAuth} /> */}
    </Lightbox>

    {/* Auth Screen */}
    <Stack key="auth" hideNavBar>
      <Scene key="login" component={spinnerHOC(LoginContainer)} Layout={LoginComponent} />
      <Stack key="register" hideNavBar>
        <Scene key="register1" component={spinnerHOC(RegisterContainer)} Layout={RegisterComponent1} />
        <Scene key="registerVerifyPhone" component={spinnerHOC(RegisterContainer)} Layout={RegisterVerifyPhoneComponent} />
        <Scene key="register2" component={RegisterContainer} Layout={RegisterComponent2} />
        <Scene key="register3" component={RegisterContainer} Layout={RegisterComponent3} />
        <Scene key="privacy" title="隱私權政策" {...DefaultProps.navbarProps} back component={spinnerHOC(MineContainer)} Layout={PrivacyComponent} on={authenticate} failure={goAuth} />
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
