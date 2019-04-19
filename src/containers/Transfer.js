import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { transfer } from '../actions/curWallet';

class Transfer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    userTransfer: PropTypes.func.isRequired,
    qrData: PropTypes.shape({
      account: PropTypes.string,
      amount: PropTypes.number,
    }),
  }

  static defaultProps = {
    qrData: {
      account: '',
      amount: 0,
    },
  }

  state = {
  }

  _handleSubmit = async (formData) => {
    const { userTransfer } = this.props;
    console.log({ formData });
    const success = await userTransfer(formData);
    return success;
  };

  render = () => {
    const {
      Layout,
      qrData,
    } = this.props;
    console.log(qrData);

    return (
      <Layout
        onFormSubmit={this._handleSubmit}
        defaultAccount={qrData.account}
        defaultAmount={qrData.amount}
      />
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  userTransfer: transfer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
