import React, { Component } from 'react';
import PropTypes from 'prop-types';

const EXAMPLE_DATA = {
  text: '紅豆沒洗澡',
}

class QrScanner extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {

  }

  render = () => {
    const { Layout } = this.props;
    return <Layout />;
  }
}

export default QrScanner;
