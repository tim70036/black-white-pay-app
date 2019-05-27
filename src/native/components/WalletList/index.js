import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  Text, Icon, View,
} from 'native-base';

import {
  StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Colors from '../../constants/colors';
import ImageButton from './ImageButton';
import NavBar from '../NavBar';
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const tablePaddingHorizontal = viewportWidthPercent(2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  layoutContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  bkImg: {
  },
  mainCurrencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: viewportWidthPercent(5),
    // borderWidth: 1,
    // borderColor: 'white',
    // marginTop: viewportHeightPercent(1),
  },
  mainCurrencyImg: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    // marginTop: viewportHeightPercent(1),
    marginRight: viewportWidthPercent(5),
  },
  mainCurrency: {
    fontSize: 30,
    color: Colors.labelWhite,
    // marginTop: viewportHeightPercent(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardLightGray,
    height: viewportHeightPercent(12),
    borderRadius: viewportHeightPercent(12) / 2,
    marginTop: viewportHeightPercent(2),
    paddingVertical: viewportHeightPercent(1),
    paddingHorizontal: viewportWidthPercent(5),
    marginHorizontal: viewportWidthPercent(5),
  },
  bottomContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(5),
    paddingVertical: viewportHeightPercent(1.7),
    height: viewportHeightPercent(23),
    justifyContent: 'center',
    backgroundColor: Colors.cardLightGray,
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tablePaddingHorizontal,
    height: viewportHeightPercent(7.4),
    backgroundColor: Colors.accordianHeaderGray,
    borderBottomWidth: 1,
    borderBottomColor: Colors.placeholderGray,
    // marginBottom: viewportWidthPercent(3),
    marginHorizontal: viewportWidthPercent(5),
  },
  headerCurrency: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerAmount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerDollars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: viewportWidthPercent(2),
  },
  headerText: {
    fontWeight: '200',
    color: Colors.labelWhite,
  },
  headerIcon: {
    color: Colors.labelWhite,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: viewportWidthPercent(25),
    paddingBottom: viewportHeightPercent(2),
    backgroundColor: Colors.accordianContentGray,
    paddingHorizontal: tablePaddingHorizontal,
  },
  subHeader: {
    flexDirection: 'row',
    marginTop: viewportHeightPercent(3),
    marginHorizontal: viewportWidthPercent(5),
  },
  subHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBar: {
    width: viewportWidthPercent(2),
    height: viewportWidthPercent(6),
    borderRadius: viewportWidthPercent(2) / 2,
    backgroundColor: '#7152FF',
    marginRight: viewportWidthPercent(2),
  },
  subHeaderRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  subHeaderText: {
    fontSize: 20,
    color: Colors.labelWhite,
  },
  scrollViewContainer: {
    flex: 1,
  },
  AccordionContainer: {
    backgroundColor: Colors.cardLightGray,
    borderRadius: viewportWidthPercent(4),
    marginTop: viewportHeightPercent(3),
    marginHorizontal: viewportWidthPercent(5),
  },
  AccordionBottomSpace: {
    height: viewportHeightPercent(10),
  },
  icon: {
    fontSize: 27,
    color: Colors.labelWhite,
    marginRight: viewportWidthPercent(4),
  },
  storeCurrencyImg: {
    width: 20,
    height: 23,
    resizeMode: 'contain',
    marginRight: viewportWidthPercent(1),
  },
});


