import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';

import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: viewportWidthPercent(3),
  },
  inputsContainer: { // no flex 1, so container will not stretch too much
    padding: viewportWidthPercent(4),
    marginVertical: viewportHeightPercent(2),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  inputItem: {
    marginBottom: viewportHeightPercent(2),
  },
  button: {
    marginVertical: viewportHeightPercent(3),
    borderRadius: 8,
  },
});

class Transfer extends Component {
  state = {
    accountTo: '',
    amount: 0,
    transpwd: '',
    comment: '',
  };

  render = () => (
    <View style={styles.container}>
      <Form style={styles.inputsContainer}>
        <Item floatingLabel style={styles.inputItem}>
          <Label>轉入帳號</Label>
          <Input />
        </Item>
        <Item floatingLabel style={styles.inputItem}>
          <Label>轉帳數量</Label>
          <Input />
        </Item>
        <Item floatingLabel style={styles.inputItem}>
          <Label>個人轉帳密碼</Label>
          <Input />
        </Item>
        <Item floatingLabel style={styles.inputItem}>
          <Label>備註</Label>
          <Input />
        </Item>
        <Button block info style={styles.button}>
          <Text>確認轉帳</Text>
        </Button>
      </Form>
    </View>
  );
}

export default Transfer;
