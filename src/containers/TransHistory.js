import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getTransHistory } from '../actions/curWallet';

class TransHistory extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    userTransHistory: PropTypes.func.isRequired,
    transHistory: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number,
        relatedName: PropTypes.string,
        comment: PropTypes.string,
        createtime: PropTypes.string,
      }),
    ),
    currencySrc: PropTypes.string,
    storeId: PropTypes.number,
  }

  static defaultProps = {
    transHistory: [],
    currencySrc: '',
    storeId: -1,
  }

  componentWillMount() {
    const startTime = moment().startOf('day').subtract(1, 'weeks').utc()
      .format('YYYY-MM-DD HH:mm');
    const endTime = moment(new Date()).endOf('day').utc().format('YYYY-MM-DD HH:mm');
    this._handleSubmit(startTime, endTime);
  }

  _handleSubmit = async (startTime, endTime) => {
    const { userTransHistory } = this.props;
    await userTransHistory(startTime, endTime);
  };

  render = () => {
    const {
      Layout,
      transHistory,
      currencySrc,
      storeId,
    } = this.props;
    const defaultStartTime = moment().startOf('day').subtract(1, 'weeks').format('YYYY-MM-DD');
    const defaultEndTime = moment(new Date()).endOf('day').format('YYYY-MM-DD');
    const defaultStartTimeUtc = moment().startOf('day').subtract(1, 'weeks').utc().format('YYYY-MM-DD HH:mm');
    const defaultEndTimeUtc = moment(new Date()).endOf('day').utc().format('YYYY-MM-DD HH:mm');

    return (
      <Layout
        storeId={storeId}
        currencySrc={currencySrc}
        historyData={transHistory}
        onSearchSubmit={this._handleSubmit}
        defaultStartTime={defaultStartTime}
        defaultEndTime={defaultEndTime}
        defaultStartTimeUtc={defaultStartTimeUtc}
        defaultEndTimeUtc={defaultEndTimeUtc}
      />
    );
  }
}

const mapStateToProps = state => ({
  transHistory: state.curWallet.transHistory,
  currencySrc: state.curWallet.currencySrc,
  storeId: state.curWallet.storeId,
});

const mapDispatchToProps = {
  userTransHistory: getTransHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransHistory);
