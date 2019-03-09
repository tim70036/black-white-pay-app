import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


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


const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

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
      <Layout historyData={EXAMPLE_DATA} />
    );
  }
}

export default TransHistory;
