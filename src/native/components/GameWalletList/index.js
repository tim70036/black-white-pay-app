import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import NavBar from '../NavBar';
import ConfirmModal from '../ConfirmModal';

import {
  viewportWidthPercent,
  viewportHeightPercent,
  PreventDoubleClickTO,
} from '../../lib/util';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.labelBlack,
  },

  cardContainer: {
    height: viewportHeightPercent(12),
    paddingVertical: viewportHeightPercent(12) * 0.15,
    backgroundColor: Colors.cardLightGray,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',

    paddingHorizontal: viewportWidthPercent(5), // width 90%
  },
  thumbnail: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailImage: {
    width: viewportHeightPercent(12) * 0.7,
    height: viewportHeightPercent(12) * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 8,
    flexDirection: 'column',
    paddingLeft: viewportWidthPercent(3),
  },
  infoTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: viewportWidthPercent(2),
  },
  infoTopText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoBottom: {
    flex: 1,
    height: '30%',
    borderColor: '#B9A078',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: viewportWidthPercent(2),
    // height: viewportHeightPercent(7.4),
  },
  transparentBar: {
    height: '100%',
    width: '100%',
    resizeMode: 'center',
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: viewportHeightPercent(1), // margin between row
    width: '100%',
  },
  pagination: {
    marginTop: -30,
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  text: {
    color: Colors.labelWhite,
    fontSize: 17,
  },

  storeCurrencyImg: {
    width: 20,
    height: 23,
    resizeMode: 'contain',
  },
  infoCurrency: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: viewportWidthPercent(2),
  },
  infoAmount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  infoDollars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: viewportWidthPercent(1),
  },
  contentContainer: {
    flex: 7,
    marginHorizontal: viewportWidthPercent(3),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: viewportHeightPercent(1.5),
    height: viewportHeightPercent(6),
  },
  buttons: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    marginHorizontal: viewportWidthPercent(2),
  },

  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '22%',
    paddingBottom: viewportHeightPercent(1),
  },
  icon: {
    height: viewportHeightPercent(3),
    width: viewportHeightPercent(3),
    resizeMode: 'contain',
  },

  gameWalletContainer: {
    flex: 1,
    marginHorizontal: viewportWidthPercent(1),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: viewportHeightPercent(1),
  },

  titleContainer: {
    height: viewportHeightPercent(6),
    // marginHorizontal: viewportWidthPercent(1),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#373737',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  listContainer: {
    // backgroundColor: '#202020',
    height: viewportHeightPercent(6),
    // marginHorizontal: viewportWidthPercent(1),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020',
    borderBottomColor: '#2D2D2D',
    borderBottomWidth: 1,
    // backgroundColor: '#373737',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    color: Colors.labelWhite,
    fontSize: 13,
    alignSelf: 'center',
  },
  recycleButton: {
    height: viewportHeightPercent(3),
    width: viewportHeightPercent(3),
    resizeMode: 'contain',
  },
});

