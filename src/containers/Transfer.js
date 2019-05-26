import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWallets } from '../actions/wallets';
import { transfer, setCurWallet } from '../actions/curWallet';

class Transfer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    userTransfer: PropTypes.func.isRequired,
    getWalletsData: PropTypes.func.isRequired,
    chooseWallet: PropTypes.func.isRequired,
    qrData: PropTypes.shape({
      account: PropTypes.string,
      amount: PropTypes.number,
    }),
    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ),
    curStoreId: PropTypes.number,
  }

  static defaultProps = {
    qrData: {
      account: '',
      amount: 0,
    },
    curStoreId: -1,
    walletsData: [],
  }

  state = {
  }

  constructor(props) {
    super(props);
    props.getWalletsData();
  }

  _handleSubmit = async (formData) => {
    const { userTransfer } = this.props;
    console.log({ formData });
    const success = await userTransfer(formData);
    return success;
  };

  _handleChoose = async (curStoreId) => {
    const { chooseWallet } = this.props;
    await chooseWallet(curStoreId);
  }

  render = () => {
    const {
      Layout,
      qrData,
      curStoreId,
      walletsData,
    } = this.props;
    console.log(qrData);

    return (
      <Layout
        onFormSubmit={this._handleSubmit}
        onChoose={this._handleChoose}
        walletsData={walletsData}
        defaultAccount={qrData.account}
        defaultAmount={qrData.amount}
        curStoreId={curStoreId}
      />
    );
  }
}

const mapStateToProps = state => ({
  walletsData: state.wallets,
  curStoreId: state.curWallet.storeId,
});

const mapDispatchToProps = {
  getWalletsData: getWallets,
  userTransfer: transfer,
  chooseWallet: setCurWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
