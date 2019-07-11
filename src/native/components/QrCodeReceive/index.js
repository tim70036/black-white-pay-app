import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  Picker,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Picker as IosPicker, Icon } from 'native-base';
import Modal from 'react-native-modal';
import ModalSelector from 'react-native-modal-selector';
import { viewportWidthPercent, viewportHeightPercent, IS_IOS } from '../../lib/util';
import { amountValidate, commentValidate } from '../../lib/validate';
import NavBar from '../NavBar';
import Colors from '../../constants/colors';
import { formStyle, elementColors } from '../../lib/styles';

const styles = StyleSheet.create({
  bkContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: viewportHeightPercent(5),
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: viewportWidthPercent(80),
    borderRadius: viewportWidthPercent(5),
    backgroundColor: Colors.cardLightGray,
    paddingVertical: viewportHeightPercent(2),
  },
  currencyInput: {
    flex: 1,
    flexDirection: 'column',
    width: '80%',
    marginTop: 15,
  },
  currencyInputText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: viewportWidthPercent(6),
  },
  dot: {
    height: viewportHeightPercent(1),
    width: viewportHeightPercent(1),
    borderRadius: viewportHeightPercent(1) / 2,
    marginRight: viewportHeightPercent(1),
  },
  picker: {
    flexDirection: 'row',
    color: Colors.labelWhite,
    height: 35,
    width: '100%',
    alignItems: 'center',
    marginLeft: '15%',
  },
  amountInput: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: viewportWidthPercent(5),
  },
  textinput: {
    color: Colors.labelWhite,
    fontSize: 15,
    height: 35,
    width: '70%',
    marginHorizontal: '15%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.placeholderGray,
    paddingVertical: viewportHeightPercent(1),
  },
  labeltext: {
    color: Colors.labelWhite,
    marginVertical: 2,
    marginLeft: 4,
    fontSize: 20,
  },
  inputButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: viewportHeightPercent(1),
    paddingBottom: viewportHeightPercent(2),
  },
  qrCodeContainer: {
    width: viewportWidthPercent(100),
    // marginTop: viewportHeightPercent(2),
    paddingTop: viewportWidthPercent(10),
    borderRadius: viewportWidthPercent(5),
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.cardLightGray,
  },
  emptySpace: {
    backgroundColor: Colors.cardGray,
  },
  qrCode: {
    overflow: 'hidden',
    borderWidth: 2,
  },
  qrTextContainer: {
    height: viewportHeightPercent(10),
    width: viewportWidthPercent(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.labelLightGray,
  },
  valText: {
    color: Colors.labelRed,
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 3,
  },
  linearGradient: {
    marginTop: 5,
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: viewportHeightPercent(5),
    borderRadius: 36.5,

    shadowColor: '#D3BD99',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.44,
    shadowRadius: 37,
    elevation: 14,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36.5,
  },
  buttonText: {
    color: Colors.labelWhite,
    fontSize: 18,
  },
  icon: {
    fontSize: 25,
  },
  commentInputText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  closeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',

    // borderColor: 'red',
    // borderWidth: 2,
  },
});

