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

  render = () => {
    const { Layout, storesData } = this.props;
    return <Layout storesData={storesData} />;
  }
}

const mapStateToProps = state => ({
  storesData: state.stores,
});

const mapDispatchToProps = {
  getStoresData: getStores,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreList);
