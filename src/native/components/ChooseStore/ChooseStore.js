import React from 'react';
import { Actions } from 'react-native-router-flux';
import { 
  Image, StyleSheet, FlatList, ImageBackground, Dimensions, TouchableOpacity, Alert,
} from 'react-native';
import {
  Container, Card, CardItem, Body, Text, View, Fab, Button, Icon,
} from 'native-base';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    height: Dimensions.get('window').height / 7.0,
  },

  cardItem: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  headerText: {
    fontSize: 20,
  },

  text: {
    fontSize: 20,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  cardHeader: {

  },
});

class ChooseStore extends React.Component {
  static propTypes = {
    // coupnData:PropTypes.shape({}),
  }

  static defaultProps = {
    // couponData: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      active: 'false',
    };
  }

  handleChoose = (storeName) => {
    Actions.storeTabbar();
  }

  handleAddStore = () => {
    Actions.addStore();
  }

  render() {
    const {
      couponData,
    } = this.props;
    const { active } = this.state;
    return (
      <View padder style={styles.container}>
        <FlatList
          data={couponData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.handleChoose(item.title)}
            >
              <Card style={styles.card}>
                <View style={{ flex: 2 }}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: item.imgUrl }}
                  />
                </View>
                <CardItem style={styles.cardItem}>
                  <View>
                    <Text style={styles.headerText}>{item.title}</Text>
                  </View>
                </CardItem>
              </Card>
            </TouchableOpacity>
          )}
        />
        <Fab
          active={active}
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.handleAddStore()}
        >
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

export default ChooseStore;
