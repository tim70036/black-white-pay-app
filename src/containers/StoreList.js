import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWallets } from '../actions/wallets';
import { getStores } from '../actions/stores';
import { setCurStore, getAds, getComment } from '../actions/curStore';
import { setCurWallet } from '../actions/curWallet';

class StoreList extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getStoresData: PropTypes.func.isRequired,
    chooseStore: PropTypes.func.isRequired,
    getAdList: PropTypes.func.isRequired,
    getWalletsData: PropTypes.func.isRequired,
    setCurWallet: PropTypes.func.isRequired,
    getComment: PropTypes.func.isRequired,
    storesData: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        thumbnail: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    storesData: [],
  }

  state = {
  }

  constructor(props) {
    super(props);
    props.getStoresData();
  }

  _handleChoose = async (storeId) => {
    const { chooseStore, getAdList, getWalletsData, setCurWallet, getComment } = this.props;
    await chooseStore(storeId);
    await getAdList();
    await getComment();
    await getWalletsData();
    await setCurWallet(storeId);
  }

  render = () => {
    const { Layout, storesData } = this.props;
    return <Layout storesData={storesData} onChoose={this._handleChoose} />;
  }
}

const mapStateToProps = state => ({
  storesData: state.stores,
});

const mapDispatchToProps = {
  getStoresData: getStores,
  chooseStore: setCurStore,
  getAdList: getAds,
  getComment: getComment,
  getWalletsData: getWallets,
  setCurWallet: setCurWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreList);
