import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// For test
import { logout } from '../actions/user';
import { getAnnouncements } from '../actions/announcements';

const EXAMPLE_DATA = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    imgUrl: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    imgUrl: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    imgUrl: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    imgUrl: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    imgUrl: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: 'Middle Earth, Germany',
    subtitle: 'Lorem ipsum dolor sit amet',
    imgUrl: 'https://i.imgur.com/lceHsT6l.jpg',
  },
];


class Home extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    props.getAnnouncementList();
  }

  state = {
  }

  render = () => {
    const { Layout, userLogout, announcementList } = this.props;
    return <Layout carouselData={announcementList} userLogout={userLogout} />;
  }
}

const mapStateToProps = state => ({
  announcementList: state.announcements,
});

const mapDispatchToProps = {
  userLogout: logout,
  getAnnouncementList: getAnnouncements,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
