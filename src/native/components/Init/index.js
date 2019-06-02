import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet, Image, Dimensions, ImageBackground,
} from 'react-native';
import {
  Text, Button, View,
} from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    flex: 2,
  },
  imageStyle: {
    width: '100%',
    height: '100%', // to make the image fit the size, declare a size to the image, then use resizeMode
  },
  buttonContainer: {
    flex: 1,
  },
  buttonStyle: {
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
});

class Init extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleRegisterBtn = () => {
    Actions.register();
  };

  _handleLoginBtn = () => {
    Actions.login();
  };

  componentDidMount = () => {
    // console.log(this.props.resetRouteStack);
    // if (this.props.resetRouteStack) {
    //   // Prevent user go back to previos sreen

    //   Actions.reset('auth', { resetRouteStack: false });
    // }
  }

  render() {
    return (
      <ImageBackground source={require('../../../img/bkimg.png')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <View padder style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              style={styles.imageStyle}
              source={require('../../../img/logo.png')}
            />
          </View>
          <View padder style={styles.buttonContainer}>
            <Button onPress={this._handleRegisterBtn} info block style={styles.buttonStyle}>
              <Text>
                註冊
              </Text>
            </Button>
            <View style={{ height: 10 }} />
            <Button onPress={this._handleLoginBtn} info block style={styles.buttonStyle}>
              <Text>
                登入
              </Text>
            </Button>
          </View>
        </View>
      </ImageBackground>

    );
  }
}

export default Init;
