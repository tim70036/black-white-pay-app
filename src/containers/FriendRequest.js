import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInvitations, getRequests, cancelRequest, acceptInvitation, declineInvitation } from '../actions/friend';

const exampleInvitation = [
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '怪人', account: '0911547964' },
  { thumbnail: require('../img/test3.png'), name: '肥宅', account: '0911547964' },
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '怪人', account: '0911547964' },
  { thumbnail: require('../img/test3.png'), name: '肥宅', account: '0911547964' },
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '怪人', account: '0911547964' },
  { thumbnail: require('../img/test3.png'), name: '肥宅', account: '0911547964' },
  { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '怪人', account: '0911547964' },
  { thumbnail: require('../img/test3.png'), name: '肥宅', account: '0911547964' },
];

const exampleRequest = [
  // { thumbnail: require('../img/test.png'), name: '小王八', account: '0911547964' },
  { thumbnail: require('../img/test2.png'), name: '怪人', account: '0911547964' },
];


class FriendRequest extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getFriendInviatations: PropTypes.func.isRequired,
    getFriendRequests: PropTypes.func.isRequired,
    cancelFriendRequest: PropTypes.func.isRequired,
    acceptFriendInvitation: PropTypes.func.isRequired,
    declineFriendInvitation: PropTypes.func.isRequired,
    invitationList: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.string,
        name: PropTypes.string,
        account: PropTypes.string,
      }),
    ),
    requestList: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.string,
        name: PropTypes.string,
        account: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    invitationList: [],
    requestList: [],
  }

  constructor(props) {
    super(props);
    props.getFriendInviatations();
    props.getFriendRequests();
  }

  state = {
  }

  render = () => {
    const {
      Layout,
      invitationList,
      requestList,
      cancelFriendRequest,
      acceptFriendInvitation,
      declineFriendInvitation,
    } = this.props;

    // Assign onPress function
    const requestData = requestList.map((item) => {
      const formData = { account: item.account };
      return { ...item, onCancel: () => (cancelFriendRequest(formData)) };
    });

    // Assign onPress function
    const invitationData = invitationList.map((item) => {
      const formData = { account: item.account };
      return { ...item, onAccept: () => (acceptFriendInvitation(formData)), onDecline: () => (declineFriendInvitation(formData)), };
    });

    return (
      <Layout invitationData={invitationData} requestData={requestData} />
    );
  }
}

const mapStateToProps = state => ({
  invitationList: state.friend.invitations,
  requestList: state.friend.requests,
});

const mapDispatchToProps = {
  getFriendInviatations: getInvitations,
  getFriendRequests: getRequests,
  cancelFriendRequest: cancelRequest,
  acceptFriendInvitation: acceptInvitation,
  declineFriendInvitation: declineInvitation,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest);
