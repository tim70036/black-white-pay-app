import {
  View, Image, StatusBar, TouchableWithoutFeedback, TouchableHighlight, Text
 } from 'react-native';
 import React, { Component } from 'react';
 import { Actions } from 'react-native-router-flux';
 import PropTypes from 'prop-types';
 import { SearchBar, Icon } from 'react-native-elements';

 import DefaultProps from '../constants/navigation';
 import { STATUSBAR_HEIGHT, IS_IOS, IS_ANDROID, viewportWidthPercent, viewportHeightPercent } from '../lib/util';
 import Colors from '../constants/colors';

 
 // class NavBar extends Component {
//   const NavBar = function() {
//      return (
//        <View style={styles.backgroundStyle}>
//         <TouchableHighlight>
//           <Icon
//             name="search1"
//             size={25}
//             color="white"
//             style={styles.settingStyle}
//           />
//         </TouchableHighlight>
//       </View>
//      );
//  };

// const styles = {
//   backgroundStyle: {
//     backgroundColor: 'yellow',
//     flex: 1,
//   },

//   settingStyle: {
//     justifyContent: 'center',
//     position: 'relative',
//     // right: 10,
//   }
//  };
const styles = {
  container: {
    marginTop: STATUSBAR_HEIGHT,
    height: 55,
    backgroundColor: Colors.barBackground,
  },

  searchBarContainer: {
    backgroundColor: Colors.barBackground,
  },

  inputContainerStyle: {
    backgroundColor: '#303338',
  },

  leftContainer: {
    flex: 1,
  },

  middleContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  text: {
    color: Colors.barTopText,
    textAlign: 'center',
    letterSpacing: 2,
    fontSize: 18,
  },

  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  searchButtonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  inputStyle: {
    color: '#868E97',
  },

  icon: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'relative',
    right: viewportWidthPercent(2),
  }
 };

class NavBar extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      buttonIsPressed: false,
      search: '',
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  renderSearchBar = () => {
    const { search, buttonIsPressed } = this.state;

    return (
      <SearchBar
        placeholder="尋找店家"
        platform="ios"
          searchIcon={<Icon
            name="arrow-left"
            type="material-community"
            color="white"
            onPress={() => { this.setState({ buttonIsPressed: !buttonIsPressed });}}
          />}
          /* cancelIcon={<Icon
            name="arrow-left"
            type="material-community"
          />} */
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  };

  renderNavBar = () => {
    const { search, buttonIsPressed } = this.state;
    const { title } = this.props;

    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.leftContainer}></View>

        <View style={styles.middleContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>

        <View style={styles.rightContainer}>
          <TouchableHighlight style={styles.searchButtonContainer}
            onPress={() => { this.setState({ buttonIsPressed: !buttonIsPressed });}}
          >
            <Icon
              name="search1"
              type="antdesign"
              size={25}
              color="white"
              iconStyle={styles.icon}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  render() {
    const { search, buttonIsPressed } = this.state;

    return (
      <View style={styles.container}>
        {buttonIsPressed ? this.renderSearchBar() : this.renderNavBar()}
      </View>
    );
  }
};
 
 
export default NavBar;