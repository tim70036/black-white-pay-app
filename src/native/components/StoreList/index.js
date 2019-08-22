import React from 'react';
import { Actions } from 'react-native-router-flux';
import { 
  Image, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, ImageBackground, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';
import NavBar from '../NavBar';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  cardContainer: {
    flex: 1,
    paddingHorizontal: viewportWidthPercent(5),
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    width: viewportWidthPercent(86),
    height: viewportWidthPercent(86) * 0.62,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: viewportHeightPercent(2),
  },

  text: {
    fontSize: 40,
    color: Colors.labelWhite,
  },

});

class StoreList extends React.Component {
  static propTypes = {
    onChoose: PropTypes.func.isRequired,
    storesData: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        storeId: PropTypes.number,
        thumbnail: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    storesData: [],
  }

  constructor(props) {
    super(props);
    this.state = {
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


  _renderStore = ({ item }) => {
    const image = (item.thumbnail.length > 0)
      ? (
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: item.thumbnail }}
        />
      )
      : (
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          source={require('../../../img/storeList/defaultStore.png')}
        >
          <Text style={styles.text}>{item.name}</Text>
        </ImageBackground>
      );
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => this._handleChoose(item.storeId)}
      >
        {image}
      </TouchableOpacity>
    );
  };

  render() {
    const { storesData } = this.props;
    return (
      <ImageBackground source={require('../../../img/background/background2.png')} style={styles.container}>
        <NavBar title="商店列表" />
        <View style={styles.cardContainer}>
          <FlatList
            data={storesData}
            renderItem={this._renderStore}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
          <ActionButton
            buttonColor={Colors.labelWhite}
            offsetY={viewportHeightPercent(2)}
            offsetX={viewportWidthPercent(3)}
            onPress={this._handleAddStore}
            buttonTextStyle={{ color: '#DAC3A2', fontSize: 40 }}
            size={56}
            buttonText="+"
            position="right"
            nativeFeedbackRippleColor="rgba(255,255,255,0)"
          />
        </View>
      </ImageBackground>
    );
  }
}

export default StoreList;
