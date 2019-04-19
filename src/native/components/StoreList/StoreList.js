import React from 'react';
import { Actions } from 'react-native-router-flux';
import { 
  Image, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight,
} from 'react-native';
import {
  Text, View,
} from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({

  cardItem: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundBlack,
    paddingHorizontal: viewportWidthPercent(4),
    paddingVertical: viewportHeightPercent(2),
  },

  topContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: viewportWidthPercent(2),
    // marginVertical: viewportHeightPercent(2),
  },

  bottomContainer: {
    flex: 6,
    padding: viewportWidthPercent(2),
    // marginVertical: viewportHeightPercent(2),
  },

  topTitle: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  topAddStore: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  titleText: {
    fontSize: 25,
    color: 'white',
  },

  headerText: {
    fontSize: 20,
  },

  buttonText: {
    fontSize: 18,
    color: 'white',
  },

  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },

  iconStyle: {
    color: Colors.labelGold,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
  },

  image: {
    flex: 1,
  },

  storeContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 120,
    marginVertical: viewportHeightPercent(1),
  },

  storeStyle: {
    width: '100%',
    height: '100%',
  },

});

class StoreList extends React.Component {
  static propTypes = {
    // storesData:PropTypes.shape({}),
    onChoose: PropTypes.func.isRequired,
  }

  static defaultProps = {
    storesData: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      active: 'false',
      buttonIsPressed: false,
    };
  }

  _handleChoose = async (storeId) => {
    const { onChoose } = this.props;
    await onChoose(storeId);
    Actions.storeHome();
  }

  _handleAddStore = () => {
    Actions.addStore();
  }

  _change = () => {
    const { buttonIsPressed } = this.state;
    this.setState({ buttonIsPressed: !buttonIsPressed });
  }

  _renderStore = ({ item }) => (
    <View style={styles.storeContainer}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => this._handleChoose(item.storeId)}
      >
        <View style={styles.storeStyle}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: item.thumbnail }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { storesData } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.topTitle}>
            <Text style={styles.titleText}>商店列表</Text>
          </View>

          <View style={styles.topAddStore}>
            <TouchableHighlight
              style={{
                ...styles.buttonStyle,
              }}
              onPress={this._handleAddStore}
              onPressIn={this._change}
              onPressOut={this._change}
            >
              <View style={styles.buttonContainer}>
                <Text
                  style={styles.buttonText}
                >
                  新增商店
                </Text>
                <Icon style={styles.iconStyle} name="plus" />
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            data={storesData}
            renderItem={this._renderStore}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

export default StoreList;
