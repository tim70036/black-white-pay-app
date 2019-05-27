import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
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
    resizeMode: 'contain',
  },

  arrow: {
    color: Colors.labelLightGray,
    fontSize: 16,
  },

  title: {
    fontSize: 16,
    color: Colors.labelWhite,
  },

  text: {
    fontSize: 11,
    color: Colors.labelWhite,
  },
});

class ItemCell extends Component {
  static propTypes = {
    image: PropTypes.number,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    handle: PropTypes.func,
    arrowIcon: PropTypes.bool,
  }

  static defaultProps = {
    subtitle: '',
    image: null,
    handle: null,
    arrowIcon: true,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { image, title, subtitle, handle, arrowIcon } = this.props;
    let icon = null;
    if (image) {
      icon = (<Image style={styles.icon} source={image} />);
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handle}
        >
          <View style={styles.content}>
            {icon}
            <Text style={styles.title}>{title}</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.text}>{subtitle}</Text>
            {arrowIcon ? <Icon name="right" type="AntDesign" style={styles.arrow} /> : null}
          </View>
          <View style={{ height: 14 }} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ItemCell;
