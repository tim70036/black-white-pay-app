import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFriends, getDetail } from '../actions/friend';

const example = [
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

class FriendList extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getFriendsList: PropTypes.func.isRequired,
    getFriendDetail: PropTypes.func.isRequired,
    friendList: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.string,
        name: PropTypes.string,
        account: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    friendList: [],
  }

  state = {
  }

  constructor(props) {
    super(props);
    props.getFriendsList();
  }

  _handleChooseFriend = async (formData) => {
    const { getFriendDetail } = this.props;
    const success = await getFriendDetail(formData);
    return success;
  };

  render = () => {
    const {
      Layout,
      friendList,
    } = this.props;

    // Assign onPress function
    const friendData = friendList.map((item) => {
      const formData = { account: item.account };
      return { ...item, onChoose: async () => (this._handleChooseFriend(formData)) };
    });

    return (
      <Layout friendData={friendData} />
    );
  }
}

const mapStateToProps = state => ({
  friendList: state.friend.friends,
});

const mapDispatchToProps = {
  getFriendsList: getFriends,
  getFriendDetail: getDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
