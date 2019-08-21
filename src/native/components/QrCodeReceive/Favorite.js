import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  PanResponder,
} from 'react-native';
import Modal from 'react-native-modal';

import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';
import ConfirmModal from '../ConfirmModal';

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingHorizontal: viewportWidthPercent(5),
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: viewportWidthPercent(5), // Same as FriendList's friendContainer
    marginTop: 10,
    marginBottom: 10,
    width: viewportWidthPercent(90),
    height: viewportHeightPercent(17),
    backgroundColor: '#202020',
    borderRadius: 10,

    // borderWidth: 1,
    // borderColor: 'blue',
  },
  cardItemLeft: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(5),
    paddingVertical: 10,
    height: '100%',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  cardItemRight: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#2B2A29',
  },
  textView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    color: 'white',
  },
  deleteCard: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class Favorite extends Component {
  static propTypes = {
    favoriteList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        storeId: PropTypes.number,
        currencyName: PropTypes.string,
        amount: PropTypes.number,
        comment: PropTypes.string,
      }),
    ),
    account: PropTypes.string.isRequired,
    removeFavoriteItem: PropTypes.func.isRequired,
    onIndexChange: PropTypes.func.isRequired,
    setqrCodeReceive: PropTypes.func.isRequired,
  };

  static defaultProps = {
    favoriteList: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      targetIdx: -1,
    };
  }

  _handleDeleteConfirm = (index) => {
    this.setState({ visibleModal: true, targetIdx: index });
  }

  _handleChoose = async (index) => {
    const { account, onIndexChange, setqrCodeReceive, favoriteList } = this.props;
    const qrData = {
      type: 'receive',
      storeId: favoriteList[index].storeId,
      account: account,
      amount: favoriteList[index].amount.toString(),
      comment: favoriteList[index].comment,
    };
    console.log(qrData);
    await setqrCodeReceive(qrData);
    onIndexChange(0);
  }

  _confirmAction = async (index) => {
    const { removeFavoriteItem, favoriteList } = this.props;
    const { id } = favoriteList[index];
    await removeFavoriteItem(id);
    this.setState({ visibleModal: false });
  }

  _cancelAction = () => {
    this.setState({ visibleModal: false });
  }

  _renderItem = (item) => {
    const data = item.item;
    const { index } = item;
    return (
      <View style={styles.card}>
        <TouchableHighlight
          onPress={() => this._handleChoose(index)}
          activeOpacity={0.1}
          underlayColor="rgb(38, 38, 38)"
          style={styles.cardItemLeft}
        >
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
            <View style={styles.textView}>
              <Text style={styles.text}>幣別: {data.currencyName}</Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>收款數量: {data.amount}</Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>備註: {data.comment}</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this._handleDeleteConfirm(index)}
          activeOpacity={0.1}
          underlayColor="rgb(38, 38, 38)"
          style={styles.cardItemRight}
        >
          <View style={styles.deleteCard}>
            <Image source={require('../../../img/qrCodeReceive/trashcan.png')} />
            <Text style={{...styles.text, marginTop: 5 }}>刪除</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  render = () => {
    const { favoriteList } = this.props;
    const { visibleModal, targetIdx } = this.state;
    return (
      <View style={styles.scene}>
        <FlatList
          data={favoriteList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <ConfirmModal
          confirmAction={() => this._confirmAction(targetIdx)}
          cancelAction={this._cancelAction}
          context="確認刪除此常用收款嗎?"
          visibleModal={visibleModal}
        />
      </View>
    );
  }
}

export default Favorite;
