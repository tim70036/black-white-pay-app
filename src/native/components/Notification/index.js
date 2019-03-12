import React from 'react';
// import PropTypes from 'prop-types';
import { Image, StyleSheet, FlatList, View } from 'react-native';
import {
  Container, Card, CardItem, Body, Text, Header,
} from 'native-base';
import PropTypes from 'prop-types';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';


const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'red',
    // backgroundColor: 'green',
    height: viewportHeightPercent(10),
  },

  cardItemRight: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  cardItemLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    fontSize: 15,
  },

  text: {
    fontSize: 8,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  image: {
    width: '80%',
    height: '65%',
    // borderRadius: 150,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});


// const { carouselData } = this.props;

const Notification = ({ notificationData }) => {

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'black',
        }}
      />
    );
  };

  return (
    <Container padder style={styles.container}>
      <FlatList
        style={{ backgroundColor: 'white' }}
        data={notificationData}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardItemLeft}>
              <Image
                style={styles.image}
                source={{ uri: item.imgUrl }}
              />
            </View>
            <View style={styles.cardItemRight}>
              <Text style={styles.headerText}>{item.text}</Text>
              <Text style={styles.text}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </Container>
  );
};


/* Coupons.propTypes = {
  couponData: PropTypes.objectOf(PropTypes.object()).isRequired,
};

Coupons.defaultProps = {
}; */


export default Notification;
