import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWallets, exchange } from '../actions/wallets';
import { setCurWallet } from '../actions/curWallet';

class Exchange extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getWalletsData: PropTypes.func.isRequired,
    userExchange: PropTypes.func.isRequired,
    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ),
  }

  static defaultProps = {
    walletsData: [],
  }

  constructor(props) {
    super(props);
    props.getWalletsData();
  }

  _handleSubmit = async (formData) => {
    const { userExchange } = this.props;
    const success = await userExchange(formData);
    return success;
  }

  render = () => {
    const { Layout, walletsData } = this.props;
    const outflowWallet = walletsData.reduce((arr, row) => {
      if (row.outflow === 1) arr.push(row);
      return arr;
    }, []);
    const inflowWallet = walletsData.reduce((arr, row) => {
      if (row.inflow === 1) arr.push(row);
      return arr;
    }, []);

    return (
      <Layout
        onFormSubmit={this._handleSubmit}
        outflowWallet={outflowWallet}
        inflowWallet={inflowWallet}
      />
    );
  }
}

const mapStateToProps = state => ({
  walletsData: state.wallets,
  user: state.user || {},
});

const mapDispatchToProps = {
  getWalletsData: getWallets,
  userExchange: exchange,
  chooseWallet: setCurWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
