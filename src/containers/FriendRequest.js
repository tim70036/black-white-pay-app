import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const exampleInvitation = [
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '怪人', account: '0911547964' },
  { thumbnail: require('../img/test3.png'), name: '肥宅', account: '0911547964' },
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '雞雞', account: '0911547964' },
  { thumbnail: require('../img/test3.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test3.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test3.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
];

const exampleRequest = [
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '怪人', account: '0911547964' },
  { thumbnail: require('../img/test3.png'), name: '肥宅', account: '0911547964' },
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '雞雞', account: '0911547964' },
  { thumbnail: require('../img/test3.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test3.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test3.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
];


class FriendRequest extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  render = () => {
    const {
      Layout,
    } = this.props;

    return (
      <Layout invitationData={exampleInvitation} requestData={exampleRequest} />
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest);
