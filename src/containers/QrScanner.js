import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurWallet } from '../actions/curWallet';

const EXAMPLE_DATA = {
  text: '紅豆沒洗澡',
}

class QrScanner extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    chooseWallet: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  _handleChoose = async (curStoreId) => {
    const { chooseWallet } = this.props;
    await chooseWallet(curStoreId);
  }

  render = () => {
    const { Layout } = this.props;
    return <Layout onChoose={this._handleChoose} />;
  }
}

const mapSateToProps = state => ({
});

const mapDispatchToProps = {
  chooseWallet: setCurWallet,
};

export default connect(mapSateToProps, mapDispatchToProps)(QrScanner);
