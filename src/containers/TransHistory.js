import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getTransHistory } from '../actions/curWallet';


const EXAMPLE_DATA = [
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
  { time: '2019-03-08 02:16:13', relatedName: '阿拉花瓜', amount: '-10000000000', comment: '石油87桶'},
];

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
  }

  static defaultProps = {
    transHistory: [],
  }

  state = {
    // defaultStartTime: '',
    // defaultEndTime: '',
  }

  constructor(props) {
    super(props);
    const startTime = moment().startOf('day').subtract(1, 'months').utc().format('YYYY-MM-DD HH:mm');
    const endTime = moment(new Date()).endOf('day').utc().format('YYYY-MM-DD HH:mm');
    props.userTransHistory(startTime, endTime);
  }

  _handleSubmit = async (startTime, endTime) => {
    const { userTransHistory } = this.props;
    await userTransHistory(startTime, endTime);
  };

  render = () => {
    const {
      Layout,
      transHistory,
    } = this.props;
    const defaultStartTime = moment().subtract(1, 'months').format('YYYY-MM-DD');
    const defaultEndTime = moment(new Date()).format('YYYY-MM-DD');
    const defaultStartTimeUtc = moment().subtract(1, 'months').utc().format('YYYY-MM-DD HH:mm');
    const defaultEndTimeUtc = moment(new Date()).utc().format('YYYY-MM-DD HH:mm');

    return (
      <Layout
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
});

const mapDispatchToProps = {
  userTransHistory: getTransHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransHistory);
