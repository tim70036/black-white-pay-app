import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const example = {
  thumbnail: require('../img/test.png'),
  name: '花惹發克拉',
  account: '0911547964',
  isFriend: true,
};

class FriendDetail extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    userData: PropTypes.shape({
      thumbnail: PropTypes.string,
      name: PropTypes.string,
      account: PropTypes.string,
      isFriend: PropTypes.bool,
    }).isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  _handleAddFriend = async () => {

  };

  _handleDeleteFriend = async () => {

  };


  render = () => {
    const {
      Layout,
      userData, // redux
    } = this.props;

    return (
      <Layout userData={userData} onAddFriend={this._handleAddFriend} onDeleteFriend={this._handleDeleteFriend} />
    );
  }
}

const mapStateToProps = state => ({
  userData: state.friend.curFriend,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendDetail);
