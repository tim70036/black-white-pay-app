import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHome extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
  }

  render = () => {
    const { Layout } = this.props;

    return <Layout />;
  }
}

export default WalletHome;
