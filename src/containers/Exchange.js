import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStores } from '../actions/stores';
import { getWallets } from '../actions/wallets';
import { setCurWallet } from '../actions/curWallet';

class Exchange extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getWalletsData: PropTypes.func.isRequired,
    getStoresData: PropTypes.func.isRequired,
    chooseWallet: PropTypes.func.isRequired,
    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ),
    storesData: PropTypes.arrayOf(
      PropTypes.shape({
        storeId: PropTypes.number,
        name: PropTypes.string,
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
    storesData: [],
  }

  state = {}

  constructor(props) {
    super(props);
    props.getStoresData();
    props.getWalletsData();
  }

  _handleChoose = async (curStoreId) => {
    const { chooseWallet } = this.props;
    await chooseWallet(curStoreId);
  }

  render = () => {
    const { Layout, walletsData, storesData, user } = this.props;
    const storeWallet = walletsData.reduce((arr, row) => {
      if (row.storeId !== -1) arr.push(row);
      return arr;
    }, []);

    return <Layout storeWallet={storeWallet} stores={storesData} />;
  }
}

const mapStateToProps = state => ({
  storesData: state.stores,
  walletsData: state.wallets,
  user: state.user || {},
});

const mapDispatchToProps = {
  getStoresData: getStores,
  getWalletsData: getWallets,
  chooseWallet: setCurWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
