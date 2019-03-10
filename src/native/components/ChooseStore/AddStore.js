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
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 2,
  },
  buttonStyle: {
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
  whiteText: {
    color: 'white',
    fontSize: 20,
  },
});

class AddStore extends React.Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      storeCode: '',
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
    Actions.pop();
  }

  render() {
    return (
      <ImageBackground source={require('../../../images/bkimg.png')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <View style={styles.emptySpace}>
            <Text style={styles.whiteText}> 新增店家 </Text>
          </View>
          <View style={styles.formContainer}>
            <Form>
              <Item stackedLabel>
                <Label style={{ color: 'white' }}>
                  店家代碼
                </Label>
                <Input
                  autoCapitalize="none"
                  placeholder=""
                  onChangeText={v => this.handleChange('storeCode', v)}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </Item>

              <View style={{ height: 50 }} />

              <View padder>
                <Button info block onPress={this.handleSubmit} style={styles.buttonStyle}>
                  <Text>
                    新增
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

export default AddStore;
