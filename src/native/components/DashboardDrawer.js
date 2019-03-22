import React from 'react';
// import PropTypes from 'prop-types';
import { StyleSheet, Button, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

// For test
import { connect } from 'react-redux';
import { logout } from '../../actions/user';

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

const DashboardDrawer = ({ userLogout }) => (
  <View style={styles.container}>
    <Button onPress={Actions.pop} title="返回" />
    <Button onPress={() => Actions.storeTabbar()} title="首頁" />
    <Button onPress={() => Actions.transHistory()} title="帳號設定" />
    <Button onPress={async () => { await userLogout(); }} title="登出" />
  </View>
);


// For test
const mapStateToProps = state => ({
  // member: state.member || {},
});
const mapDispatchToProps = {
  userLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDrawer);

// export default DashboardDrawer;
