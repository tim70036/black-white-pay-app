import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStores } from '../actions/stores';
import { setCurStore } from '../actions/curStore';
import { setCurWallet } from '../actions/curWallet';
import { getWallets } from '../actions/wallets';

class StoreList extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getStoresData: PropTypes.func.isRequired,
    setCurStore: PropTypes.func.isRequired,
    getWalletsData: PropTypes.func.isRequired,
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

  componentDidMount = async () => {
    const { getWalletsData } = this.props;
    await getWalletsData();
  }

  _handleChoose = async (storeId) => {
    const { setCurStore, setCurWallet } = this.props;
    await setCurStore(storeId);
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
  setCurStore: setCurStore,
  setCurWallet: setCurWallet,
  getWalletsData: getWallets,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreList);
