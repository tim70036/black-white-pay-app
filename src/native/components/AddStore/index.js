import React, { Component } from 'react';
import { View, Keyboard, TouchableHighlight, TextInput, Text, ImageBackground, Image, StyleSheet  } from 'react-native';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { formStyle, elementColors } from '../../lib/styles';
import Colors from '../../constants/colors';
import { bindCodeValidate } from '../../lib/validate';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const styles = StyleSheet.create({
  image: {
    width: viewportWidthPercent(84),
    height: viewportWidthPercent(84) * 0.54,
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
        console.log("fuck");
        Actions.pop();
      }
    }
  }

  render() {
    const { bindCodeMsg } = this.state;
    return (
      <ImageBackground source={require('../../../img/bg.png')} style={formStyle.bgImage}>
        <View style={formStyle.container}>
          <View style={formStyle.inputContainer}>
            <View style={formStyle.title}>
              <Text style={formStyle.titleText}>新增商店</Text>
            </View>
            <View style={styles.image}>
              <Image
                style={styles.image}
                resizeMode="cover"
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
                placeholder="請輸入新暱稱"
                placeholderTextColor={elementColors.placeholderTextColor}
                keyboardType="default"
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
              <TouchableHighlight
                style={formStyle.button}
                onPress={this._handleSubmit}
                underlayColor={Colors.gray}
              >
                <Text style={formStyle.buttonText}>新增</Text>
              </TouchableHighlight>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default AddStore;
