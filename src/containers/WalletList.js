import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWallets } from '../actions/wallets';
import { setCurWallet } from '../actions/curWallet';

class WalletList extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getWalletsData: PropTypes.func.isRequired,
    chooseWallet: PropTypes.func.isRequired,
    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ),
    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }),
  }

  static defaultProps = {
    walletsData: [],
    user: {},
  }

  componentWillMount() {
    this._getWalletsData();
  }

  _getWalletsData = async () => {
    const { getWalletsData } = this.props;
    await getWalletsData();
  }

  _handleChoose = async (curStoreId) => {
    const { chooseWallet } = this.props;
    await chooseWallet(curStoreId);
  }

  render = () => {
    const { Layout, walletsData, user } = this.props;
    const storeWallet = walletsData.reduce((arr, row) => {
      if (row.storeId !== -1) arr.push(row);
      return arr;
    }, []);
    const mainWallet = walletsData.find(row => (row.storeId === -1));

    return (
      <Layout
        storeWallet={storeWallet}
        mainWallet={mainWallet}
        user={user}
        onChoose={this._handleChoose}
      />
    );
  }
}

const mapStateToProps = state => ({
  walletsData: state.wallets,
  user: state.user || {},
});

const mapDispatchToProps = {
  getWalletsData: getWallets,
  chooseWallet: setCurWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletList);
