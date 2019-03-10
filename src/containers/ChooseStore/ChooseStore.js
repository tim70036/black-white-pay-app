import React, { Component } from 'react';
import PropTypes from 'prop-types';

const EXAMPLE_DATA = [
  {
    title: '炸雞',
    subtitle: '折價10元',
    imgUrl: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: '披薩',
    subtitle: '買2送10',
    imgUrl: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: '金萱',
    subtitle: '買10送2',
    imgUrl: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: '一杯清酒',
    subtitle: '恭喜您中獎',
    imgUrl: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: '哀鳳',
    subtitle: '恭喜您中獎',
    imgUrl: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: '微風',
    subtitle: '恭喜您中獎',
    imgUrl: 'https://i.imgur.com/lceHsT6l.jpg',
  },
];

class ChooseStore extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {

  }

  render = () => {
    const { Layout } = this.props;
    return <Layout couponData={EXAMPLE_DATA} />;
  }
}
export default ChooseStore;
