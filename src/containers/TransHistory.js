import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class TransHistory extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
    shit: 'nothing',
  }

  render = () => {
    const {
      Layout,
    } = this.props;

    return (
      <Layout />
    );
  }
}

export default TransHistory;
