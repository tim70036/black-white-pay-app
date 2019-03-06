import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ff3300',
    fontSize: 16,
  },
});

const SwitchStoreButton = () => (
  <TouchableOpacity style={styles.button} onPress={() => Actions.dashboardDrawer()}>
    <Text style={styles.buttonText}>切換店家</Text>
  </TouchableOpacity>
);

export default SwitchStoreButton;
