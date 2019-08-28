import React, { Component } from 'react';
import {
  View, Text, StyleSheet, PanResponder, Image, ImageBackground, TextInput, Keyboard, Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import Colors from '../../constants/colors';
import { viewportWidthPercent, PreventDoubleClickTO, PreventDoubleClickTH } from '../../lib/util';
import { formStyle } from '../../lib/styles';

const barLength = viewportWidthPercent(70);
const midControlBarWidth = 9;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  dismissButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: -30,
    marginLeft: viewportWidthPercent(90) - 40,
    zIndex: 9998,
    width: 50,
  },
  dismissButton: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    flexDirection: 'column',
    backgroundColor: '#2B2B2B',
    width: viewportWidthPercent(90),
    height: viewportWidthPercent(90) * 1.25,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: Colors.labelGold,
    padding: 2,
  },
  innerFrame: {
    borderWidth: 2,
    borderColor: '#D5C37D',
    borderRadius: 3,
    width: '100%',
    height: '100%',
  },
  headerImgContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: -4,
    borderRadius: 3,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDiamondImg: {
    width: 10,
    height: 10,
    alignSelf: 'center',
  },
  headerText: {
    color: Colors.labelGold,
    fontSize: 20,
    marginHorizontal: 5,
  },
  infoBoardbkImg: {
    flex: 2,
    flexDirection: 'column',
    marginHorizontal: 2,
    paddingHorizontal: 10,
  },
  currencyInfoContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  currencyInfo: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeCurrencyImg: {
    marginLeft: 5,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  currencyText: {
    marginLeft: 5,
    fontSize: 15,
    color: '#D8D8D8',
  },
  exchangRateContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  exchangeRateText: {
    color: '#E2D4BD',
    fontSize: 10,
  },
  amountContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountBarbkImg: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: viewportWidthPercent(36),
    height: viewportWidthPercent(10),
    resizeMode: 'cover',
  },
  amountText: {
    color: Colors.labelWhite,
    fontSize: 15,
  },
  amountSelectedContainer: {
    flex: 2,
    height: '45%',
    alignItems: 'center',
    paddingVertical: viewportWidthPercent(5),
  },
  amountSelectedInnerFrame: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.labelGold,
    borderRadius: 5,
    height: '90%',
    paddingHorizontal: 10,
  },
  amountSelectedHeader: {
    flex: 2,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountTextInputContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  amountTextInput: {
    width: viewportWidthPercent(40),
    height: viewportWidthPercent(7),
    backgroundColor: 'white',
  },
  amountScrollBarContainer: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  amountScrollBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: barLength,
    height: 18,
  },
  leftProgress: {
    height: 10,
    marginTop: 4,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: Colors.labelGold,
    backgroundColor: Colors.labelGold,
  },
  midControlBar: {
    height: 18,
    width: midControlBarWidth,
    position: 'absolute',
    borderRadius: 3,
  },
  rightProgress: {
    height: 10,
    marginTop: 4,
    position: 'absolute',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: Colors.labelGold,
    borderLeftWidth: 0,
    borderLeftColor: 'transparent',
  },
  progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: barLength,
  },
  confirmButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: viewportWidthPercent(40),
    marginLeft: viewportWidthPercent(50) - 20,
  },
  confirmButtonbkImg: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: viewportWidthPercent(45),
    height: viewportWidthPercent(10),
  },

});

