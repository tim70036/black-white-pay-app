import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { getNotifications } from '../actions/notifications';

class Notifications extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getNotificationList: PropTypes.func.isRequired,
    notificationList: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        createtime: PropTypes.string,
        thumbnail: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    notificationList: [],
  }

  constructor(props) {
    super(props);
    props.getNotificationList();
  }

  state = {
  }

  render = () => {
    const { Layout, notificationList } = this.props;

    // Calculate time from now
    const notificationData = notificationList.map((item) => {
      const { createtime } = item;
      const time = moment(createtime).fromNow();
      return { content: item.content, thumbnail: item.thumbnail, time: time };
    });

    return <Layout notificationData={notificationData} />;
  }
}

const mapStateToProps = state => ({
  notificationList: state.notifications,
});

const mapDispatchToProps = {
  getNotificationList: getNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
