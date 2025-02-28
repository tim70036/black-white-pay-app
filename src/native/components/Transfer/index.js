import React, { Component } from 'react';
import {
  View,
  Keyboard,
  TextInput,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import ModalSelector from 'react-native-modal-selector';
import NavBar from '../NavBar';
import { formStyle, elementColors } from '../../lib/styles';
import Colors from '../../constants/colors';
import DefaultProps from '../../constants/default';
import { amountValidate, transPwdValidate, accountValidate, commentValidate } from '../../lib/validate';
import {
  viewportHeightPercent,
  PreventDoubleClickTH,
} from '../../lib/util';

const styles = StyleSheet.create({
  inputItem: {
    marginTop: viewportHeightPercent(1),
  },
  picker: {
    flexDirection: 'row',
    color: Colors.labelWhite,
    height: 35,
    width: '100%',
    alignItems: 'center',
    marginLeft: 5,
  },
  linearGradient: {
    marginTop: viewportHeightPercent(5),
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
  icon: {
    fontSize: 25,
  },
  modalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
class Transfer extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    defaultAccount: PropTypes.string.isRequired,
    defaultAmount: PropTypes.string.isRequired,
    defaultComment: PropTypes.string.isRequired,
    curStoreId: PropTypes.number.isRequired,
    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ),
    onChoose: PropTypes.func.isRequired,
  }

  static defaultProps = {
    walletsData: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      accountTo: props.defaultAccount,
      amount: props.defaultAmount,
      transPwd: '',
      comment: props.defaultComment,
      commentMsg: '',
      accountMsg: '',
      amountMsg: '',
      transPwdMsg: '',
    };
  }

  _validate = () => {
    const { accountTo, transPwd, amount, comment } = this.state;

    // do not check account here, since other role's account may not be phone number
    const accountResult = accountValidate(accountTo);
    const amountResult = amountValidate(amount);
    const transPwdResult = transPwdValidate(transPwd);
    const commentResult = commentValidate(comment);

    if (accountResult.result) {
      this.setState({ accountMsg: '' });
    } else {
      this.setState({ accountMsg: accountResult.errMsg });
      return false;
    }

    if (amountResult.result) {
      this.setState({ amountMsg: '' });
    } else {
      this.setState({ amountMsg: amountResult.errMsg });
      return false;
    }

    if (transPwdResult.result) {
      this.setState({ transPwdMsg: '' });
    } else {
      this.setState({ transPwdMsg: transPwdResult.errMsg });
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

  _handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  _handleChoose = async (storeId) => {
    const { onChoose } = this.props;
    await onChoose(storeId);
  }

  _handleSubmit = async () => {
    const { onFormSubmit } = this.props;

    if (this._validate()) {
      const success = await onFormSubmit(this.state);
      if (success) {
        Actions.pop();
      }
    }
  }

  render() {
    const { walletsData, curStoreId } = this.props;
    const { accountTo, amount, comment } = this.state;
    const { accountMsg, amountMsg, transPwdMsg, commentMsg } = this.state;
    let currencyName = '請選擇幣別';
    const targetWallet = walletsData.find((e) => e.storeId === curStoreId);
    if (targetWallet) currencyName = targetWallet.currencyName;

    return (
      <ImageBackground source={require('../../../img/background/background2.png')} style={formStyle.container}>
        <ScrollView>
          <NavBar title="轉帳" back />
          <View style={formStyle.inputContainer}>
            <View style={styles.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/currency.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 幣別選擇</Text>
              </View>
              <ModalSelector
                cancelText="取消"
                data={walletsData}
                keyExtractor={item => item.storeId}
                labelExtractor={item => item.currencyName}
                onChange={(item) => {
                  this._handleChoose(item.storeId);
                  this.setState({ currencyName: item.currencyName });
                }}
                {...DefaultProps.modalSelectorProps}
              >
                <View style={styles.picker}>
                  <Text style={{ ...formStyle.inputText, fontSize: 18 }}>{currencyName}</Text>
                  <Icon name="md-arrow-dropdown" type="Ionicons" style={[styles.icon, { color: 'white', marginLeft: 10 }]} />
                </View>
              </ModalSelector>
            </View>
            <View style={styles.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/account.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 轉入帳號</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請輸入轉入帳號"
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="default"
                returnKeyType="done"
                onChangeText={v => this._handleChange('accountTo', v)}
                onSubmitEditing={Keyboard.dismiss}
                value={accountTo}
              />
              <Text style={formStyle.valText}>{accountMsg}</Text>
            </View>
            <View style={styles.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/transNum.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 轉帳數量</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請輸入轉帳數量"
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="number-pad"
                returnKeyType="done"
                onChangeText={v => this._handleChange('amount', v)}
                onSubmitEditing={Keyboard.dismiss}
                value={amount}
              />
              <Text style={formStyle.valText}>{amountMsg}</Text>
            </View>
            <View style={styles.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/transPwd.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 個人轉帳密碼</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請輸入轉帳密碼"
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="number-pad"
                returnKeyType="done"
                onChangeText={v => this._handleChange('transPwd', v)}
                onSubmitEditing={Keyboard.dismiss}
                secureTextEntry
              />
              <Text style={formStyle.valText}>{transPwdMsg}</Text>
            </View>
            <View style={styles.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/name.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 備註</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder=""
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="default"
                returnKeyType="done"
                onChangeText={v => this._handleChange('comment', v)}
                onSubmitEditing={Keyboard.dismiss}
                value={comment}
              />
              <Text style={formStyle.valText}>{commentMsg}</Text>
            </View>
            <LinearGradient
              colors={elementColors.buttonLinearGradient}
              style={styles.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <PreventDoubleClickTH
                style={formStyle.button}
                onPress={this._handleSubmit}
                underlayColor={Colors.buttonGray}
              >
                <Text style={formStyle.buttonText}>確認</Text>
              </PreventDoubleClickTH>
            </LinearGradient>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default Transfer;
