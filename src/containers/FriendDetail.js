import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRequest, deleteFriend } from '../actions/friend';

class FriendDetail extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    createFriendRequest: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired,
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
    const { createFriendRequest, userData } = this.props;
    const formData = { account: userData.account };
    await createFriendRequest(formData);
  };

  _handleDeleteFriend = async () => {
    const { deleteFriend, userData } = this.props;
    const formData = { account: userData.account };
    await deleteFriend(formData);
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
  createFriendRequest: createRequest,
  deleteFriend: deleteFriend,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendDetail);
