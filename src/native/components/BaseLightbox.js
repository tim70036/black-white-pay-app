import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated, Dimensions, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52,52,52,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class BaseLightbox extends Component {
  static propTypes = {
    children: PropTypes.any,
    horizontalPercent: PropTypes.number,
    verticalPercent: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      duration: 200,
      toValue: 0.3,
    }).start();
  }

  closeModal = () => {
    Animated.timing(this.state.opacity, {
      duration: 200,
      toValue: 0,
    }).start(Actions.pop);
  };

  _renderLightBox = () => {
    const { children, horizontalPercent = 1, verticalPercent = 1 } = this.props;
    const height = verticalPercent ? deviceHeight * verticalPercent : deviceHeight;
    const width = horizontalPercent ? deviceWidth * horizontalPercent : deviceWidth;
    return (
      <View
        style={{
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <View>
          {children}
        </View>
        <View style={{ margin: 15 }}>
          <Button title="關閉" onPress={this.closeModal} />
        </View>
      </View>
    );
  };

  render = () => (
    <Animated.View 
      style={[styles.container, { opacity: this.state.opacity }]}
    >
      {this._renderLightBox()}
    </Animated.View>
  );
}

export default BaseLightbox;
