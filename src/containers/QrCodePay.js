import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWallets } from '../actions/wallets';
import { setCurWallet } from '../actions/curWallet';

class QrCodePay extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }),
    getWalletsData: PropTypes.func.isRequired,
    chooseWallet: PropTypes.func.isRequired,
    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ),
    curStoreId: PropTypes.number,
  }

  static defaultProps = {
    user: {},
    walletsData: [],
    curStoreId: -1,
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
    const {
      Layout,
      user,
      walletsData,
      curStoreId,
    } = this.props;

    return (
      <Layout
        account={user.account}
        walletsData={walletsData}
        onChoose={this._handleChoose}
        curStoreId={curStoreId}
      />
    );
  }
}

const mapStateToProps = state => ({
  walletsData: state.wallets,
  user: state.user || {},
  curStoreId: state.curWallet.storeId,
});

const mapDispatchToProps = {
  getWalletsData: getWallets,
  chooseWallet: setCurWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(QrCodePay);
