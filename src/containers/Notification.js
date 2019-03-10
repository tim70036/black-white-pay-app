import React, { Component } from 'react';
import PropTypes from 'prop-types';

const EXAMPLE_DATA = [
  {
    text: '阿亮說阿民不是普通的帥',
    time: '15分鐘前',
    imgUrl: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    text: '倫倫十分喜歡阿民的新頭貼',
    time: '15分鐘前',
    imgUrl: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    text: '白老大說阿民不是普通的帥，是十分的帥',
    time: '15分鐘前',
    imgUrl: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    text: '小賀說阿民十分的帥',
    time: '15分鐘前',
    imgUrl: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    text: '紅豆說阿民十分的帥',
    time: '15分鐘前',
    imgUrl: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    text: '講講說阿民十分的帥',
    time: '15分鐘前',
    imgUrl: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    text: '兩個酒鬼在一起喝酒，其中一個說道:我真倒霉,我的老婆拿走了我所有的財產跑了',
    time: '15分鐘前',
    imgUrl: 'https://i.imgur.com/lceHsT6l.jpg',
  },
];

class Coupons extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {

  }

  render = () => {
    const { Layout } = this.props;
    return <Layout notificationData={EXAMPLE_DATA} />;
  }
}
export default Coupons;