class TakeInModal extends Component {
  static propTypes = {
    userTakeIn: PropTypes.func.isRequired,
    getWalletsList: PropTypes.func.isRequired,
    updateUserCurWallet: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
    visibleModal: PropTypes.bool.isRequired,
    selectedGameIdx: PropTypes.number,
    gameList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        code: PropTypes.string,
        provider: PropTypes.string,
        imageSrc: PropTypes.string,
      }),
    ),
    curWallet: PropTypes.shape({
      currencyName: PropTypes.string,
      availBalance: PropTypes.number,
      currencySrc: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    gameList: [],
    selectedGameIdx: -1,
  };

  constructor(props) {
    super(props);
    this.state = {
      marginLeft: 0,
      amount: '0',
      gameWalletAmount: '0',
      backgroundColor: 'white',
      amountMsg: '',
      buttonDisable: false,
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this._highlight();
      },
      onPanResponderMove: (evt, gestureState) => {
        let position = evt.nativeEvent.pageX - viewportWidthPercent(15);
        if (position <= 0) position = 0;
        if (position >= (barLength - 9)) position = barLength - 9;
        this.setState({
          marginLeft: Math.floor(position),
        });
        this._handleScroll();
      },
      onPanResponderRelease: (evt, gestureState) => {
        this._unhighlight();
      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
    });
  }

  _handleScroll = () => {
    const { curWallet } = this.props;
    const { marginLeft } = this.state;
    const percent = marginLeft / (barLength - 9);
    const amount = Math.floor(curWallet.availBalance * percent).toString(); // storeCurrency
    const gameWalletAmount = Math.floor(amount / curWallet.exchangeRate).toString(); // gameCurrency
    this.setState({ amount: amount, gameWalletAmount: gameWalletAmount });
  }

  _handleChange = (val) => {
    const { curWallet } = this.props;
    // If empty
    if (!val) {
      this.setState({ amount: '0', gameWalletAmount: '', marginLeft: 0 });
      return;
    }

    let parsedVal = parseInt(val, 10); // gameCurrency
    let parsedStoreVal = Math.ceil(val * curWallet.exchangeRate);

    // check availabe
    if (parsedStoreVal > curWallet.availBalance) {
      parsedStoreVal = curWallet.availBalance;
      parsedVal = Math.floor(parsedStoreVal / curWallet.exchangeRate);
    }

    const marginLeft = barLength * (parsedStoreVal / curWallet.availBalance);
    this.setState({ amount: parsedStoreVal.toString(), gameWalletAmount: parsedVal.toString(), marginLeft: marginLeft });
  }

  _handleTakeIn = async () => {
    const { userTakeIn, gameList, curWallet, getWalletsList, updateUserCurWallet, dismissModal, selectedGameIdx } = this.props;
    const { amount } = this.state;
    const parsedVal = parseInt(amount, 10);
    const targetGame = gameList.find((e) => e.id === selectedGameIdx);
    this.setState({ amountMsg: '', buttonDisable: true });
    // check amount
    if (parsedVal === 0) {
      this.setState({ amountMsg: '攜入數量需大於0' });
      return;
    }

    const formData = {
      gameId: targetGame.id,
      storeId: curWallet.storeId,
      amount: amount,
    };
    const result = await userTakeIn(formData);
    if (!result) return;
    // go to the game website according to the url
    const url = result.data;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
    // update curWallet available
    await getWalletsList();
    updateUserCurWallet();
    this.setState({ buttonDisable: false });
    dismissModal();
  }

  _unhighlight() {
    this.setState({
      backgroundColor: 'white',
    });
  }

  _highlight() {
    this.setState({
      backgroundColor: Colors.labelLightGray,
    });
  }

  render = () => {
    const { visibleModal, dismissModal, gameList, curWallet, selectedGameIdx } = this.props;
    const { marginLeft, backgroundColor, amount, gameWalletAmount, amountMsg, buttonDisable } = this.state;
    const targetGame = gameList.find((e) => e.id === selectedGameIdx);
    const gameName = (targetGame) ? targetGame.name : '';
    const uri = curWallet.currencySrc !== '' ? ({ uri: curWallet.currencySrc }) : (require('../../../img/storeCurrency.png'));
    return (
      <Modal
        backdropOpacity={0.8}
        isVisible={visibleModal}
        animationOut="fadeOut"
        animationOutTiming={100}
        onBackdropPress={dismissModal}
        onBackButtonPress={dismissModal}
        style={styles.container}
      >
        <PreventDoubleClickTO
          style={styles.dismissButtonContainer}
          onPress={dismissModal}
        >
          <Image source={require('../../../img/takeInModal/closeButton.png')} style={styles.dismissButton} />
        </PreventDoubleClickTO>
        <View
          style={styles.modalContainer}
        >
          <View style={styles.innerFrame}>
            <ImageBackground
              style={styles.headerImgContainer}
              source={require('../../../img/takeInModal/headBar.png')}
              resizeMode="stretch"
            >
              <View style={styles.headerContainer}>
                <Image source={require('../../../img/takeInModal/diamond.png')} style={styles.headerDiamondImg} />
                <Text style={styles.headerText}>{gameName}</Text>
                <Image source={require('../../../img/takeInModal/diamond.png')} style={styles.headerDiamondImg} />
              </View>
            </ImageBackground>
            <ImageBackground
              style={styles.infoBoardbkImg}
              source={require('../../../img/takeInModal/infoBoard.png')}
            >
              <View style={styles.currencyInfoContainer}>
                <View style={styles.currencyInfo}>
                  <Image source={require('../../../img/takeInModal/dot.png')} />
                  <Image source={uri} style={styles.storeCurrencyImg} />
                  <Text style={styles.currencyText}>{curWallet.currencyName}</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <Image source={require('../../../img/takeInModal/exchange.png')} />
                </View>
                <View style={styles.currencyInfo}>
                  <Image source={require('../../../img/takeInModal/dot.png')} />
                  <Image source={require('../../../img/takeInModal/gameCoin.png')} style={{ marginLeft: 5 }}/>
                  <Text style={styles.currencyText}>遊戲幣</Text>
                </View>
              </View>
              <View style={styles.exchangRateContainer}>
                <Text style={styles.exchangeRateText}>{curWallet.exchangeRate}{curWallet.currencyName}＝1遊戲幣</Text>
              </View>
              <View style={styles.amountContainer}>
                <ImageBackground source={require('../../../img/takeInModal/amountContainer.png')} style={styles.amountBarbkImg}>
                  <Text style={styles.amountText}>{amount}</Text>
                </ImageBackground>
                <ImageBackground source={require('../../../img/takeInModal/amountContainer.png')} style={styles.amountBarbkImg}>
                  <Text style={styles.amountText}>{gameWalletAmount}</Text>
                </ImageBackground>
              </View>
            </ImageBackground>
            <View style={styles.amountSelectedContainer}>
              <View style={styles.amountSelectedInnerFrame}>
                <View style={styles.amountSelectedHeader}>
                  <Text style={{ ...styles.amountText, marginTop: 5 }}>帶入遊戲幣</Text>
                </View>
                <View style={styles.amountTextInputContainer}>
                  <TextInput
                    style={styles.amountTextInput}
                    textAlign="center"
                    autoCapitalize="none"
                    placeholder="請輸入轉帳數量"
                    placeholderTextColor={Colors.placeholderGray}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    onChangeText={v => this._handleChange(v)}
                    onSubmitEditing={Keyboard.dismiss}
                    value={gameWalletAmount.toString()}
                  />
                  <Text style={formStyle.valText}>{amountMsg}</Text>
                </View>
                <View style={styles.amountScrollBarContainer} {...this._panResponder.panHandlers}>
                  <View style={styles.amountScrollBar}>
                    <View style={{ ...styles.leftProgress, width: marginLeft }} />
                    <View style={{ ...styles.midControlBar, left: marginLeft, backgroundColor: backgroundColor }} />
                    <View style={{ ...styles.rightProgress, left: marginLeft + 9, width: barLength - (marginLeft + 9), borderWidth: (marginLeft >= (barLength - 10)) ? 0 : 1 }} />
                  </View>
                  <View style={styles.progressTextContainer}>
                    <Text style={{ color: Colors.labelWhite }}>0%</Text>
                    <Text style={{ color: Colors.labelWhite }}>50%</Text>
                    <Text style={{ color: Colors.labelWhite }}>100%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <PreventDoubleClickTH
          style={styles.confirmButtonContainer}
          onPress={() => this._handleTakeIn()}
          disable={buttonDisable}
          activeOpacity={buttonDisable ? 1 : 0.5}
        >
          <ImageBackground source={require('../../../img/takeInModal/confirmButton.png')} style={styles.confirmButtonbkImg}>
            <Text style={{ ...styles.amountText, color: Colors.labelWhite }}>確認攜入</Text>
          </ImageBackground>
        </PreventDoubleClickTH>
      </Modal>
    );
  }
}

export default TakeInModal;
