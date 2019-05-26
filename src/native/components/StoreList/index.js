import React from 'react';
import { Actions } from 'react-native-router-flux';
import { 
  Image, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, ImageBackground, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

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
  },

  card: {
    width: viewportWidthPercent(86),
    height: viewportWidthPercent(86) * 0.62,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: viewportHeightPercent(2),
  },

});

class StoreList extends React.Component {
  static propTypes = {
    storesData: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        storeId: PropTypes.number,
        thumbnail: PropTypes.string,
      }),
    ),
    onChoose: PropTypes.func.isRequired,
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


  _renderStore = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => this._handleChoose(item.storeId)}
      >
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: item.thumbnail }}
        />
      </TouchableOpacity>
    </View>
  );

  render() {
    const { storesData } = this.props;

    return (
      <ImageBackground source={require('../../../img/bg.png')} style={styles.bgImage}>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <FlatList
              data={storesData}
              renderItem={this._renderStore}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
            <ActionButton
              buttonColor={Colors.white}
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
        </View>
      </ImageBackground>
    );
  }
}

export default StoreList;
