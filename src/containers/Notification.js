import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { getNotifications } from '../actions/notifications';

const EXAMPLE_DATA = [
  {
    content: '系統通知: 趕快來花錢，十天內消費不滿十萬元將被封鎖帳號，十天內消費不滿十萬元將被封鎖帳號，十天內消費不滿十萬元將被封鎖帳號，十天內消費不滿十萬元將被封鎖帳號，十天內消費不滿十萬元將被封鎖帳號，十天內消費不滿十萬元將被封鎖帳號，十天內消費不滿十萬元將被封鎖帳號，十天內消費不滿十萬元將被封鎖帳號，十天內消費不滿十萬元將被封鎖帳號，',
    time: '15分鐘前',
    thumbnail: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    content: '倫倫十分喜歡阿民的新頭貼',
    time: '15分鐘前',
    thumbnail: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    content: '白老大說阿民不是普通的帥，是十分的帥',
    time: '15分鐘前',
    thumbnail: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    content: '小賀說阿民十分的帥',
    time: '15分鐘前',
    thumbnail: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    content: '紅豆說阿民十分的帥',
    time: '15分鐘前',
    thumbnail: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    content: '講講說阿民十分的帥',
    time: '15分鐘前',
    thumbnail: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    content: '兩個酒鬼在一起喝酒，其中一個說道:我真倒霉,我的老婆拿走了我所有的財產跑了',
    time: '15分鐘前',
    thumbnail: 'https://i.imgur.com/lceHsT6l.jpg',
  },
];

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
