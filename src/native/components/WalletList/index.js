import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  Text, Card, Icon, View,
} from 'native-base';
import { LinearGradient } from 'expo';

import {
  StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Colors from '../../constants/colors';
import IconButton from './IconButton';

import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const tablePaddingHorizontal = viewportWidthPercent(2);

const styles = StyleSheet.create({

  layoutContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: viewportWidthPercent(5),
    paddingTop: viewportHeightPercent(3),
    backgroundColor: Colors.backgroundBlack,
  },

  topContainer: {
    flex: 3,
  },

  bottomContainer: {
    // flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(5),
    paddingVertical: viewportHeightPercent(1.7),
    height: viewportHeightPercent(23),
    justifyContent: 'center',
    backgroundColor: Colors.backgroundGray,
    borderRadius: 20,
  },

  cardItem: {
    flex: 1,
    flexDirection: 'row',
  },

  button: {
    flex: 1,
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topIcon: {
    flex: 1,
  },

  topText: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 40,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '50%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tablePaddingHorizontal,
    height: viewportHeightPercent(7.4),
    marginTop: viewportHeightPercent(2),
    backgroundColor: Colors.backgroundGray,
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
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: viewportHeightPercent(1),
    paddingBottom: viewportHeightPercent(2),
    backgroundColor: Colors.backgroundGray,
    paddingHorizontal: tablePaddingHorizontal,
    borderTopWidth: 2,
    borderTopColor: '#2E302F',
  },
  contentLeft: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: viewportWidthPercent(2),
  },
  contentRight: {
    flex: 7,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: viewportWidthPercent(2),
  },
  subHeader: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: viewportHeightPercent(3),
  },
  subHeaderLeft: {
    flex: 1,
  },
  subHeaderRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  subHeaderText: {
    fontSize: 20,
    color: Colors.labelWhite,
    // marginBottom: 20,
  },
  mainCurrency: {
    fontSize: 30,
    color: Colors.labelWhite,
    marginTop: viewportHeightPercent(2),
  },
  mainDiamond: {
    fontSize: 22,
    color: Colors.labelWhite,
    marginTop: viewportHeightPercent(2),
    marginRight: viewportWidthPercent(5),
  },
  icon: {
    fontSize: 30,
    color: Colors.labelWhite,
  },
  headerDiamondIcon: {
    fontSize: 12,
    color: Colors.labelWhite,
    marginRight: viewportWidthPercent(2),
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

  _handleQRcode = (storeId) => {
    const { user } = this.props;
    const qrCodeData = {
      type: 'pay',
      account: user.account,
      storeId: storeId,
      amount: 0,
    };
    Actions.qrCodePay({ qrCodeData: qrCodeData });
    // Actions.qrCodePay();
  }

  _renderHeader = section => (
    <View style={styles.headerContainer}>
      <View style={styles.headerCurrency}>
        <Text style={styles.headerText}>{section.currencyName}</Text>
      </View>
      <View style={styles.headerAmount}>
        <View style={styles.headerDollars}>
          <Icon name="diamond" type="SimpleLineIcons" style={styles.headerDiamondIcon} />
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
      <IconButton iconName="qrcode" iconType="AntDesign" iconColor={Colors.labelLightGray} text="QR碼" onPress={() => this._handleQRcode(section.storeId)} />
      <IconButton iconName="swap" iconColor={Colors.labelLightGray} text="轉帳" onPress={() => this._handleTransfer(section.storeId)} />
      <IconButton iconName="dollar" iconType="FontAwesome" iconColor={Colors.labelLightGray} text="交易紀錄" onPress={() => this._handleHistory(section.storeId)} />
    </View>
  );

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    const { storeWallet, mainWallet } = this.props;
    const { activeSections } = this.state;

    return (
      <ScrollView style={styles.layoutContainer}>
        <LinearGradient
          colors={['#32BBDB', '#2372B5', '#255EAB']}
          style={styles.bottomContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.buttonContainer}>
            <Icon name="diamond" type="SimpleLineIcons" style={styles.mainDiamond} />
            <Text style={styles.mainCurrency}>{mainWallet.availBalance}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <IconButton iconName="qrcode" iconType="AntDesign" text="QR碼" iconColor={Colors.labelWhite} onPress={() => this._handleQRcode(-1)} />
            <IconButton text="轉帳" iconName="swap" iconColor={Colors.labelWhite} onPress={() => this._handleTransfer(mainWallet.storeId)} />
            <IconButton iconName="dollar" iconType="FontAwesome" text="交易紀錄" iconColor={Colors.labelWhite} onPress={() => this._handleHistory(mainWallet.storeId)} />
            {/* <IconButton iconName="bank" iconType="MaterialCommunityIcons" text="匯兌" iconColor={Colors.labelWhite} onPress={() => Actions.coupons()} /> */}
          </View>
        </LinearGradient>
        <View style={styles.subHeader}>
          <View style={styles.subHeaderLeft}>
            <Text style={styles.subHeaderText}> 錢包列表 </Text>
          </View>
          <View style={styles.subHeaderRight}>
            <TouchableOpacity onPress={() => (Actions.addStore())}>
              <Icon name="plus" type="AntDesign" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <Accordion
          sections={storeWallet}
          activeSections={activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </ScrollView>
    );
  }
}

export default WalletList;
