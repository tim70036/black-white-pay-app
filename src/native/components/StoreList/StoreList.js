import React from 'react';
import { Actions } from 'react-native-router-flux';
import { 
  Image, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight,
} from 'react-native';
import {
  Card, Text, View,
} from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    height: viewportHeightPercent(14),
  },

  cardItem: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1A1B1B',
  },

  topContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  bottomContainer: {
    flex: 6,
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
    color: '#AA8049',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  cardHeader: {

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
    <TouchableOpacity
      onPress={() => this._handleChoose(item.storeId)}
    >
      <Card style={styles.card}>
        <View style={{ flex: 2 }}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: item.thumbnail }}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );

  render() {
    const { storesData } = this.props;

    return (
      <View padder style={styles.container}>
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
          />
        </View>
      </View>
    );
  }
}

export default StoreList;
