import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, StyleSheet, Image, TouchableOpacity, Header } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../constants/colors';
// import { Heading2, Paragraph } from './widght/Text';
// import Separator from './widght/Separator';

// const Dimensions = require('Dimensions');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundGray,
  },
  content: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  arrow: {
    width: 14,
    height: 14,
    marginLeft: 5,
  },

  h2: {
    fontSize: 13,
    color: 'white',
  },

  text: {
    fontSize: 11,
    color: '#999999',
  },
});

class MineItemCell extends Component {
  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    next: PropTypes.string,
  }

  static defaultProps = {
    subtitle: '',
    image: null,
    next: '',
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handle = async (key) => {
    if (key) {
      Actions[key]();
    }
  }

  render() {
    const { image, title, subtitle, next } = this.props;
    let icon = null;
    if (image) {
      icon = (<Image style={styles.icon} source={image} />);
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._handle(next)}
        >
          <View style={styles.content}>
            {icon}
            <Text style={styles.h2}>{title}</Text>
            <View style={{ flex: 1, backgroundColor: 'blue' }} />
            <Text style={styles.text}>{subtitle}</Text>
            <Image style={styles.arrow} source={require('../../../img/public/cell_arrow.png')} />
          </View>
          <View style={{ height: 14 }} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default MineItemCell;