class WalletList extends React.Component {
  static propTypes = {
    storeWallet: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ),
    mainWallet: PropTypes.shape({
      currencyName: PropTypes.string,
      availBalance: PropTypes.number,
    }),
    onChoose: PropTypes.func.isRequired,
    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }).isRequired,
  }

  static defaultProps = {
    storeWallet: [],
    mainWallet: {},
  }

  state = {
    activeSections: [],
  };

  _handleTransfer = async (storeId) => {
    const { onChoose } = this.props;
    await onChoose(storeId);
    Actions.transfer();
  }

  _handleHistory = async (storeId) => {
    const { onChoose } = this.props;
    await onChoose(storeId);
    Actions.transHistory();
  }

  _handleExchange = () => {
    Actions.exchange();
  }

  _handleQRcode = async (storeId) => {
    const { user, onChoose } = this.props;
    const qrCodeData = {
      type: 'pay',
      account: user.account,
      storeId: storeId,
      amount: 0,
    };
    await onChoose(storeId);
    Actions.qrCodePay({ qrCodeData: qrCodeData });
  }

  _renderHeader = section => (
    <View style={styles.headerContainer}>
      <View style={styles.headerCurrency}>
        <Text style={styles.headerText}>{section.currencyName}</Text>
      </View>
      <View style={styles.headerAmount}>
        <View style={styles.headerDollars}>
          <Image source={require('../../../img/walletList/mainSoul.png')} style={styles.storeCurrencyImg} />
          <Text style={styles.headerText}>
            {section.availBalance}
          </Text>
        </View>
        <Icon type="FontAwesome" name="angle-down" style={styles.headerIcon} />
      </View>
    </View>
  );

  _renderContent = section => (
    <View style={styles.contentContainer}>
      <ImageButton imgType="qrCode" text="QR碼" textColor={Colors.labelWhite} onPress={() => this._handleQRcode(section.storeId)} />
      <ImageButton imgType="transfer" text="轉帳" textColor={Colors.labelWhite} onPress={() => this._handleTransfer(section.storeId)} />
      <ImageButton imgType="record" text="交易紀錄" textColor={Colors.labelWhite} onPress={() => this._handleHistory(section.storeId)} />
    </View>
  );

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    const { storeWallet, mainWallet } = this.props;
    const { activeSections } = this.state;

    return (
      <View style={styles.layoutContainer}>
        <View style={styles.container}>
          <ImageBackground style={styles.bkImg} source={require('../../../img/walletList/mainCurrency_bk.png')}>
            <NavBar title="我的錢包" />
            <View style={styles.mainCurrencyContainer}>
              <Image source={require('../../../img/walletList/mainSoul.png')} style={styles.mainCurrencyImg} />
              <Text style={styles.mainCurrency}>{mainWallet.availBalance}</Text>
            </View>
          </ImageBackground>
          <ImageBackground style={styles.bkImg} source={require('../../../img/walletList/mainButton_bk.png')}>
            <View style={styles.buttonContainer}>
              <ImageButton imgType="qrCode" text="QR碼" textColor={Colors.labelWhite} onPress={() => this._handleQRcode(-1)} />
              <ImageButton imgType="transfer" text="轉帳" textColor={Colors.labelWhite} onPress={() => this._handleTransfer(mainWallet.storeId)} />
              <ImageButton imgType="record" text="交易紀錄" textColor={Colors.labelWhite} onPress={() => this._handleHistory(mainWallet.storeId)} />
              <ImageButton imgType="exchange" text="兌換" textColor={Colors.labelWhite} onPress={() => this._handleExchange()} />
            </View>
          </ImageBackground>
          
          <ImageBackground style={[styles.bkImg, { flex: 1, flexDirection: 'column' }]} source={require('../../../img/walletList/content_bk.png')}>
            <View style={styles.subHeader}>
              <View style={styles.subHeaderLeft}>
                <View style={styles.colorBar} />
                <Text style={styles.subHeaderText}> 錢包列表 </Text>
              </View>
              <View style={styles.subHeaderRight}>
                <TouchableOpacity onPress={() => (Actions.addStore())}>
                  <Icon name="plus" type="AntDesign" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView style={styles.scrollViewContainer}>
              <View style={styles.AccordionContainer}>
                <Accordion
                  sections={storeWallet}
                  activeSections={activeSections}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  onChange={this._updateSections}
                />
              </View>
              <View style={styles.AccordionBottomSpace} />
            </ScrollView>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default WalletList;
