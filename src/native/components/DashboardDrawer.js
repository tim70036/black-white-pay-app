import React from 'react';
// import PropTypes from 'prop-types';
import { StyleSheet, Button, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
  },
});

class DashboardDrawer extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={Actions.pop} title="返回" />
        <Button onPress={() => Actions.homeTabbar()} title="首頁" />
        <Button onPress={() => console.log('settings')} title="帳號設定" />
        <Button onPress={() => console.log('logout')} title="登出" />
      </View>
    );
  }
}


export default DashboardDrawer;
