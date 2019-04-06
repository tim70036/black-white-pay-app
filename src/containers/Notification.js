import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// {
//   "notifications": [
//     {
//       "content": "阿亮說阿民不是普通的帥",
//       "time": "15分鐘前",
//       "thumbnail": "https://i.imgur.com/UYiroysl.jpg"
//     },
//     {
//       "content": "倫倫十分喜歡阿民的新頭貼",
//       "time": "15分鐘前",
//       "thumbnail": "https://i.imgur.com/UPrs1EWl.jpg"
//     } 
//   ]
// }

const EXAMPLE_DATA = [
  {
    content: '阿亮說阿民不是普通的帥',
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
  }

  static defaultProps = {
  }

  state = {

  }

  render = () => {
    const { Layout, notificationData } = this.props;
    return <Layout notificationData={notificationData} />;
  }
}

const mapStateToProps = state => ({
  notificationData: state.notifications,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
