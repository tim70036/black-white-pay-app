import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TextInput,
  Picker,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Text,
  Icon,
  Picker as IosPicker,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { LinearGradient } from 'expo';


import PropTypes from 'prop-types';
import NavBar from '../NavBar';
import Colors from '../../constants/colors';
import { amountValidate, transPwdValidate } from '../../lib/validate';
import {
  viewportWidthPercent,
  viewportHeightPercent,
  IS_IOS,
} from '../../lib/util';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  inputsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: viewportWidthPercent(4),

    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 1,
    borderColor: 'blue',
  },
  storeContainer: {
    flexDirection: 'column',

    borderWidth: 1,
    borderColor: 'yellow',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: viewportHeightPercent(7),
    backgroundColor: Colors.cardLightGray,
    borderRadius: viewportWidthPercent(4),

    borderWidth: 1,
    borderColor: 'red',
  },
  outflowPicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleLine: {
    height: viewportHeightPercent(4),
    width: 1,
    backgroundColor: Colors.placeholderGray,
  },
  inflowPicker: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    color: Colors.labelWhite,
    height: 35,
    width: viewportWidthPercent(25),
    backgroundColor: Colors.cardLightGray,
  },
  iospicker: {
    height: 35,
    width: viewportWidthPercent(25),
    backgroundColor: Colors.cardLightGray,
  },
  amountContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: viewportHeightPercent(4),
    backgroundColor: Colors.cardLightGray,
    borderRadius: viewportWidthPercent(4),
  },
  amountInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: viewportHeightPercent(9),
    backgroundColor: Colors.cardLightGray,
    marginTop: viewportHeightPercent(2),
  },
  valTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  outflowAmount: {
    flex: 1,
    flexDirection: 'column',
  },
  inflowAmount: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  outflowAmountText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: viewportWidthPercent(6),
  },
  outflowAmountInput: {
    flex: 1,
    marginTop: viewportHeightPercent(2),
    paddingLeft: viewportHeightPercent(2) + viewportWidthPercent(6),
  },
  dot: {
    height: viewportHeightPercent(1),
    width: viewportHeightPercent(1),
    borderRadius: viewportHeightPercent(1) / 2,
    marginRight: viewportHeightPercent(1),
  },
  transPwdContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: viewportHeightPercent(4),
    height: viewportHeightPercent(14),
    backgroundColor: Colors.cardLightGray,
    borderRadius: viewportWidthPercent(4),
    paddingLeft: viewportWidthPercent(6),
  },
  commentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: viewportHeightPercent(2),
    height: viewportHeightPercent(14),
    backgroundColor: Colors.cardLightGray,
    borderRadius: viewportWidthPercent(4),
    paddingLeft: viewportWidthPercent(6),
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: viewportHeightPercent(4),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: viewportHeightPercent(8) / 2,
    height: viewportHeightPercent(8),
    width: viewportWidthPercent(80),
  },
  label: {
    fontSize: 20,
    color: Colors.labelWhite,
  },
  valText: {
    color: Colors.labelRed,
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 3,
  },
  amountText: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 15,
    color: Colors.labelWhite,
  },
  icon: {
    fontSize: 25,
  },
});

