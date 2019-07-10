import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWallets } from '../actions/wallets';
import { setQrCodeReceive, setQrCodeReceiveStoreId } from '../actions/qrCodeReceive';


class QrCodeReceive extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getWalletsData: PropTypes.func.isRequired,
    chooseWallet: PropTypes.func.isRequired,
    setqrCodeReceive: PropTypes.func.isRequired,
    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }),
    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ),
    qrCodeReceive: PropTypes.shape({
      storeId: PropTypes.number,
      amount: PropTypes.string,
      comment: PropTypes.string,
    }),
  }

  static defaultProps = {
    user: {},
    walletsData: [],
    qrCodeReceive: {},
  }

  componentWillMount() {
    this._getWalletsData();
  }

  _getWalletsData = async () => {
    const { getWalletsData } = this.props;
    await getWalletsData();
  }

  _handleChoose = async (storeId) => {
    const { chooseWallet } = this.props;
    await chooseWallet(storeId);
  }

  render = () => {
    const {
      Layout,
      user,
      walletsData,
      qrCodeReceive,
      setqrCodeReceive,
    } = this.props;

    return (
      <Layout
        account={user.account}
        walletsData={walletsData}
        onChoose={this._handleChoose}
        qrCodeReceive={qrCodeReceive}
        setqrCodeReceive={setqrCodeReceive}
      />
    );
  }
}

const mapStateToProps = state => ({
  walletsData: state.wallets,
  user: state.user || {},
  qrCodeReceive: state.qrCodeReceive,
});

const mapDispatchToProps = {
  getWalletsData: getWallets,
  setqrCodeReceive: setQrCodeReceive,
  chooseWallet: setQrCodeReceiveStoreId,
};

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeReceive);
