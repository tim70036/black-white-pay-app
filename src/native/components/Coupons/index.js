import React from 'react';
// import PropTypes from 'prop-types';
import { Image, StyleSheet, FlatList, View } from 'react-native';
import {
  Container, Card, CardItem, Body, Text, Header,
} from 'native-base';
import PropTypes from 'prop-types';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent,} from '../../lib/util';


const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#fff',
    height: viewportHeightPercent(14.2),
  },

  cardItemRight: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  cardItemLeft: {
    flex: 2,
  },

  headerText: {
    fontSize: 25,
  },

  text: {
    fontSize: 15,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  image: {
    width: '100%',
    height: '100%',
  },

});


const Coupons = ({ couponData }) => {
  return (
    <Container padder style={styles.container}>
      <FlatList
        style={{ backgroundColor: 'gray' }}
        data={couponData}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <CardItem style={styles.cardItemLeft}>
              <Image
                style={styles.image}
                source={{ uri: item.imgUrl }}
              />
            </CardItem>
            <CardItem style={styles.cardItemRight}>
              <View>
                <Text style={styles.headerText}>{item.title}</Text>
              </View>
              <View>
                <Text style={styles.text}>{item.subtitle}</Text>
              </View>
            </CardItem>
          </Card>
        )}
      />
    </Container>
  );
};

Coupons.propTypes = {
  couponData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      imgUrl: PropTypes.string,
    }),
  ),
};

Coupons.defaultProps = {
  couponData: [],
};


export default Coupons;
