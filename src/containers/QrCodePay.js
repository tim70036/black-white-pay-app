import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class QrCodePay extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }),
    qrCodeData: PropTypes.shape({
      type: PropTypes.string.isRequired,
      account: PropTypes.string,
      amount: PropTypes.number,
      storeId: PropTypes.number,
    }).isRequired,
  }

  static defaultProps = {
    user: {},
  }

  state = {
  }

  render = () => {
    const { Layout, user, qrCodeData } = this.props;
    // const qrCodeData = {
    //   type: 'pay',
    //   account: user.account,
    // };

    return <Layout qrCodeData={qrCodeData} />;
  }
}

const mapStateToProps = state => ({
  user: state.user || {},
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(QrCodePay);
