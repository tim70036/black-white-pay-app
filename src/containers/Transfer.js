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
    defaultAccount: PropTypes.string,
    defaultAmount: PropTypes.string,
    defaultComment: PropTypes.string,
    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ),
    curStoreId: PropTypes.number,
  }

  static defaultProps = {
    defaultAccount: '',
    defaultAmount: '',
    defaultComment: '',
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
      defaultAccount,
      defaultAmount,
      defaultComment,
      curStoreId,
      walletsData,
    } = this.props;

    return (
      <Layout
        onFormSubmit={this._handleSubmit}
        onChoose={this._handleChoose}
        walletsData={walletsData}
        defaultAccount={defaultAccount}
        defaultAmount={defaultAmount}
        defaultComment={defaultComment}
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
