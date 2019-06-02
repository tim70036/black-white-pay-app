import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurWallet } from '../actions/curWallet';
import { getDetail } from '../actions/friend';

const EXAMPLE_DATA = {
  text: '紅豆沒洗澡',
}

class QrScanner extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    chooseWallet: PropTypes.func.isRequired,
    getFriendDetail: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  _handleReceive = async (curStoreId) => {
    const { chooseWallet } = this.props;
    await chooseWallet(curStoreId);
  }

  _handleFriend = async (query) => {
    const { getFriendDetail } = this.props;
    await getFriendDetail(query);
  }

  render = () => {
    const { Layout } = this.props;
    return <Layout onScanReceive={this._handleReceive} onScanFriend={this._handleFriend} />;
  }
}

const mapSateToProps = state => ({
});

const mapDispatchToProps = {
  chooseWallet: setCurWallet,
  getFriendDetail: getDetail,
};

export default connect(mapSateToProps, mapDispatchToProps)(QrScanner);
