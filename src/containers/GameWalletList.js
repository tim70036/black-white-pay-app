import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { recycleOneGameWallet, recycleAllGameWallet, getGameWallets } from '../actions/gameWallets';
import { getWallets } from '../actions/wallets';
import { updateCurWallet } from '../actions/curWallet';

class GameWalletList extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    recycleOne: PropTypes.func.isRequired,
    recycleAll: PropTypes.func.isRequired,
    getWalletsList: PropTypes.func.isRequired,
    updateUserCurWallet: PropTypes.func.isRequired,
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
  }

  static defaultProps = {
    gameWallets: [],
  }

  state = {
  }

  componentWillMount = async () => {
    const { getGameWalletsData } = this.props;
    await getGameWalletsData();
  }

  render = () => {
    const { Layout, user, gameWallets, recycleOne, recycleAll, getGameWalletsData, getWalletsList, updateUserCurWallet } = this.props;
    return (
      <Layout
        user={user}
        gameWallets={gameWallets}
        recycleOne={recycleOne}
        recycleAll={recycleAll}
        getGameWalletsData={getGameWalletsData}
        getWalletsList={getWalletsList}
        updateUserCurWallet={updateUserCurWallet}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user || {},
  gameWallets: state.gameWallets || {},
});

const mapDispatchToProps = {
  recycleOne: recycleOneGameWallet,
  recycleAll: recycleAllGameWallet,
  getWalletsList: getWallets,
  updateUserCurWallet: updateCurWallet,
  getGameWalletsData: getGameWallets,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameWalletList);
