import React from 'react';
import {
  StyleSheet, Dimensions, Keyboard, ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Form, Item, Label, Input, Text, Button, View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  registStep: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
  whiteText: {
    color: 'white',
  },
});

class Register extends React.Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
    };
  }

  _handleChange = (key, val) => {
    this.setState({
      [key]: val,
    });
  }

  _handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state);
    Actions.register2();
  }

  render = () => {

    return (
      <ImageBackground source={require('../../../images/bkimg.png')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <View style={styles.registStep}>
            <Text style={styles.whiteText}>註冊步驟 1/4 </Text>
            <View style={{ height: 20 }} />
            <Text style={styles.whiteText}>輸入帳號</Text>
          </View>
          <View style={styles.formContainer}>
            <Form>
              <Item stackedLabel>
                <Label style={styles.whiteText}>
                  帳號
                </Label>
                <Input
                  autoCapitalize="none"
                  placeholder="輸入帳號"
                  placeholderTextColor="white"
                  keyboardType="default"
                  onChangeText={v => this._handleChange('account', v)}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </Item>
              <View style={{ height: 30 }} />
              <View padder>
                <Button info block onPress={this._handleSubmit} style={styles.buttonStyle}>
                  <Text>
                    下一步
                  </Text>
                </Button>
              </View>
            </Form>
          </View>
        </View>
      </ImageBackground>

    );
  }
}

export default Register;