class QrCodeReceive extends Component {
  static propTypes = {
    account: PropTypes.string.isRequired,
    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ).isRequired,
    qrCodeReceive: PropTypes.shape({
      storeId: PropTypes.number,
      amount: PropTypes.string,
      comment: PropTypes.string,
    }).isRequired,
    onChoose: PropTypes.func.isRequired,
    setqrCodeReceive: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      qrCodeData: {
        type: 'receive',
        amount: '',
        account: '',
        comment: '',
        storeId: -1,
      },
      amount: props.qrCodeReceive.amount,
      amountMsg: '',
      comment: props.qrCodeReceive.comment,
      commentMsg: '',
      visibleModal: false,
      currencyName: '請選擇幣別',
    };
    const { walletsData, qrCodeReceive } = this.props;
    walletsData.map((obj) => {
      if (obj.storeId === qrCodeReceive.storeId) {
        this.state.currencyName = obj.currencyName;
      }
    });
  }

  _handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  _handleChoose = async (storeId) => {
    const { onChoose } = this.props;
    await onChoose(storeId);
  }

  _handleRerender = async () => {
    const { qrCodeReceive, setqrCodeReceive, account } = this.props;
    const { qrCodeData, amount, comment } = this.state;
    const amountResult = amountValidate(amount);
    const commentResult = commentValidate(comment);

    if (amountResult.result) {
      this.setState({ amountMsg: '' });
    } else {
      this.setState({ amountMsg: amountResult.errMsg });
      return false;
    }

    if (commentResult.result) {
      this.setState({ commentMsg: '' });
    } else {
      this.setState({ commentMsg: commentResult.errMsg });
      return false;
    }

    const newQrCodeData = {
      ...qrCodeData,
      account: account,
      storeId: qrCodeReceive.storeId,
      amount: amount,
      comment: comment,
    };
    this.setState({ qrCodeData: newQrCodeData, visibleModal: true });
    await setqrCodeReceive(newQrCodeData);
  }

  rednerQrCode = () => {
    const { qrCodeData, visibleModal } = this.state;
    const showSize = (visibleModal) ? viewportWidthPercent(95) : 0;
    return (
      <View>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={() => this.setState({ visibleModal: !visibleModal })}>
            <Icon name="md-close-circle-outline" type="Ionicons" style={{ fontSize: 45, color: Colors.labelWhite }} />
          </TouchableOpacity>
        </View>
        <View style={styles.qrCodeContainer}>
          <View style={[styles.qrCode, { borderColor: Colors.labelWhite, borderWidth: 1 }]}>
            <QRCode
              value={JSON.stringify(qrCodeData)}
              size={showSize}
              bgColor="#090909"
              fgColor={Colors.labelWhite}
            />
          </View>
          <View style={styles.qrTextContainer}>
            <Text style={styles.text}>請掃描上面的 QR Code</Text>
          </View>
        </View>
      </View>
    );
  }

  render = () => {
    const { walletsData } = this.props;
    const { amountMsg, amount, comment, commentMsg, visibleModal, currencyName } = this.state;

    return (
      <ImageBackground style={styles.bkContainer} source={require('../../../img/background/background2.png')}>
        <ScrollView>
          <NavBar title="收款" back />
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <View style={styles.currencyInput}>
                <View style={styles.currencyInputText}>
                  <View style={[styles.dot, { backgroundColor: '#FF7F34' }]} />
                  <Text style={styles.labeltext}>幣別選擇</Text>
                </View>
                <ModalSelector
                  cancelText="取消"
                  data={walletsData}
                  keyExtractor={item => item.storeId}
                  labelExtractor={item => item.currencyName}
                  selectTextStyle={{ color: Colors.labelWhite }}
                  selectStyle={{ borderWidth: 0 }}
                  optionContainerStyle={{ backgroundColor: '#CCCCCC' }}
                  cancelContainerStyle={{ backgroundColor: '#CCCCCC' }}
                  touchableActiveOpacity={0.7}
                  onChange={(item) => {
                    this._handleChoose(item.storeId);
                    this.setState({ currencyName: item.currencyName });
                  }}
                >
                  <View style={styles.picker}>
                    <Text style={{ ...formStyle.inputText, fontSize: 18 }}>{currencyName}</Text>
                    <Icon name="md-arrow-dropdown" type="Ionicons" style={[styles.icon, { color: 'white', marginLeft: 10 }]} />
                  </View>
                </ModalSelector>
              </View>
              <View style={styles.currencyInput}>
                <View style={styles.currencyInputText}>
                  <View style={[styles.dot, { backgroundColor: '#3AF8D2' }]} />
                  <Text style={styles.labeltext}>收款數量</Text>
                </View>
                <TextInput
                  style={styles.textinput}
                  autoCapitalize="none"
                  placeholder="輸入收款數量"
                  placeholderTextColor={Colors.placeholderGray}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  onChangeText={v => this._handleChange('amount', v)}
                  onSubmitEditing={Keyboard.dsmiss}
                  value={amount}
                />
              </View>
              <View style={styles.valTextContainer}>
                <Text style={styles.valText}>{amountMsg}</Text>
              </View>
              <View style={styles.currencyInput}>
                <View style={styles.currencyInputText}>
                  <View style={[styles.dot, { backgroundColor: '#A500CC' }]} />
                  <Text style={styles.labeltext}>備註</Text>
                </View>
                <TextInput
                  style={styles.textinput}
                  autoCapitalize="none"
                  placeholder="輸入備註"
                  placeholderTextColor={Colors.placeholderGray}
                  keyboardType="default"
                  returnKeyType="done"
                  onChangeText={v => this._handleChange('comment', v)}
                  onSubmitEditing={Keyboard.dismiss}
                  value={comment}
                />
              </View>
              <View style={styles.valTextContainer}>
                <Text style={styles.valText}>{commentMsg}</Text>
              </View>
              <View style={styles.inputButton}>
                <LinearGradient
                  colors={elementColors.buttonLinearGradient}
                  style={styles.linearGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this._handleRerender}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.buttonText}>產生QRcode</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
            <Modal
              backdropOpacity={0.8}
              isVisible={visibleModal}
              animationOut="fadeOut"
              animationOutTiming={100}
              onBackdropPress={() => this.setState({ visibleModal: !visibleModal })}
              onBackButtonPress={() => this.setState({ visibleModal: !visibleModal })}
              style={styles.modalContainer}
            >
              {this.rednerQrCode()}
            </Modal>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  };
}

export default QrCodeReceive;
