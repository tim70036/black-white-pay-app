import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWallets } from '../actions/wallets';
import { getGameList, updateCurWallet } from '../actions/curWallet';
import { takeIn } from '../actions/gameWallets';

class GameList extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getStoreGameList: PropTypes.func.isRequired,
    userTakeIn: PropTypes.func.isRequired,
    getWalletsList: PropTypes.func.isRequired,
    updateUserCurWallet: PropTypes.func.isRequired,
    adList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
      }),
    ),

    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }).isRequired,

    store: PropTypes.shape({
      storeId: PropTypes.number,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      comment: PropTypes.string,
    }).isRequired,

    wallets: PropTypes.arrayOf(
      PropTypes.shape({
        storeId: PropTypes.number,
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
        storeName: PropTypes.string,
        exchangeRate: PropTypes.number,
        currencySrc: PropTypes.string,
      }),
    ).isRequired,

    curWallet: PropTypes.shape({
      currencyName: PropTypes.string,
      availBalance: PropTypes.number,
      currencySrc: PropTypes.string,
    }).isRequired,

    gameList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        code: PropTypes.string,
        provider: PropTypes.string,
        imageSrc: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    adList: [],
    gameList: [],
  }

  state = {
  }

  componentWillMount() {
    this._getGameList();
  }

  _getGameList = async () => {
    const { getStoreGameList } = this.props;
    await getStoreGameList();
  }

  render = () => {
    const {
      Layout,
      adList,
      user,
      store,
      wallets,
      curWallet,
      gameList,
      userTakeIn,
      getWalletsList,
      updateUserCurWallet,
    } = this.props;
    const gameListLeft = gameList.reduce((arr, row, idx) => {
      if (idx % 2 === 0) arr.push(row);
      return arr;
    }, []);
    const gameListRight = gameList.reduce((arr, row, idx) => {
      if (idx % 2 === 1) arr.push(row);
      return arr;
    }, []);

    return (
      <Layout
        carouselData={adList}
        user={user}
        store={store}
        wallets={wallets}
        curWallet={curWallet}
        gameList={gameList}
        userTakeIn={userTakeIn}
        gameListLeft={gameListLeft}
        gameListRight={gameListRight}
        getWalletsList={getWalletsList}
        updateUserCurWallet={updateUserCurWallet}
      />
    );
  }
}

const mapStateToProps = state => ({
  adList: state.curStore.ads,
  user: state.user || {},
  store: state.curStore || {},
  wallets: state.wallets,
  curWallet: state.curWallet || {},
  gameList: state.curWallet.gameList,
});

const mapDispatchToProps = {
  getStoreGameList: getGameList,
  userTakeIn: takeIn,
  getWalletsList: getWallets,
  updateUserCurWallet: updateCurWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