class Transfer extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    outflowWallet: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ),
    inflowWallet: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ),
  }

  static defaultProps = {
    outflowWallet: [],
    inflowWallet: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      inflowRate: 1,
      outflowRate: 1,
      outflowStoreId: -1,
      inflowStoreId: -1,
      amount: '',
      transPwd: '',
      comment: '',
      amountMsg: '',
      transPwdMsg: '',
      storeIdMsg: '',
    };
  }

  _validate = () => {
    const {
      outflowStoreId,
      inflowStoreId,
      amount,
      transPwd,
    } = this.state;

    const amountResult = amountValidate(amount);
    const transPwdResult = transPwdValidate(transPwd);

    if (amountResult.result) {
      this.setState({ amountMsg: '' });
      this.setState({ amount: parseInt(amount, 10).toString() });
    } else {
      this.setState({ amountMsg: amountResult.errMsg });
      return false;
    }

    if (outflowStoreId === inflowStoreId) {
      this.setState({ storeIdMsg: '轉出轉入店家不可相同' });
    } else {
      this.setState({ storeIdMsg: '' });
    }

    if (transPwdResult.result) {
      this.setState({ transPwdMsg: '' });
    } else {
      this.setState({ transPwdMsg: transPwdResult.errMsg });
      return false;
    }

    return true;
  }

  _handlePick = (name, storeId) => {
    const { outflowWallet, inflowWallet } = this.props;
    let targetWallet;
    if (name === 'inflow') {
      console.log('%%%%%%%%%');
      targetWallet = inflowWallet.find(element => element.storeId === storeId);
      this.setState({ inflowStoreId: storeId, inflowRate: targetWallet.exchangeRate });
    } else if (name === 'outflow') {
      console.log('@@@@@@@@@');
      targetWallet = outflowWallet.find(element => element.storeId === storeId);
      this.setState({ outflowStoreId: storeId, outflowRate: targetWallet.exchangeRate });
    }
  }

  _handleChange = (name, val) => {
    const { inflowRate, outflowRate } = this.state;
    if (name === 'outflowAmount') {
      let amount;
      if (val === '') {
        amount = '';
      } else {
        amount = parseInt(val, 10) / outflowRate;
      }
      this.setState({ amount: amount });
    } else if (name === 'inflowAmount') {
      let amount;
      if (val === '') {
        amount = '';
      } else {
        amount = parseInt(val, 10) / inflowRate;
      }
      this.setState({ amount: amount });
    } else {
      this.setState({
        [name]: val,
      });
    }
  }

  _handleSubmit = async () => {
    const { onFormSubmit } = this.props;
    if (!this._validate()) return;
    const success = await onFormSubmit(this.state);
    if (success) {
      Actions.pop();
    }
  }

  render = () => {
    const { outflowWallet, inflowWallet } = this.props;
    const {
      inflowRate,
      outflowRate,
      amount,
      amountMsg,
      transPwdMsg,
      storeIdMsg,
      outflowStoreId,
      inflowStoreId,
    } = this.state;
    let outflowAmount;
    let inflowAmount;
    if (amount === '') {
      outflowAmount = '';
      inflowAmount = '';
    } else {
      outflowAmount = (parseInt(amount, 10) * outflowRate).toString();
      inflowAmount = (parseInt(amount, 10) * inflowRate).toString();
    }

    return (
      <ImageBackground style={styles.container} source={require('../../../img/background/background3.png')}>
        <NavBar title="兌換" back />
        <View style={styles.inputsContainer}>
          <View style={styles.storeContainer}>
            <View style={styles.pickerContainer}>
              <View style={styles.outflowPicker}>
                <Icon name="upload" type="MaterialCommunityIcons" style={[styles.icon, { color: '#FF7F34' }]} />
                {
                  IS_IOS ? (
                    <IosPicker
                      mode="dropdown"
                      style={styles.iospicker}
                      textStyle={{ color: Colors.labelWhite }}
                      itemStyle={{
                        marginLeft: 0,
                        paddingLeft: 10,
                      }}
                      selectedValue={outflowStoreId}
                      onValueChange={itemValue => this._handlePick('outflow', itemValue)}
                    >
                      { outflowWallet.map((i, index) => (
                        <IosPicker.Item key={i} label={i.currencyName} value={i.storeId} />
                      ))}
                    </IosPicker>
                  ) : (
                    <Picker
                      style={styles.picker}
                      selectedValue={outflowStoreId}
                      onValueChange={itemValue => this._handlePick('outflow', itemValue)}
                    >
                      { outflowWallet.map((i, index) => (
                        <Picker.Item key={i} label={i.currencyName} value={i.storeId} />
                      ))}
                    </Picker>
                  )
                }
              </View>
              <View style={styles.middleLine} />
              <View style={styles.inflowPicker}>
                <Icon name="download" type="MaterialCommunityIcons" style={[styles.icon, { color: '#3AF8D2' }]} />
                {
                  IS_IOS ? (
                    <IosPicker
                      mode="dropdown"
                      style={styles.iospicker}
                      textStyle={{ color: Colors.labelWhite }}
                      itemStyle={{
                        marginLeft: 0,
                        paddingLeft: 10,
                      }}
                      selectedValue={inflowStoreId}
                      onValueChange={itemValue => this._handlePick('inflow', itemValue)}
                    >
                      { inflowWallet.map((i, index) => (
                        <IosPicker.Item key={i} label={i.currencyName} value={i.storeId} />
                      ))}
                    </IosPicker>
                  ) : (
                    <Picker
                      style={styles.picker}
                      selectedValue={inflowStoreId}
                      onValueChange={itemValue => this._handlePick('inflow', itemValue)}
                    >
                      { inflowWallet.map((i, index) => (
                        <Picker.Item key={i} label={i.currencyName} value={i.storeId} />
                      ))}
                    </Picker>
                  )
                }
              </View>
            </View>
            <View style={styles.valTextContainer}>
              <Text style={styles.valText}>{storeIdMsg}</Text>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <View style={styles.amountInputContainer}>
              <View style={styles.outflowAmount}>
                <View style={styles.outflowAmountText}>
                  <View style={[styles.dot, { backgroundColor: '#FF7F34' }]} />
                  <Text style={styles.label}>轉出數量</Text>
                </View>
                <View style={styles.outflowAmountInput}>
                  <TextInput
                    style={[styles.inputText, { width: viewportWidthPercent(30) }]}
                    autoCapitalize="none"
                    placeholder="輸入轉出數量"
                    placeholderTextColor={Colors.placeholderGray}
                    keyboardType="numeric"
                    onChangeText={v => this._handleChange('outflowAmount', v)}
                    onSubmitEditing={Keyboard.dsmiss}
                    value={outflowAmount}
                  />
                </View>
              </View>
              <View style={[styles.middleLine, { height: viewportHeightPercent(8) }]} />
              <View style={styles.outflowAmount}>
                <View style={styles.outflowAmountText}>
                  <View style={[styles.dot, { backgroundColor: '#3AF8D2' }]} />
                  <Text style={styles.label}>轉入數量</Text>
                </View>
                <View style={styles.outflowAmountInput}>
                  <TextInput
                    style={[styles.inputText, { width: viewportWidthPercent(30) }]}
                    autoCapitalize="none"
                    placeholder="輸入轉入數量"
                    placeholderTextColor={Colors.placeholderGray}
                    keyboardType="numeric"
                    onChangeText={v => this._handleChange('inflowAmount', v)}
                    onSubmitEditing={Keyboard.dsmiss}
                    value={inflowAmount}
                  />
                </View>
              </View>
            </View>
            <View style={styles.valTextContainer}>
              <Text style={styles.valText}>{amountMsg}</Text>
            </View>
          </View>
          <View style={styles.transPwdContainer}>
            <Text style={styles.label}>個人轉帳密碼</Text>
            <TextInput
              style={[styles.inputText,
                { width: viewportWidthPercent(35), marginTop: viewportWidthPercent(2) }]}
              autoCapitalize="none"
              placeholder="輸入個人轉帳密碼"
              placeholderTextColor={Colors.placeholderGray}
              keyboardType="numeric"
              onChangeText={v => this._handleChange('transPwd', v)}
              onSubmitEditing={Keyboard.dsmiss}
            />
            <Text style={styles.valText}>{transPwdMsg}</Text>
          </View>
          <View style={styles.commentContainer}>
            <Text style={styles.label}>備註</Text>
            <TextInput
              style={[styles.inputText,
                { width: viewportWidthPercent(35), marginTop: viewportWidthPercent(2) }]}
              autoCapitalize="none"
              placeholder="輸入備註"
              placeholderTextColor={Colors.placeholderGray}
              keyboardType="numeric"
              onChangeText={v => this._handleChange('comment', v)}
              onSubmitEditing={Keyboard.dsmiss}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => (this._handleSubmit())}>
              <LinearGradient
                colors={['#F3D3A0', '#C4A574', '#967848']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.label}>確認兌換</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Transfer;
