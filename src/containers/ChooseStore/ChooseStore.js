import React, { Component } from 'react';
import PropTypes from 'prop-types';

const EXAMPLE_DATA = [
  {
    title: '豆豆GG',
    subtitle: '折價10元',
    imgUrl: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'GainSword',
    subtitle: '買2送10',
    imgUrl: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: '高雄',
    subtitle: '買10送2',
    imgUrl: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: '古拉雞',
    subtitle: '恭喜您中獎',
    imgUrl: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'Studio A',
    subtitle: '恭喜您中獎',
    imgUrl: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: '6666',
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
    return <Layout storesData={EXAMPLE_DATA} />;
  }
}
export default ChooseStore;
