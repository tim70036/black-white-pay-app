import React, { Component } from 'react';
import { View, Keyboard, TextInput, Text, ImageBackground, Image, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { formStyle, elementColors } from '../../lib/styles';
import Colors from '../../constants/colors';
import { bindCodeValidate } from '../../lib/validate';
import { viewportWidthPercent, PreventDoubleClickTH } from '../../lib/util';
import NavBar from '../NavBar';

const styles = StyleSheet.create({
  image: {
    width: viewportWidthPercent(84),
    height: viewportWidthPercent(84) * 0.545,
  },
});

class AddStore extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      bindCode: '',
      bindCodeMsg: '',
    };
  }

  _validate = () => {
    const { bindCode } = this.state;
    const result = bindCodeValidate(bindCode);

    if (result.result) {
      this.setState({ bindCodeMsg: '' });
    } else {
      this.setState({ bindCodeMsg: result.errMsg });
      return false;
    }
    return true;
  }

  _handleChange = (key, val) => {
    this.setState({
      [key]: val,
    });
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
    const { bindCodeMsg } = this.state;
    return (
      <ImageBackground source={require('../../../img/background/background2.png')} style={formStyle.container}>
        <ScrollView>
          <NavBar back />
          <View style={formStyle.inputContainer}>
            <View style={formStyle.title}>
              <Text style={formStyle.titleText}>新增商店</Text>
            </View>
            <View style={styles.image}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require('../../../img/addStore/ad.png')}
              />
            </View>
            <View style={formStyle.inputItem}>
              <View style={formStyle.label}>
                <Image source={require('../../../img/form/store.png')} style={formStyle.icon} />
                <Text style={formStyle.labelText}> 店家代碼</Text>
              </View>
              <TextInput
                style={formStyle.inputText}
                autoCapitalize="none"
                placeholder="請輸入綁定代碼"
                placeholderTextColor={Colors.placeholderGray}
                keyboardType="number-pad"
                returnKeyType="done"
                onChangeText={v => this._handleChange('bindCode', v)}
                onSubmitEditing={Keyboard.dismiss}
              />
              <Text style={formStyle.valText}>{bindCodeMsg}</Text>
            </View>
            <LinearGradient
              colors={elementColors.buttonLinearGradient}
              style={formStyle.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <PreventDoubleClickTH
                style={formStyle.button}
                onPress={this._handleSubmit}
                underlayColor={Colors.buttonGray}
              >
                <Text style={formStyle.buttonText}>新增</Text>
              </PreventDoubleClickTH>
            </LinearGradient>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default AddStore;
