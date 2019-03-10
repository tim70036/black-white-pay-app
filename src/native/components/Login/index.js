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
    flex: 1,
    flexDirection: 'column',
  },
  emptySpace: {
    flex: 1,
  },
  formContainer: {
    flex: 3,
  },
  buttonStyle: {
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
});

class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state);
    Actions.chooseStoreDrawer();
  }

  render() {
    const { email } = this.state;

    return (
      <ImageBackground source={require('../../../images/bkimg.png')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <View style={styles.emptySpace} />
          <View style={styles.formContainer}>
            <Form>
              <Item stackedLabel>
                <Label style={{ color: 'white' }}>
                  帳號
                </Label>
                <Input
                  autoCapitalize="none"
                  placeholder=""
                  value={email}
                  keyboardType="email-address"
                  onChangeText={v => this.handleChange('email', v)}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </Item>

              <Item stackedLabel>
                <Label style={{ color: 'white' }}>
                  密碼
                </Label>
                <Input
                  autoCapitalize="none"
                  placeholder=""
                  onChangeText={v => this.handleChange('password', v)}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </Item>

              <View style={{ height: 50 }} />

              <View padder>
                <Button info block onPress={this.handleSubmit} style={styles.buttonStyle}>
                  <Text>
                    登入
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

export default Login;
