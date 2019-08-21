import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Icon } from 'native-base';
import Modal from 'react-native-modal';
import ModalSelector from 'react-native-modal-selector';

import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import { amountValidate, commentValidate } from '../../lib/validate';
import Colors from '../../constants/colors';
import { formStyle, elementColors } from '../../lib/styles';
import DefaultProps from '../../constants/default';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(5),
    paddingTop: 20,
  },
  storeIdCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: viewportWidthPercent(90),
    borderRadius: viewportWidthPercent(5),
    paddingVertical: viewportHeightPercent(2),
    paddingLeft: 24,
    backgroundColor: Colors.cardLightGray,
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: viewportWidthPercent(90),
    borderRadius: viewportWidthPercent(5), // 15
    marginTop: viewportHeightPercent(2), // 15
    paddingVertical: viewportHeightPercent(2), // 18
    paddingHorizontal: 24,
    backgroundColor: Colors.cardLightGray,
  },
  picker: {
    flexDirection: 'row',
    color: Colors.labelWhite,
    height: 35,
    width: viewportWidthPercent(55),
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: '15%',
  },
  textinput: {
    color: Colors.labelWhite,
    fontSize: 15,
    height: 35,
    width: '100%',
    // marginHorizontal: '15%',
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.placeholderGray,
    // paddingVertical: viewportHeightPercent(1),
  },
  labeltext: {
    color: Colors.labelWhite,
    marginVertical: 2,
    // marginLeft: 4,
    fontSize: 20,
  },
  inputButton: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: viewportHeightPercent(2),
    // paddingTop: viewportHeightPercent(1),
    // paddingBottom: viewportHeightPercent(2),
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
    // marginTop: viewportHeightPercent(5),
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 58,
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
  AddButton: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: viewportWidthPercent(76.5),
    height: viewportHeightPercent(9),
    borderRadius: 36.5,
    backgroundColor: Colors.cardLightGray,
  },
  buttonText: {
    color: Colors.labelWhite,
    fontSize: 18,
  },
  icon: {
    fontSize: 25,
  },
  QrCodeCloseIcon: {
    fontSize: 45,
    color: Colors.labelWhite,
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

class QrCodeRender extends Component {
    static propTypes = {
      // account: PropTypes.string.isRequired,
      walletsData: PropTypes.arrayOf(
        PropTypes.shape({
          currencyName: PropTypes.string,
          availBalance: PropTypes.number,
        }),
      ).isRequired,
      curQrReceive: PropTypes.shape({
        storeId: PropTypes.number,
        amount: PropTypes.string,
        comment: PropTypes.string,
      }).isRequired,
      // setqrCodeReceive: PropTypes.func.isRequired,
      addFavoriteItem: PropTypes.func.isRequired,
      qrStoreIdHandler: PropTypes.func.isRequired,
      qrAmountHandler: PropTypes.func.isRequired,
      qrCommentHandler: PropTypes.func.isRequired,
    }

    constructor(props) {
      super(props);
      this.state = {
        amountMsg: '',
        commentMsg: '',
        visibleModal: false,
      };
    }

    _handleChange = (type, val) => {
      const { qrStoreIdHandler, qrAmountHandler, qrCommentHandler } = this.props;
      if (type === 'storeId') qrStoreIdHandler(val);
      if (type === 'amount') qrAmountHandler(val);
      if (type === 'comment') qrCommentHandler(val);
    }

    _handleInputValidate = () => {
      const { curQrReceive } = this.props;
      const amountResult = amountValidate(curQrReceive.amount);
      const commentResult = commentValidate(curQrReceive.comment);

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
      return true;
    }

    _handleRerender = () => {
      if (this._handleInputValidate()) this.setState({ visibleModal: true });
    }

    _handleAddFavorite = async () => {
      if (!this._handleInputValidate()) return;
      const { curQrReceive, addFavoriteItem } = this.props;
      await addFavoriteItem(curQrReceive);
    }

    _renderValidateMsg = (type) => {
      const { amountMsg, commentMsg } = this.state;
      if (type === 'amount' && amountMsg) return (<Text style={styles.valText}>{amountMsg}</Text>);
      if (type === 'comment' && commentMsg) return (<Text style={styles.valText}>{commentMsg}</Text>);
    }

    _rednerQrCode = () => {
      const { curQrReceive } = this.props;
      const { visibleModal } = this.state;
      const showSize = (visibleModal) ? viewportWidthPercent(90) : 0;
      return (
        <View>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={() => this.setState({ visibleModal: !visibleModal })}>
              <Icon name="md-close-circle-outline" type="Ionicons" style={styles.QrCodeCloseIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.qrCodeContainer}>
            <View style={[styles.qrCode, { borderColor: Colors.labelWhite, borderWidth: 5 }]}>
              <QRCode
                value={JSON.stringify(curQrReceive)}
                size={showSize}
                bgColor="black"
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
      const { walletsData, curQrReceive } = this.props;
      const { visibleModal } = this.state;
      const { currencyName } = walletsData.find(e => e.storeId === curQrReceive.storeId);
      
      return (
        <View style={styles.container}>
          <View style={styles.storeIdCardContainer}>
            <Text style={styles.labeltext}>幣別選擇</Text>
            <ModalSelector
              cancelText="取消"
              data={walletsData}
              keyExtractor={item => item.storeId}
              labelExtractor={item => item.currencyName}
              onChange={item => this._handleChange('storeId', item.storeId)}
              {...DefaultProps.modalSelectorProps}
            >
              <View style={styles.picker}>
                <View style={{ flex: 10, alignItems: 'center' }}>
                  <Text style={styles.labeltext}>{currencyName}</Text>
                </View>
                <Icon name="md-arrow-dropdown" type="Ionicons" style={[styles.icon, { color: 'white', marginLeft: 10, flex: 1 }]} />
              </View>
            </ModalSelector>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.labeltext}>收款數量</Text>
            <TextInput
              style={styles.textinput}
              autoCapitalize="none"
              placeholder="輸入收款數量"
              placeholderTextColor={Colors.placeholderGray}
              keyboardType="number-pad"
              returnKeyType="done"
              onChangeText={v => this._handleChange('amount', v)}
              onSubmitEditing={Keyboard.dsmiss}
              value={curQrReceive.amount}
            />
            {this._renderValidateMsg('amount')}
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.labeltext}>備註</Text>
            <TextInput
              style={styles.textinput}
              autoCapitalize="none"
              placeholder="輸入備註"
              placeholderTextColor={Colors.placeholderGray}
              keyboardType="default"
              returnKeyType="done"
              onChangeText={v => this._handleChange('comment', v)}
              onSubmitEditing={Keyboard.dsmiss}
              value={curQrReceive.comment}
            />
            {this._renderValidateMsg('comment')}
          </View>
          <View style={styles.inputButton}>
            <LinearGradient
              colors={elementColors.buttonLinearGradient}
              style={styles.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <TouchableOpacity
                style={formStyle.button}
                onPress={this._handleRerender}
                underlayColor={Colors.buttonGray}
              >
                <Text style={styles.buttonText}>產生QRcode</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.inputButton}>
            <LinearGradient
              colors={[Colors.cardLightGray, Colors.cardLightGray]}
              style={styles.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <TouchableOpacity
                style={formStyle.button}
                onPress={this._handleAddFavorite}
                underlayColor={Colors.buttonGray}
              >
                <Text style={{ ...styles.buttonText, color: Colors.labelGold }}>+ 加入常用收款</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          {/* <View style={styles.inputButton}>
            <TouchableOpacity
              style={styles.AddButton}
              onPress={this._handleAddFavorite}
              underlayColor={Colors.buttonGray}
            >
              <Text style={{ ...styles.buttonText, color: Colors.labelGold }}>+ 加入常用收款</Text>
            </TouchableOpacity>
          </View> */}
          <Modal
            backdropOpacity={0.8}
            isVisible={visibleModal}
            animationOut="fadeOut"
            animationOutTiming={100}
            onBackdropPress={() => this.setState({ visibleModal: !visibleModal })}
            onBackButtonPress={() => this.setState({ visibleModal: !visibleModal })}
            style={styles.modalContainer}
          >
            {this._rednerQrCode()}
          </Modal>
        </View>
      );
    };
}

export default QrCodeRender;