class GameWalletList extends Component {
  static propTypes = {
    recycleOne: PropTypes.func.isRequired,
    recycleAll: PropTypes.func.isRequired,
    getGameWalletsData: PropTypes.func.isRequired,
    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }).isRequired,
    gameWallets: PropTypes.arrayOf(
      PropTypes.shape({
        gameId: PropTypes.number,
        gameName: PropTypes.string,
        balance: PropTypes.number,
        frozenBalance: PropTypes.number,
        currencyName: PropTypes.string,
      }),
    ),
  };

  static defaultProps = {
    gameWallets: [],
  };

  state = {
    visibleRecycleOneModal: false,
    visibleRecycleAllModal: false,
    gameId: -1,
    gameName: '',
  }

  _handleGameList = async () => {
    Actions.gameList();
  }

  _handleRecycleOne = async (item) => {
    this.setState({ visibleRecycleOneModal: true, gameId: item.gameId, gameName: item.gameName });
  }

  _confirmRecycleOne = async () => {
    const { recycleOne, getGameWalletsData } = this.props;
    const { gameId } = this.state;
    this.setState({ visibleRecycleOneModal: false, gameId: -1, gameName: '' });
    await recycleOne(gameId);
    await getGameWalletsData();
  }

  _cancelRecycleOne = async () => {
    this.setState({ visibleRecycleOneModal: false });
  }

  _handleRecycleAll = async () => {
    this.setState({ visibleRecycleAllModal: true });
  }

  _confirmRecycleAll = async () => {
    const { recycleAll, getGameWalletsData } = this.props;
    this.setState({ visibleRecycleAllModal: false });
    await recycleAll();
    await getGameWalletsData();
  }

  _cancelRecycleAll = async () => {
    this.setState({ visibleRecycleAllModal: false });
  }

  _renderItem = ({ item }) => (
    <View style={styles.listContainer}>
      <View style={styles.title}>
        <Text style={styles.listText}>{item.gameName}</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.listText}>{item.currencyName}</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.listText}>{Math.floor(item.balance)}</Text>
      </View>
      <View style={{ ...styles.title, flex: 0.5 }}>
        <PreventDoubleClickTO
          style={styles.recycleButton}
          onPress={() => this._handleRecycleOne(item)}
        >
          <Image style={styles.recycleButton} source={require('../../../img/gameWalletList/recycleButton.png')} />
        </PreventDoubleClickTO>
      </View>
    </View>
  );

  render = () => {
    const { user, gameWallets } = this.props;
    const { visibleRecycleOneModal, visibleRecycleAllModal, gameName } = this.state;
    let totalBalance = 0;
    for (let i = 0; i < gameWallets.length; i += 1) {
      totalBalance += gameWallets[i].balance;
      gameWallets[i].key = gameWallets[i].gameName;
    }
    const uri = (require('../../../img/gameWalletList/coin.png'));
    return (
      <View style={styles.container}>
        <NavBar title="遊戲錢包" back />
        <View style={styles.cardContainer}>
          <View style={styles.thumbnail}>
            <Image
              style={styles.thumbnailImage}
              source={{ uri: user.thumbnail }}
            />
          </View>
          <View style={styles.info}>
            <View style={styles.infoTop}>
              <View style={styles.infoTopText}>
                <Text style={styles.text}>{user.name}</Text>
              </View>
            </View>
            <View style={styles.infoBottom}>
              <View style={styles.infoCurrency}>
                <Text style={{ ...styles.text, fontSize: 13 }}>總額度</Text>
              </View>
              <View style={styles.infoAmount}>
                <View style={styles.infoDollars}>
                  <Text style={{ ...styles.text, fontWeight: 'bold', fontSize: 13, color: '#FFD43D' }}>
                    {Math.floor(totalBalance)}
                  </Text>
                  <View style={{ width: viewportWidthPercent(1) }} />
                  <Image source={uri} style={styles.storeCurrencyImg} />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.buttonContainer}>
            <ImageBackground style={styles.buttons} source={require('../../../img/gameWalletList/purpleButton.png')}>
              <PreventDoubleClickTO
                style={styles.buttonContent}
                onPress={this._handleGameList}
              >
                <Image style={styles.icon} source={require('../../../img/gameWalletList/list.png')} />
                <View style={{ width: 10 }} />
                <Text style={{ ...styles.text, fontSize: 13, color: '#75051C' }}>遊戲列表</Text>
              </PreventDoubleClickTO>
            </ImageBackground>
            <ImageBackground style={styles.buttons} source={require('../../../img/gameWalletList/pinkButton.png')}>
              <PreventDoubleClickTO
                style={styles.buttonContent}
                onPress={() => this._handleRecycleAll()}
              >
                <Image style={styles.icon} source={require('../../../img/gameWalletList/recycle.png')} />
                <View style={{ width: 10 }} />
                <Text style={{ ...styles.text, fontSize: 13, color: '#332954' }}>全部回收</Text>
              </PreventDoubleClickTO>
            </ImageBackground>
          </View>

          <View style={styles.gameWalletContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.title}>
                <Text style={{ ...styles.text, alignSelf: 'center' }}>遊戲名稱</Text>
              </View>
              <View style={styles.title}>
                <Text style={{ ...styles.text, alignSelf: 'center' }}>貨幣名</Text>
              </View>
              <View style={styles.title}>
                <Text style={{ ...styles.text, alignSelf: 'center' }}>額度</Text>
              </View>
              <View style={{ ...styles.title, flex: 0.5 }}>
                <Text style={{ ...styles.text, alignSelf: 'center' }}>操作</Text>
              </View>
            </View>
            <FlatList
              data={gameWallets}
              renderItem={this._renderItem}
            />
          </View>
        </View>
        <ConfirmModal
          confirmAction={this._confirmRecycleOne}
          cancelAction={this._cancelRecycleOne}
          context={`確認回收 ${gameName} 遊戲幣嗎?`}
          visibleModal={visibleRecycleOneModal}
        />
        <ConfirmModal
          confirmAction={this._confirmRecycleAll}
          cancelAction={this._cancelRecycleAll}
          context="確認回收所有遊戲幣嗎?"
          visibleModal={visibleRecycleAllModal}
        />
      </View>
    );
  }
}

export default GameWalletList;
